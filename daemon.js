const cron = require("node-cron");
const Web3 = require("web3");
const GANACHE_SERVER = "http://localhost:7545";
const web3 = new Web3(new Web3.providers.HttpProvider(GANACHE_SERVER));

let lastBlock = 0;

const getTransactions = () => {
    // 1. 마지막으로 조회한 블록부터 최신 블록까지 읽는다.
    // 2. 각 블록을 까서 트랜잭션을 확인한다.
    // 3. 트랜잭션에 DB에 있는 주소가 있는 경우, DB를 업데이트
    //   3-1. faucet 트랜잭션
    //   3-2. 송금 트랜잭션
};
const task = cron.schedule(
    "* * * * * *",
    () => {
        getTransactions();
    },
    {
        scheduled: false,
    }
);

task.start();
