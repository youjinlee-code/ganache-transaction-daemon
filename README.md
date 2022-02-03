# ganache-transaction-daemon

가나슈에서 발생하는 모든 입출금을 DB에 기록하는 데몬 만들기

## How to Use

1. 패키지를 다운로드 받습니다.

터미널에 다음과 같이 입력합니다.

```bash
$ npm install
```

2. 로컬 mysql에 "ganache_transaction_daemon" 데이터베이스를 만듭니다.

터미널에 다음과 같이 입력합니다.

```bash
$ mysql -u root -p
(비밀번호 입력)

$ create database ganache_transaction_daemon
```

3. config/config.json 파일 내 `development`에 데이터베이스 정보를 입력합니다.

```json
{
    "development": {
        "username": "root",
        "password": "자신의 비밀번호",
        "database": "ganache_transaction_daemon",
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    "test": {
        "username": "root",
        "password": null,
        "database": "database_test",
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    "production": {
        "username": "root",
        "password": null,
        "database": "database_production",
        "host": "127.0.0.1",
        "dialect": "mysql"
    }
}
```

4. sequelize-cli를 사용해 migrate을 진행합니다.

터미널에 다음과 같이 입력합니다.

```bash
$ npx sequelize-cli db:migrate
```

5. 가나슈에서 quickstart로 가상 네트워크를 만듭니다.

가나슈 서버 URL을 `http://localhost:7545`로 하드코딩 해둔 상태이기 때문에, 서버가 `7545`번 포트에서 돌고 있는지 확인해주세요.

6. 데몬을 실행합니다.

터미널에 다음과 같이 입력합니다.

```bash
$ pm2 start daemon.js
```

7. 노드 서버를 시작합니다.

```bash
$ npm run start
```

8. `POST /account/faucet`, `POST /transaction/new` 요청을 보내면 트랜잭션이 날라가고, 데몬이 이를 캐치해서 DB에 기록합니다.
