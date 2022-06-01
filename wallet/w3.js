const Web3 = require("web3")
const web3 = new Web3('http://localhost:8545');

class W3 {
    constructor(abi){
        this.abi=abi
    }
    init(){
        return new Promise( async (resolve,reject) => {
            const networkID = await web3.eth.net.getId()
            const contractData = this.abi.networks[networkID]
            if (contractData){
                const address =  contractData.address
                const contract = new web3.eth.Contract( this.abi.abi, address )
                resolve( {contract, address} )
            }else{
                reject("Network error")
            }
        } )
    }
}

module.exports = W3