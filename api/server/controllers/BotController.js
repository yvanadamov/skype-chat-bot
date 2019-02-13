module.exports = (adapter, bot) => {
    return {
        processMessage: (req, res) => {
            adapter.processActivity(req, res, async turnContext => {
                await bot.onTurn(turnContext);
            });
        }
    };
};