# skype-chat-bot
Node.js based Skype bot for JavaScript Advanced course

## Resources
 - [Initial article about Skype chat bot](https://medium.com/@AmJustSam/how-to-build-skype-bot-with-nodejs-ddec8372114c);
 - [ngrok - testing server](https://ngrok.com/);
 - [Microsoft documentation](https://docs.microsoft.com/en-us/azure/bot-service/bot-service-overview-introduction?view=azure-bot-service-4.0);
 - [How bots work - message processing](https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-basics?view=azure-bot-service-4.0&tabs=cs#the-activity-processing-stack);

## Configuration
Azure skype bot is configure. Message end point is set to `https://<id>.ngrok.io/api/messages`. This link is get from *ngrok* service which is a secure point which is redirecting skype messages which comes to him. Start it by typing `ngrok http 8080` in its exe terminal.

## Entry point
`cd api` and then `npm start`;
It will start ```index.js``` which start web server and skype bot connector(adapter) from `server` directory;

## npm packages
 - botbuilder, botbuilder-ai, botframework-config for skype bot related stuff;
 - express for http entry point;