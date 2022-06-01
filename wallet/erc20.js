const W3 = require("./w3")

class ERC20 {
    constructor(abi){
        this.w3 = new W3(abi)
    }

    tokenAddress(){
        return new Promise( (resolve,reject) => {
            try{
                this.w3.init().then( async ({address}) => {
                    resolve(address)
                })
            }catch(err){reject('Token initiation error')}
        } )
    }

    balanceOf(address){
        return new Promise( (resolve, reject) => {
            try{
                this.w3.init().then( async ({contract}) => {
                    try{
                        const balance = await contract.methods.balanceOf(address).call()
                        resolve(balance)
                    }catch(err){reject("Possible address error")}
                })
            }catch(err){console.log('Token initiation error')}
            
        } )
    }

    allowance(address){
        return new Promise( (resolve, reject) => {
            try{
                this.w3.init().then( async ({contract}) => {
                    try{
                        const allowannce = await contract.methods.allowance(creator,address).call() 
                        resolve(allowannce)
                    }catch(err){reject("Possible address error")}
                })
            }catch(err){console.log('Token initiation error')}
        } )
    }
    
    approve(address,amount){
        return new Promise ( (resolve,reject)=>{
            try{
                this.w3.init().then( async ({contract}) => {
                    try{
                        // since state will be modified, we use send instead of call
                        await contract.methods.approve(address,amount).send({from:creator})
                        .then((result) => resolve(result) )
                    }catch(err){console.log(err)}
                })
            }catch(err){
                reject(err)
                console.log('Token initiation error')
            }
        } )
    }

}

module.exports = ERC20