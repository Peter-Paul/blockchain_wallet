const T1 = artifacts.require("T1");
const T2 = artifacts.require("T2");
const T3 = artifacts.require("T3");
const TDex = artifacts.require("TDex");

const InitialSupply = `${10 * (10**18)}`

module.exports = async function (deployer,network,accounts) {
    await deployer.deploy(T2, InitialSupply, {from:accounts[0]});
    await deployer.deploy(T1, InitialSupply, {from:accounts[5]});
    await deployer.deploy(T3, InitialSupply, {from:accounts[9]});

    const t2 = await T2.deployed()
    const t1 = await T1.deployed()
    const t3 = await T3.deployed()

    // Transfer token from minter address to user account
    await t2.transfer(accounts[1], 10000000000, {
        from: accounts[0],
    });

    await t1.transfer(accounts[1], 10000000000, {
        from: accounts[5],
    });

    await t3.transfer(accounts[1], 10000000000, {
        from: accounts[9],
    });
};
