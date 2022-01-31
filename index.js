const express = require("express");
const app = express();
const account = require("./routes/account");
const transaction = require("./routes/transaction");

const PORT = 3000;

app.use("/account", account);
app.use("/transaction", transaction);

app.listen(PORT, () => {
    console.log(
        `당신의 서버 ${PORT}에서 도는중... 많은 응원과 격려 부탁드립니다`
    );
});
