const {
    BN,           // Big Number support
    constants,    // Common constants, like the zero address and largest integers
    expectEvent,  // Assertions for emitted events
    expectRevert, // Assertions for transactions that should fail
  } = require('@openzeppelin/test-helpers');
const T1 = artifacts.require("T1");

contract('T1', (accounts) => {
    let t1;

    minter = accounts[0]

    before( async () => {
        t1 = await T1.deployed()

    })
    describe("Minter", () => {
        it("Minter should be the admin", async () => {
            return minter == await t1.admin
        })
    })
    describe("Minting", () => {
        it("Should prevent minting if not admin", async ()=>{
            return await expectRevert(
                t1.mint('0xf69d57fd76CB906BA7e312616dEb6e547C15D87c',3000, {from:accounts[4]}),
                "You don't have permission to "
            )
        })
    })
})