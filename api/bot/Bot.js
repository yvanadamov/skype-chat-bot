const { ActivityTypes } = require('botbuilder');

const BaseBot = require('./BaseBot');

const PROMO_TITLE = 'You can select one of the following choices.';
const NLP_MESSAGE = 'Could you please tell us more about your expectations from our e-shop in future?';

class DialogCommand extends BaseBot {
    constructor(userProfileManager, nlpService, welcomeMessages, options) {
        super(userProfileManager);
        this.nlpService = nlpService;
        this.welcomeMessages = welcomeMessages;
        this.options = options;
    }

    async onTurn(context) {
        if (context.activity.type === ActivityTypes.Message) {
            const conversationData = await this.conversationData.get(context, { 
                shownPromo: false,
                selectPromo: null,
                npl: false
            });
            if (!conversationData.shownPromo) {
                await this.showPromo(context);
                conversationData.shownPromo = true;
                await this.conversationData.set(context, conversationData);
                return await this.conversationState.saveChanges(context);
            }
            if (!conversationData.selectPromo) {
                conversationData.selectPromo = context.activity.text;
                await this.conversationData.set(context, conversationData);
                await this.conversationState.saveChanges(context);
                return await this.dialog(context);
            }
            if(!this.userProfileManager.done()) {
                return await this.dialog(context);
            }
            await context.sendActivity(NLP_MESSAGE);
            const nlpData = await this.nlpService.nlp(context);
        }
        else if (context.activity.type === ActivityTypes.ConversationUpdate) {
            // Send greeting when users are added to the conversation.
            await this.sendWelcomeMessage(context);
        } else {
            // Generic message for all other activities
            await context.sendActivity(`[${context.activity.type} event detected]`);
        }
    }

    async showPromo(context) {
        const additional = { text: PROMO_TITLE };
        const attachments = [this._createCard('', undefined, this._getHeroCardButtons(this.options), additional)];
        await this.sendInternetAtachment(context, attachments);
    }

    async dialog(context) {
        // Get the state properties from the turn context.
        const userProfile = await this.userProfile.get(context, {});

        await this.userProfileManager.populate(context, userProfile);

        await this.userProfile.set(context, userProfile);
        await this.userState.saveChanges(context);
    }

    async sendWelcomeMessage(context) {
        // Do we have any new members added to the conversation?
        if (context.activity.membersAdded.length === 0) {
            return;
        }

        for (let idx in context.activity.membersAdded) {
            // Greet anyone that was not the target (recipient) of this message.
            // Since the bot is the recipient for events from the channel,
            // context.activity.membersAdded === context.activity.recipient.Id indicates the
            // bot was added to the conversation, and the opposite indicates this is a user.
            if (context.activity.membersAdded[idx].id === context.activity.recipient.id) {
                continue;
            }
            this.sendInternetAtachment(context, [this._getInternetAttachment()]);
            for (const message of this.welcomeMessages) {
                await context.sendActivity(message);
            }
        }
    }
}

module.exports = DialogCommand;