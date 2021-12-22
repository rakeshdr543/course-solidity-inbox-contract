const assert=require('assert')
const ganache=require('ganache-cli')
const Web3=require('web3')

const {bytecode,interface}=require('../compile')

const web3=new Web3(ganache.provider())

let accounts
let inbox
const INITIAL_MESSAGE='Hey there!'

beforeEach(async()=>{
    // Get list of all accounts
    accounts=await web3.eth.getAccounts()
    
    // Use one of the account to deploy the contract
    inbox=await new web3.eth.Contract(interface)
    .deploy({data:bytecode,arguments:[INITIAL_MESSAGE]})
    .send({from:accounts[0],gas:'1000000'})
})

describe('Inbox',()=>{
    it('deploys a contract',()=>{
        assert.ok(inbox.options.address)
    })

    it('has a default message',async()=>{
        const message=await inbox.methods.message().call()
        assert.equal(message,INITIAL_MESSAGE)
    })

    it('updates message',async()=>{
        await inbox.methods.setMessage('updated Message').send({from:accounts[0]})
        const message=await inbox.methods.message().call()
        assert.equal(message,'updated Message')
    })
})