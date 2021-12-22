const assert=require('assert')
const ganache=require('ganache-cli')
const Web3=require('web3')

const {bytecode,interface}=require('../compile')

const web3=new Web3(ganache.provider())

let accounts
let inbox

beforeEach(async()=>{
    // Get list of all accounts
    accounts=await web3.eth.getAccounts()
    
    // Use one of the account to deploy the contract
    inbox=await new web3.eth.Contract(interface)
    .deploy({data:bytecode,arguments:['Hey raki!']})
    .send({from:accounts[0],gas:'1000000'})
})

describe('Inbox',()=>{
    it('deploys a contract',()=>{
        console.log(inbox)
    })
})