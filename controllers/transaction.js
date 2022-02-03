module.exports = {
    newTransaction: async (req, res, next) => {
        try {
            const { from, to, password, value } = req.body;

            const tx = {
                from,
                to,
                value: web3.utils.toWei(value, "ether"),
            };

            const txHash = await web3.eth.personal.sendTransaction(
                tx,
                password
            );

            res.status(200).send({
                message: "transaction success.",
                data: {
                    txHash,
                },
            });
        } catch (err) {
            console.log(err);
            res.status(404).send({
                message: "server error",
                errMsg: err,
            });
        }
    },
};
