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
    address payable custodian;
    uint rentalStart;
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
    address custodian,
    uint rentalStart,
    bool rented
  );
  event ProductReturned(
    uint id,
    string name,
    uint rentalDeposit,
    uint rentalCost,
    address payable owner,
    address payable borrower,
    address custodian,
    uint rentalDays,
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
    products[productCount] = Product(productCount, _name, _rentalDeposit, _rentalFee, msg.sender, msg.sender, 0, false);
    // Trigger an event
    emit ProductCreated(
      productCount,
      _name,
      _rentalDeposit,
      _rentalFee,
      msg.sender,
      false);
  }

  function rentProduct(uint _id) public payable {
    // Fetch the product
    Product memory _product = products[_id];
    // Fetch the owner
    address payable _owner = _product.owner;
    // Make sure the product has a valid id
    require(_product.id > 0 && _product.id <= productCount);
    // Require that there is enough Ether in the transaction
    require(msg.value >= _product.rentalDeposit);
    // Require that the product has not been rented already
    require(!_product.rented);
    // Require that the borrower is not the owner
    require(_owner != msg.sender);
    // Transfer responsibility to the borrower
    _product.custodian = msg.sender;
    // Set time when rental starts
    _product.rentalStart = now;
    uint endTime;
    endTime = _product.rentalStart + 2 days;
    // Mark as rented
    _product.rented = true;
    // Update the product
    products[_id] = _product;
    // Pay the owner by sending them Ether
    // address(_owner).transfer(msg.value);
    // Trigger an event
    emit ProductRented(
      productCount,
      _product.name,
      _product.rentalDeposit,
      _product.rentalFee,
      _product.owner,
      msg.sender,
      _product.rentalStart,
      true);
  }

  function returnProduct(uint _id) public payable {
    // Fetch the product
    Product memory _product = products[_id];
    // Fetch the owner
    address payable _owner = _product.owner;
    // Fetch the borrower
    address payable _borrower = _product.custodian;
    // Make sure the product has a valid id
    require(_product.id > 0 && _product.id <= productCount);
    // Require that the product is currently rented
    require(_product.rented);
    // Require that the borrower is not the owner
    require(_owner != _borrower);
    // Determine rental period, and associated rental cost
    uint endTime;
    endTime = now;
    uint rentalDays;
    rentalDays = ((endTime - _product.rentalStart) % 86400);
    // rentalDays = 2; // Hard code rentalDays for testing
    uint rentalCost;
    rentalCost = rentalDays * _product.rentalFee;
    // Transfer responsibility back to owner
    _product.custodian = _product.owner;
    // Mark as rented
    _product.rented = false;
    // Update the product
    products[_id] = _product;
    // Pay the owner by sending them Ether
    address(_owner).transfer(rentalCost);
    // Return remaining deposit to the borrower
    address(_borrower).transfer(_product.rentalDeposit - rentalCost);
    // Trigger an event
    emit ProductReturned(
      productCount,
      _product.name,
      _product.rentalDeposit,
      rentalCost,
      _product.owner,
      _borrower,
      _product.custodian,
      rentalDays,
      _product.rented);
  }

}