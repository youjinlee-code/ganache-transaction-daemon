const router = require("express").Router();
const { getUserInfo, newAccount, faucet } = require("../controllers/account");

router.get("/", getUserInfo);

router.post("/new", newAccount);

router.post("/faucet", faucet);

module.exports = router;
