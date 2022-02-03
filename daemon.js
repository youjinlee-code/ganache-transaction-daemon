const cron = require("node-cron");
const Web3 = require("web3");
const GANACHE_SERVER = "http://localhost:7545";
const web3 = new Web3(new Web3.providers.HttpProvider(GANACHE_SERVER));
const { User } = require("./models");
let lastBlock = 0;

const getAllUser = async () => {
    let users = await User.findAll({
        attributes: ["address"],
    });
    let result = users.map((user) => user.dataValues.address);
    return result;
};

const transactionDbSync = async (tx) => {
    const allUser = await getAllUser(); // DB에 저장된 모든 유저의 주소를 가져온다
    let fromBalance, toBalance;

    if (allUser.indexOf(tx.from) != -1) {
        // 트랜잭션 from이 우리 유저의 주소값이면
        fromBalance = await web3.eth.getBalance(tx.from); // 잔액 가져와서
        await User.update(
            // DB에 갱신
            { balance: String(fromBalance) },
            {
                where: {
                    address: tx.from,
                },
            }
        );
    }
    if (allUser.indexOf(tx.to) != -1) {
        toBalance = await web3.eth.getBalance(tx.to);
        await User.update(
            { balance: String(toBalance) },
            {
                where: {
                    address: tx.to,
                },
            }
        );
    }
};

const getBlocks = async () => {
    const latestBlock = await web3.eth.getBlock("latest"); // 최신 블록을 가져온다
    for (let i = lastBlock + 1; i <= latestBlock.number; i++) {
        // 지난번에 봤던 블록 다음부터 최신블록까지 가져온다
        let block = await web3.eth.getBlock(i); // 블록을 하나씩 깐다
        for (let j = 0; j < block.transactions.length; j++) {
            // 블록에 있는 트랜잭션을 확인
            let tx = await web3.eth.getTransaction(block.transactions[j]); // 트랜잭션 정보를 가져온다
            transactionDbSync(tx);
        }
    }
    lastBlock = latestBlockNum + 1;
};

const task = cron.schedule(
    "*/30 * * * * *", // 30초에 한번씩 실행
    async () => {
        getBlocks();
    },
    {
        scheduled: false,
    }
);

task.start();
