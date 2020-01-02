const Marketplace = artifacts.require('./Marketplace.sol')

require('chai')
.use(require('chai-as-promised'))
.should()

contract('Marketplace', ([deployer, owner, borrower]) => {
let marketplace

before(async () => {
  marketplace = await Marketplace.deployed()
})

describe('deployment', async () => {
  it('deploys successfully', async () => {
    const address = await marketplace.address
    assert.notEqual(address, 0x0)
    assert.notEqual(address, '')
    assert.notEqual(address, null)
    assert.notEqual(address, undefined)
  })

  it('has a name', async () => {
    const name = await marketplace.name()
    assert.equal(name, 'ETHRent Dapp')
  })

})

describe('products', async () => {
  let result, productCount

  before(async () => {
    result = await marketplace.createProduct('Table Saw', web3.utils.toWei('5', 'Ether'), web3.utils.toWei('1', 'Ether'), { from: owner })
    productCount = await marketplace.productCount()
  })

  it('creates products', async () => {
    // SUCCESS
    assert.equal(productCount, 1)
    const event = result.logs[0].args
    assert.equal(event.id.toNumber(), productCount.toNumber(), 'id is correct')
    assert.equal(event.name, 'Table Saw', 'name is correct')
    assert.equal(event.rentalDeposit, '5000000000000000000', 'deposit is correct')
    assert.equal(event.rentalFee, '1000000000000000000', 'fee is correct')
    assert.equal(event.owner, owner, 'owner is correct')
    assert.equal(event.rented, false, 'rented is correct')

    // FAILURE: Product must have a name
    await await marketplace.createProduct('', web3.utils.toWei('5', 'Ether'), web3.utils.toWei('1', 'Ether'), { from: owner }).should.be.rejected;
    // FAILURE: Product must have a Rental Deposit
    await await marketplace.createProduct('Table Saw', 0, web3.utils.toWei('1', 'Ether'), { from: owner }).should.be.rejected;
    // FAILURE: Product must have a Rental Fee
    await await marketplace.createProduct('Table Saw', web3.utils.toWei('5', 'Ether'), 0, { from: owner }).should.be.rejected;
  })

  it('rents product', async () => {
    // Track the borrower balance before rental
    let oldBorrowerBalance
    oldBorrowerBalance = await web3.eth.getBalance(borrower)
    oldBorrowerBalance = new web3.utils.BN(oldBorrowerBalance)

    // SUCCESS: Borrower rents object
    result = await marketplace.rentProduct(productCount, { from: borrower, value: web3.utils.toWei('5', 'Ether')})

    // Check logs
    const event = result.logs[0].args
    assert.equal(event.id.toNumber(), productCount.toNumber(), 'id is correct')
    assert.equal(event.name, 'Table Saw', 'name is correct')
    assert.equal(event.rentalDeposit, '5000000000000000000', 'deposit is correct')
    assert.equal(event.custodian, borrower, 'borrower is correct')
    assert.equal(event.rented, true, 'rented is correct')

    // Check that borrower sent funds
    let newBorrowerBalance
    newBorrowerBalance = await web3.eth.getBalance(borrower)
    newBorrowerBalance = new web3.utils.BN(newBorrowerBalance)

    let deposit 
    deposit = web3.utils.toWei('5', 'Ether')
    deposit = new web3.utils.BN(deposit)

    const expectedBalance = oldBorrowerBalance - deposit

    // assert.equal(newBorrowerBalance.toString(), expectedBalance.toString())

    // FAILURE: Tries to rent a product that does not exist, i.e. product must have valid id
    await marketplace.rentProduct(99, { from: borrower, value: web3.utils.toWei('5', 'Ether')}).should.be.rejected;
    // FAILURE: Buyer tries to buy without enough ether
    await marketplace.rentProduct(productCount, { from: borrower, value: web3.utils.toWei('0.5', 'Ether') }).should.be.rejected;
    // FAILURE: Deployer tries to rent the product, i.e., product can't be rented twice
    await marketplace.rentProduct(productCount, { from: deployer, value: web3.utils.toWei('5', 'Ether') }).should.be.rejected;
    // FAILURE: Borrower tries to rent again, i.e., borrower can't be the owner
    await marketplace.rentProduct(productCount, { from: borrower, value: web3.utils.toWei('5', 'Ether') }).should.be.rejected;
  })

  it('returns product', async () => {
    // Track the owner balance before return
    let oldOwnerBalance
    oldOwnerBalance = await web3.eth.getBalance(owner)
    oldOwnerBalance = new web3.utils.BN(oldOwnerBalance)

    // Track the borrower balance before return
    let oldBorrowerBalance
    oldBorrowerBalance = await web3.eth.getBalance(borrower)
    oldBorrowerBalance = new web3.utils.BN(oldBorrowerBalance)

    // SUCCESS: Borrower returns object
    result = await marketplace.returnProduct(productCount, { from: borrower })

    // Check logs
    const event = result.logs[0].args
    console.log('rentalCost', event.rentalCost)
    console.log('rentalDays', event.rentalDays)
    assert.equal(event.id.toNumber(), productCount.toNumber(), 'id is correct')
    assert.equal(event.name, 'Table Saw', 'name is correct')
    assert.equal(event.custodian, owner, 'custodian is correct')
    assert.equal(event.rented, false, 'rented is correct')

    // Track the owner balance after return
    let newOwnerBalance
    newOwnerBalance = await web3.eth.getBalance(owner)
    newOwnerBalance = new web3.utils.BN(newOwnerBalance)

    // Track the borrower balance after return
    let newBorrowerBalance
    newBorrowerBalance = await web3.eth.getBalance(borrower)
    newBorrowerBalance = new web3.utils.BN(newBorrowerBalance)

    // Check Owner balance to ensure receipt of rentalCost
    const expectedOwnerBalance = oldOwnerBalance.add(event.rentalCost)
    assert.equal(newOwnerBalance.toString(), expectedOwnerBalance.toString())

    // Check Borrower balance to ensure receipt of remaining Deposit
    // let returnedDeposit 
    // returnedDeposit = web3.utils.toWei('3', 'Ether')
    // returnedDeposit = new web3.utils.BN(returnedDeposit)
    // const expectedBorrowerBalance = oldBorrowerBalance.add(returnedDeposit)
    // assert.equal(newBorrowerBalance.toString(), expectedBorrowerBalance.toString())

    // FAILURE: Tries to return a product that does not exist, i.e. product must have valid id
    await marketplace.returnProduct(99, { from: borrower }).should.be.rejected;
    // FAILURE: Deployer tries to return the product, i.e., product can't be returned twice
    await marketplace.returnProduct(productCount, { from: deployer }).should.be.rejected;
    // FAILURE: Borrower tries to return again, i.e., borrower can't be the owner
    await marketplace.returnProduct(productCount, { from: borrower }).should.be.rejected;

  })



})
})