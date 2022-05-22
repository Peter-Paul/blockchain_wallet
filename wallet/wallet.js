const Web3 = require("web3")
const Wallet = require("../build/contracts/Wallet.json")

const web3 = new Web3('http://localhost:8545');

const loadWeb3 = async () => {
    const wAddress = "0xf69d57fd76CB906BA7e312616dEb6e547C15D87c"
    const accounts = await web3.eth.getAccounts()
    const account =  accounts[0]
    const nID = await web3.eth.net.getId()
    
    const walletData = Wallet.networks[nID]
    // web3.eth.sendTransaction( {
    //     from:accounts[8],
    //     to:wAddress,
    //     value:`${ 5 * (10**18)}`
    // }).then( receipt=>{
    //     console.log(receipt)
    // })
    // console.log(Wallet.abi)
    // console.log(await web3.eth.getBalance(wAddress))
    if(walletData){
        const wallet = new web3.eth.Contract( Wallet.abi, walletData.address )
        // console.log(await wallet.methods.tokenAddress("0x995b0B070d820abdeaB654BF1fa36C8e1EBa00D7").call())
        // console.log(await wallet.methods.buy().send({value:`${10 * (10 ** 18)}`, from:accounts[5]}))
        // console.log(await wallet.methods.withdraw(`${30 * (10 ** 18)}`).send({from:accounts[5]}))
    }
    // console.log(await web3.eth.getAccounts())
}

loadWeb3()