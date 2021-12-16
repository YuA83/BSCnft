const BFT = artifacts.require("BFT");
const Market = artifacts.require("Market");

module.exports = async (deployer) => {
    await deployer.deploy(BFT);

    const deployedBFT = BFT.deployed();
    await deployer.deploy(Market, deployedBFT.address);
};
