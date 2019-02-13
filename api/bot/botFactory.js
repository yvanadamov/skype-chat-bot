const path = require('path');
const { BotFrameworkAdapter } = require('botbuilder');
const { BotConfiguration } = require('botframework-config');

const Bot = require('./Bot');
const welcomeMessages = require('./config/welcomeMessages');
const options = require('./config/options');

const questions = require('./config/questions');
const UserProfileManager = require('./UserProfileManager');

const NlpService = require('./NlpService');

module.exports = obs => {
	const BOT_FILE = path.join(__dirname, './config/bot.bot');
	const botConfig = BotConfiguration.loadSync(BOT_FILE);;

	const LUIS_CONFIG = 'LuisBot';
	const luisConfig = botConfig.findServiceByNameOrId(LUIS_CONFIG);
	// Map the contents to the required format for `LuisRecognizer`.
	const luisApplication = {
		applicationId: luisConfig.appId,
		endpointKey: luisConfig.authoringKey,
		endpoint: luisConfig.getEndpoint()
	};
	// Create configuration for LuisRecognizer's runtime behavior.
	const luisPredictionOptions = {
		includeAllIntents: true,
		log: true,
		staging: false
	};

	const userProfileManager = new UserProfileManager(questions);
	const luisService = new NlpService(luisApplication, luisPredictionOptions);
	const bot = new Bot(userProfileManager, luisService, welcomeMessages, options);
	bot.registerObserver(obs);

	const ADAPTER_CONFIG = 'Adapter';
	const adapterConfig = botConfig.findServiceByNameOrId(ADAPTER_CONFIG);
	const adapter = new BotFrameworkAdapter({
		appId: adapterConfig.appId,
		appPassword: adapterConfig.appPassword
	});

	return {adapter, bot};
};