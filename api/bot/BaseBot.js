const {
    MemoryStorage,
    ConversationState,
    UserState,
    ActivityTypes,
    MessageFactory,
    ActionTypes,
    CardFactory
} = require('botbuilder');

const CONVERSATION_DATA_PROPERTY = 'conversationData';
const USER_PROFILE_PROPERTY = 'userProfile';

class BaseBot {
    constructor(userProfileManager) {
        this.storage = new MemoryStorage();
        this.conversationState = new ConversationState(this.storage);
        this.userState = new UserState(this.storage);
        this.conversationData = this.conversationState.createProperty(CONVERSATION_DATA_PROPERTY);
        this.userProfile = this.userState.createProperty(USER_PROFILE_PROPERTY);
        this.userProfileManager = userProfileManager;
    }

    async sendInternetAtachment(context, attachments, attachmentText) {
        const reply = {
            type: ActivityTypes.Message,
            attachments: attachments,
            text: attachmentText
        };
        await context.sendActivity(reply);
    }

    async sendHeroCard(context, title, images, buttons, additional) {
        const card = this._createCard(title, images, buttons, additional);
        const reply = MessageFactory.attachment(card);
        await context.sendActivity(reply);
    }

    /**
     * @param {TurnContext} context
     * @param {[string]} actions
     * @param {string} quetion
     */
    async sendButtons(context, actions, question) {
        const reply = MessageFactory.suggestedActions(actions, question);
        await context.sendActivity(reply);
    }

    _createCard(title, images, buttons, additional) {
        return CardFactory.heroCard(...arguments);        
    }

    _getHeroCardButtons(options) {
        return options.map(option => Object.assign(option, { type: ActionTypes.ImBack}));
        
    }

    _getInternetAttachment() {
        return {
            name: 'imageName.png',
            contentType: 'image/png',
            contentUrl: 'https://scontent.fsof2-1.fna.fbcdn.net/v/t1.0-9/38729508_1313857485415860_9022381152383533056_n.png?_nc_cat=100&_nc_ht=scontent.fsof2-1.fna&oh=1f59006103807164725e931620693807&oe=5CE0A206'
        }
    }
}

module.exports = BaseBot;