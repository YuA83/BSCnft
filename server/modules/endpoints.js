const Web3 = require("web3");
const web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545");
const abi = require("../../solidity/build/contracts/BFT.json").abi;
const address = "0x03BbC236B90a687F1A2c9B6124Ed90b0E418b3B5";
const BFT = new web3.eth.Contract(abi, address);

module.exports = (app) => {
    // app.post("/create", async (req, res) => {
    //     const account = req.body.account;
    //     const uri = req.body.uri;
    //     const result = await BFT.methods.create(account, uri).call();

    //     // return res.status(404).send(false)
    // });

    // app.post("/sendToken", async (req, res) => {
    //     const tokenId = req.body.tokenId;
    //     const to = req.body.to;
    //     const from = req.body.from;
    //     const result = await BFT.methods.sendToken(tokenId, to, from).call();
    // });

    app.get("/getCount", async (req, res) => {
        const result = await BFT.methods.getCount().call();
    });

    // app.post("/getOwnerList", async (req, res) => {
    //     const tokenId = req.body.tokenId;
    //     const result = await BFT.methods.getOwnerList(tokenId).call();
    // });
    
    // app.post("/getTokenList", async (req, res) => {
    //     const account = req.body.account;
    //     const result = await BFT.methods.getTokenList(account).call();
    // });
}