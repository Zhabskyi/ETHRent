pragma solidity >=0.4.21 <0.7.0;

contract Marketplace {
  string public name;
  uint public productCount = 0;
  mapping(uint => Product) public products;
  struct Product {
    uint id;
    string name;
    uint rentalDeposit;
    uint rentalFee;
    address payable owner;
    bool rented;
  }
  event ProductCreated(
    uint id,
    string name,
    uint rentalDeposit,
    uint rentalFee,
    address payable owner,
    bool rented
  );
  event ProductRented(
    uint id,
    string name,
    uint rentalDeposit,
    uint rentalFee,
    address payable owner,
    bool rented
  );
  constructor() public {
    name = "ETHRent Dapp";
  }
  function createProduct(string memory _name, uint _rentalDeposit, uint _rentalFee) public {
    // Require a valid name
    require(bytes(_name).length > 0);
    // Require a valid rental deposit
    require(_rentalDeposit > 0);
    // Require a valid rental fee
    require(_rentalFee > 0);
    // Increment product count
    productCount ++;
    // Create the product
    products[productCount] = Product(productCount, _name, _rentalDeposit, _rentalFee, msg.sender, false);
    // Trigger an event
    emit ProductCreated(productCount, _name, _rentalDeposit, _rentalFee, msg.sender, false);
  }
  function rentProduct(uint _id) public payable {
    // Fetch the product
    Product memory _product = products[_id];
    // Fetch the owner
    address payable _owner = _product.owner;
    // Make sure the product has a valid id
    require(_product.id > 0 && _product.id <= productCount);
    // Require that there is enough Ether in the transaction
    require(msg.value >= (_product.rentalDeposit + _product.rentalFee));
    // Require that the product has not been purchased already
    require(!_product.rented);
    // Require that the buyer is not the seller
    require(_owner != msg.sender);
    // Transfer ownership to the buyer
    _product.owner = msg.sender;
    // Mark as purchased
    _product.rented = true;
    // Update the product
    products[_id] = _product;
    // Pay the seller by sending them Ether
    address(_owner).transfer(msg.value);
    // Trigger an event
    emit ProductRented(productCount, _product.name, _product.rentalDeposit, _product.rentalFee, msg.sender, true);
  }

}