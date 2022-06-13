const TDex = artifacts.require("TDex");

module.exports = async function (deployer) {
    await deployer.deploy(TDex);
}
