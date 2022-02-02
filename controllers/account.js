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
    faucet: (req, res, next) => {
        //...
    },
};
