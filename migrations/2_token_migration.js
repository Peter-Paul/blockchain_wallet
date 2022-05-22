const T1 = artifacts.require("T1");
const T2 = artifacts.require("T2");
const T3 = artifacts.require("T3");

const T1Owner = "0x5BfBaBFbf73C8253B9Fae65A0567879D80289be3"
const T2Owner = "0x233f8daAB39642dF24e51865F7bbe36c08618854"
const T3Owner = "0xCB7e40Aa1c1AE7E8331b53AB7e3C888E6C9B9909"

const T1InitialSupply = `${10 * (10**18)}`
const T2InitialSupply = `${10 * (10**18)}`
const T3InitialSupply = `${10 * (10**18)}`

module.exports = async function (deployer) {
    await deployer.deploy(T2, T2InitialSupply, {from:T2Owner});
    await deployer.deploy(T1, T1InitialSupply, {from:T1Owner});
    await deployer.deploy(T3, T3InitialSupply, {from:T3Owner});
};
