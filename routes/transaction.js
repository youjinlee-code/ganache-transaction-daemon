const router = require("express").Router();
const { newTransaction } = require("../controllers/transaction");

router.post("/new", newTransaction);

module.exports = router;
