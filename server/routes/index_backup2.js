const express = require("express");
const router = express.Router();

const Web3 = require("web3");
// const web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545");
// const web3 = new Web3("http://localhost:8545");
// const web3 = new Web3(Web3.givenProvider); // 안 됨
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
// var web3 = new Web3(new Web3.providers.HttpProvider('https://data-seed-prebsc-1-s1.binance.org:8545'));
const address = "0x03BbC236B90a687F1A2c9B6124Ed90b0E418b3B5";
const abi = require("../../solidity/build/contracts/BFT.json").abi;


router.get("/", async (req, res, next) => {
    res.render("index", { title: "Express" });
    console.log("=====================================================================================");
    // console.log(web3);

    const accounts = await web3.eth.getAccounts();
    console.log("accounts", accounts);
    
    // const BFT = new web3.eth.Contract(abi, address);
    // console.log(BFT);

    // const count = await BFT.methods.getCount().call();
    // console.log(count);
    // const symbol = await BFT.methods.symbol().call();
    // console.log(symbol);
    // const list = await BFT.methods.getOwnerList(1).call();
    // console.log(list);
    // const list2 = await BFT.methods.getTokenList(accounts[0]).call();
    // console.log(list2);

    // const uri = "ipfs.io/ipfs/QmbgvxydAHqrxUuPttagFv3KqZyYJNwaYhrJVWkjdFbdRT";
    // const create = await BFT.methods.create(accounts[0], uri).send({from: accounts[0]});
    // console.log(create);

    // const sendToken = await BFT.methods.sendToken(tokenId, to, from).call();
});

module.exports = router;