module.exports = {
    getUserInfo: (req, res, next) => {
        //...
    },
    newAccount: async (req, res, next) => {
        const password = req.body.password;
        const newAcc = await web3.eth.accounts.create(password);
        const { address, privateKey } = newAcc;
        // DB 저장

        res.status(201).send({
            message: "account created.",
            data: {
                address,
            },
        });
    },
    faucet: async (req, res, next) => {
        const { address } = req.body;

        const tx = {
            from: ganacheAccounts[0],
            to: address,
            value: web3.utils.toWei("5", "ether"),
        };

        web3.eth.sendTransaction(tx).on("receipt", (receipt) => {
            res.status(200).send({
                message: "faucet success.",
                data: {
                    receipt,
                },
            });
            return;
        });
    },
};
