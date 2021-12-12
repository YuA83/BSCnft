const express = require("express");
const router = express.Router();

const Web3 = require("web3");
// const web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545");
const web3 = new Web3("http://localhost:8545");
const abi = require("../../solidity/build/contracts/BFT.json").abi;
const address = "0x03BbC236B90a687F1A2c9B6124Ed90b0E418b3B5";


router.get("/", async (req, res, next) => {
    console.log("=====================================================================================");
	res.render("index", { title: "Express" });
    


    // const account = await web3.eth.accounts.create();
    // console.log(account);


    // const accounts = await web3.eth.getAccounts();
    // const balance = await web3.eth.getBalance(accounts[0]);
    // const accounts = await web3.eth.requestAccounts();
    // console.log("accounts", accounts);
    // console.log("accounts", accounts[0]);
    // console.log("balance",balance)
    // accounts.then((account) => {
    //     // console.log("account", account);
    //     console.log("len", account.length);
    // }).catch((err) => {
    //     console.log("err", err)
    // });
    

// window => front
    // console.log(window);
    // console.log(typeof window);
    // console.log(globalThis);
    // console.log(typeof globalThis);
    // console.log(globalThis.web3);
    // const networkId = await web3.eth.net.getId();
    // console.log(Contract.networks[networkId]);


    const BFT = new web3.eth.Contract(abi, address);
    // console.log(BFT);
    // console.log(BFT.methods.symbol().call());


    // const account = web3.eth.accounts.privateKeyToAccount("");
    // console.log(account);
    // console.log(account.address);

    // const count = await BFT.methods.getCount().call();
    // console.log(count);
    // const symbol = await BFT.methods.symbol().call();
    // console.log(symbol);
    // const list = await BFT.methods.getOwnerList(1).call();
    // console.log(list);
    // const list2 = await BFT.methods.getTokenList("0x3322aF2Dc6d49E5A502355BC8A813A1ab30C5Aa9").call();
    // console.log(list2);

    // const account = "0x3322aF2Dc6d49E5A502355BC8A813A1ab30C5Aa9";
    // const account = "0x215ddbd9f54305e09C4105721Bd0e19d8431A48B";
    // const account = accounts[1];
    // const uri = "ipfs.io/ipfs/QmbgvxydAHqrxUuPttagFv3KqZyYJNwaYhrJVWkjdFbdRT";
    // const create = await BFT.methods.create(account.address, uri).send({from: account.address});
    // console.log(create);

    // const from = "0x3322aF2Dc6d49E5A502355BC8A813A1ab30C5Aa9";
    // const to = "0x1969C250F6216D27a61BFE901c8056B242B4BC63";
    // const sendToken = await BFT.methods.sendToken(tokenId, to, from).call();


    // if (typeof web3 !== 'undefined') {
    //     console.log("aa");
    //     web3 = new Web3(web3.currentProvider);
    // } else {
    //     console.log('No web3? You should consider trying MetaMask!');
    //     web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    // }

    // if (window.ethereum != null) {
    //     state.web3 = new Web3(window.ethereum);
    //     try {
    //         // Request account access if needed
    //         await window.ethereum.enable();
    //         // Acccounts now exposed
    //     } catch (error) {
    //         // User denied account access...
    //     }
    // }
});

module.exports = router;