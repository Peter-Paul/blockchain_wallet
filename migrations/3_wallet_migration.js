const Wallet = artifacts.require("Wallet");

module.exports = async function (deployer) {
    await deployer.deploy(Wallet);
}
