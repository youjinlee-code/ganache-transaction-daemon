const user = require("../models/user");

module.exports = {
    getUserInfo: (req, res, next) => {
        //...
    },
    newAccount: async (req, res, next) => {
        const password = req.body.password;
        const newAccAddr = await web3.eth.personal.newAccount(password);

        await user.create({
            address: newAccAddr,
            password,
            balance: "0",
        });

        res.status(201).send({
            message: "account created.",
            data: {
                address: newAccAddr,
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
