module.exports = adapter => {
    return {
        processMessage: (req, res) => {
            adapter.processActivity(req, res, context => {
                console.log(context);
                return new Promise((resolve, reject) => {
                    if (context.activity.type === 'message') {
                        resolve(context.sendActivity(`Hello World`));
                    }
                    resolve();
                });
            });
        },

        getConversations: (req, res) => {
            adapter.getConversations('https://smba.trafficmanager.net/apis/', null, res => {
                console.log(res);
                return new Promise((resolve, reject) => {
                    // Process any messages received
                    resolve(res);
                });
            });
        }
    };
};