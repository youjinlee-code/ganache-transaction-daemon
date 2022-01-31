module.exports = {
    newTransaction: (req, res, next) => {
        res.status(200).send("새로운 트랜잭션 생성");
    },
};
