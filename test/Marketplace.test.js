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
    assert.equal(event.rentalDeposit, '5000000000000000000', 'price is correct')
    assert.equal(event.rentalFee, '1000000000000000000', 'price is correct')
    assert.equal(event.owner, owner, 'owner is correct')
    assert.equal(event.rented, false, 'rented is correct')

    // FAILURE: Product must have a name
    await await marketplace.createProduct('', web3.utils.toWei('5', 'Ether'), web3.utils.toWei('1', 'Ether'), { from: owner }).should.be.rejected;
    // FAILURE: Product must have a Rental Deposit
    await await marketplace.createProduct('Table Saw', 0, web3.utils.toWei('1', 'Ether'), { from: owner }).should.be.rejected;
    // FAILURE: Product must have a Rental Fee
    await await marketplace.createProduct('Table Saw', web3.utils.toWei('5', 'Ether'), 0, { from: owner }).should.be.rejected;
  })

  it('rents products', async () => {
    // Track the owner balance before rental
    let oldOwnerBalance
    oldOwnerBalance = await web3.eth.getBalance(owner)
    oldOwnerBalance = new web3.utils.BN(oldOwnerBalance)

    // SUCCESS: Borrower rents object
    result = await marketplace.rentProduct(productCount, { from: borrower, value: web3.utils.toWei('5', 'Ether')})

    // Check logs
    const event = result.logs[0].args
    assert.equal(event.id.toNumber(), productCount.toNumber(), 'id is correct')
    assert.equal(event.name, 'Table Saw', 'name is correct')
    assert.equal(event.price, '5000000000000000000', 'price is correct')
    assert.equal(event.owner, borrower, 'borrower is correct')
    assert.equal(event.rented, true, 'rented is correct')

    // Check that owner received funds
    let newOwnerBalance
    newOwnerBalance = await web3.eth.getBalance(owner)
    newOwnerBalance = new web3.utils.BN(newOwnerBalance)

    let price 
    price = web3.utils.toWei('5', 'Ether')
    price = new web3.utils.BN(price)

    const expectedBalance = ownerBalance.add(price)

    assert.equal(borrowerBalance.toString(), expectedBalance.toString())

    // FAILURE: Tries to buy a product that does not exist, i.e. product must have valid id
    await marketplace.rentProduct(99, { from: buyer, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;
    // FAILURE: Buyer tries to buy without enough ether
    await marketplace.rentProduct(productCount, { from: buyer, value: web3.utils.toWei('0.5', 'Ether') }).should.be.rejected;
    // FAILURE: Deployer tries to rent the product, i.e., product can't be rented twice
    await marketplace.rentProduct(productCount, { from: deployer, value: web3.utils.toWei('1', 'Ether') }).should.be.rejected;
    // FAILURE: Buyer tries to buy again, i.e., buyer can't be the seller
    await marketplace.rentProduct(productCount, { from: buyer, value: web3.utils.toWei('1', 'Ether') }).should.be.rejected;
  })

})
})