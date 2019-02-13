const { LuisRecognizer } = require('botbuilder-ai');

class NlpService {
        /**
     * The Bot constructor requires one argument (`application`) which is used to create an instance of `LuisRecognizer`.
     * @param {LuisApplication} luisApplication The basic configuration needed to call LUIS. In this sample the configuration is retrieved from the .bot file.
     * @param {LuisPredictionOptions} luisPredictionOptions (Optional) Contains additional settings for configuring calls to LUIS.
     */

    constructor(application, luisPredictionOptions) {
        this.luisRecognizer = new LuisRecognizer(application, luisPredictionOptions, true);
    }

    async nlp(context) {
        // Perform a call to LUIS to retrieve results for the user's message.
        const results = await this.luisRecognizer.recognize(context);

        // Since the LuisRecognizer was configured to include the raw results, get the `topScoringIntent` as specified by LUIS.
        const topIntent = results.luisResult.topScoringIntent;

        const data = {
            intent: topIntent.intent
        };

        // Since the LuisRecognizer was configured to include the raw results, get returned entity data.
        const entityData = results.luisResult.entities;
        // See if LUIS found and used an entity to determine user intent.
        if (entityData.length > 0) {
            data.entity = {type: entityData[0].type, score: entityData[0].score};
        }
        return data;
    }
}

module.exports = NlpService;