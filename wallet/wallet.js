const W3 = require("./w3")
const ERC20 = require("./erc20")
const walletAbi = require("../build/contracts/Wallet.json")
const t1Abi = require("../build/contracts/T1.json")
const t2Abi = require("../build/contracts/T2.json")

class Wallet {
    constructor(){
        this.w3 = new W3(walletAbi)
    }

    balanceInToken( token,user ){
        return new Promise( (resolve, reject) => {
            try{
                this.w3.init().then( async ({contract}) => {
                    try{
                        const balance = await contract.methods.balanceInToken(token,user).call()
                        resolve(balance)
                    }catch(err){reject("Possible address error")}
                })
            }catch(err){console.log('Contract initiation error')}
        })

    }

    balanceInWallet( token,user ){
        return new Promise( (resolve, reject) => {
            try{
                this.w3.init().then( async ({contract}) => {
                    try{
                        const balance = await contract.methods.balanceInWallet(token).call({from:user})
                        resolve(balance)
                    }catch(err){reject("Possible address error")}
                })
            }catch(err){console.log('Contract initiation error')}
        })

    }

}

const userAddress1 = ""
const userAddress2 = ""
const t1 = new ERC20(t1Abi)
const t2 = new ERC20(t2Abi)
const wallet = new Wallet()

t1.tokenAddress().then( address =>  wallet.balanceInToken(address,userAddress1).then( balance => console.log(balance) ) )
t2.tokenAddress().then( address =>  wallet.balanceInWallet(address,userAddress2).then( balance => console.log(balance) ) )
