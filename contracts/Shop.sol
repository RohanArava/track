// SPDX-License-Identifier: MIT 
pragma solidity^0.8.9;

import "hardhat/console.sol";

contract Shop {
    enum Status{
        None,
        Started,
        Stage1,
        Stage2,
        Stage3,
        Stage4,
        Finished
    }
    struct Product {
        uint pId;
        string pName;
        Status currentStatus;
        Status[] statuses;
    }

    uint private pNonce;

    Product[] public  products;
    
    Product[] public producing;

    bool internal _isInitialized;

    constructor() {
        pNonce = 1; 
        _isInitialized = false;
    }

    function initialize() public{
        require(!_isInitialized, "Already initialized");
        console.log("Initializing");
        this.addProduct("Clay Bottle");
        this.addProduct("Clay Pot");
        this.addProduct("Weaved Basket");
        this.addProduct("Clay Statue");
        this.addProduct("Cotton Saree");
        this.addProduct("Silk Saree, Traditional");
        this.addProduct("Clay Pot, with intricate designs");
        this.start(3);
        this.start(2);
        this.updateStatus(2, 1);
        _isInitialized=true;
    }

    function addProduct(string calldata pName) public {
        Status[] memory s;
        products.push(Product(pNonce, pName, Status.Started, s));
        pNonce+=1;
    }

    function getProductInfo(uint pId) public view returns(Product memory) {
        Product memory p;
        uint l = products.length;
        for (uint i = 0; i < l; i++) {
            if (products[i].pId == pId) {
                p = products[i];
                break;
            }
        }
        return p;
    }

    function getProducing() public view returns(Product[] memory){
        return producing;
    }

    function getProducts() public view returns(Product[] memory){
        return products;
    }

    function getProducingInfo(uint pId) public view returns(Product memory) {
        Product memory p;
        uint l =producing.length;
        for (uint i = 0; i < l; i++) {
            if (producing[i].pId == pId) {
                p = producing[i];
                break;
            }
        }
        return p;
    }

    function start(uint pId) public {
        uint l = products.length;
        for (uint i = 0; i < l; i++) {
            if (products[i].pId == pId) {
                producing.push(Product(products[i].pId, products[i].pName, Status.Started, products[i].statuses));
                break;
            }
        }
        
    }

    function updateStatus(uint pId, uint status) public{
        uint l = producing.length;
        for (uint i = 0; i < l; i++) {
            if (producing[i].pId == pId) {
                producing[i].currentStatus = Status(status);
                
                break;
            }
        }
    }
}