const BscNFT = artifacts.require("BscNFT");
const Market = artifacts.require("Market");

module.exports = async (deployer) => {
    await deployer.deploy(BscNFT);

    const deployedBscNFT = await BscNFT.deployed();
    await deployer.deploy(Market, deployedBscNFT.address);
}