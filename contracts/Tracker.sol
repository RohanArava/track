// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract Ownable {
    address private _owner;

    constructor() {
        _owner = msg.sender;
    }

    function owner() public view returns (address) {
        return _owner;
    }

    modifier onlyOwner() {
        require(isOwner(), "Function accessible only by the owner!!");
        _;
    }

    function isOwner() public view returns (bool) {
        return msg.sender == _owner;
    }
}

contract Tracker is Ownable {
    struct Status {
        uint status;
        uint time;
        string orderAddress;
    }
    struct Product {
        uint productId;
        string productName;
    }
    struct Order {
        uint orderId;
        uint productId;
        address powner;
        string location;
        uint[] statusIndices;
    }

    bool private _isInitialized;
    uint private productNonce;
    uint private orderNonce;
    Order[] private orders;
    Product[] private products;
    mapping(uint => Status[]) private orderStatuses;

    constructor() Ownable() {
        productNonce = 1;
        orderNonce = 1;
        _isInitialized = false;
    }

    function initialize() public {
        require(!_isInitialized, "Already initialized");
        // Add products
        addProduct("Clay Bottle");
        addProduct("Clay Pot");
        addProduct("Weaved Basket");
        addProduct("Clay Statue");
        addProduct("Cotton Saree");
        addProduct("Silk Saree, Traditional");
        addProduct("Clay Pot, with intricate designs");
        _isInitialized = true;
    }

    function buyProduct(uint productId) public {
        // console.log(productId);

        uint orderId = orderNonce;
        orderStatuses[orderId].push(Status(0, block.timestamp, ""));
        orders.push(Order(orderId, productId, msg.sender, "", new uint[](0)));
        orders[orderId - 1].statusIndices.push(orderStatuses[orderId].length);
        orderNonce += 1;
    }

    function getProduct(uint productId) public view returns (Product memory) {
        Product memory p;
        uint l = products.length;
        for (uint i = 0; i < l; i++) {
            if (products[i].productId == productId) {
                p = products[i];
                break;
            }
        }
        return p;
    }

    function getProducts() public view returns (Product[] memory) {
        return products;
    }

    function getOrder(uint orderId) public view returns (Order memory) {
        Order memory o;
        uint l = orders.length;
        for (uint i = 0; i < l; i++) {
            if (orders[i].orderId == orderId) {
                o = orders[i];
            }
        }
        return o;
    }

    function getOrders() public view returns (Order[] memory) {
        return orders;
    }

    function getOrdersOfUser() public view returns (Order[] memory) {
        uint l = orders.length;
        uint num = 0;
        for (uint i = 0; i < l; i++) {
            if (orders[i].powner == msg.sender) {
                num += 1;
            }
        }

        Order[] memory userOrders = new Order[](num);
        uint j = 0;
        for (uint i = 0; i < l; i++) {
            if (orders[i].powner == msg.sender) {
                userOrders[j] = orders[i];
                j += 1;
            }
        }

        return userOrders;
    }

    function addProduct(string memory pName) public onlyOwner {
        products.push(Product(productNonce, pName));
        productNonce += 1;
    }

    function addStatus(
        uint orderId,
        uint status,
        string memory orderAddress
    ) public onlyOwner {
        // uint[] storage statusIndices = orders[orderId - 1].statusIndices;
        // uint orderStatusIndex = statusIndices[statusIndices.length - 1];
        orderStatuses[orderId].push(Status(
            status,
            block.timestamp,
            orderAddress
        ));
    }

    function getStatuses(uint orderId) public view returns (Status[] memory) {
        require(orderId <= orderNonce, "Order ID does not exist");
        
        return orderStatuses[orderId];
    }

    function getMostRecentStatus(
        uint orderId
    ) public view returns (Status memory) {
        require(orderId <= orderNonce, "Order ID does not exist");

        Status[] memory statuses = orderStatuses[orderId];
        uint numStatuses = statuses.length;

        require(numStatuses > 0, "No statuses for this order");

        return statuses[numStatuses - 1];
    }
}
