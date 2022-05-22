const Wallet = artifacts.require("Wallet");

const T1Address = "0xf6784ADc43ef7E0bB87ED0Dd6fE3223c7732CEa9"
const T2Address = "0x85c17Ed65A2b69E90f496cCd8aa5B617B448d578"
const T3Address = "0x6884acDd6cC9A536330E211d64e81764263224C7"

module.exports = async function (deployer) {
    await deployer.deploy(Wallet);
}
