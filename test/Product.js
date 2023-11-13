// const { expect } = require("chai");

// describe("Testing Creation", function () {
//   it("Deployment should create default products", async function () {
//     const hardhatShop = await ethers.deployContract("Shop");
//     await hardhatShop.initialize()
//     const product = await hardhatShop.getProductInfo(1);
//     expect(await product.pName).to.equal("Clay Bottle");
//   });

//   it("Initialize only runs once", async function () {
//     const hardhatShop = await ethers.deployContract("Shop");
//     await hardhatShop.initialize()
//     await expect(hardhatShop.initialize()).to.be.revertedWith("Already initialized");
//   });

//   it("getProducts returns a list of products", async function () {
//     const [_, buyer] = await ethers.getSigners();
//     const hardhatShop = await ethers.deployContract("Shop");
//     await hardhatShop.initialize()
//     await hardhatShop.start(2)
//     const products = await hardhatShop.getProducing();
//     expect(await products).to.be.an("array");
//   });

//   it("getProducing returns a list of producing", async function () {
//     const [_, buyer] = await ethers.getSigners();
//     const hardhatShop = await ethers.deployContract("Shop");
//     await hardhatShop.initialize()
//     await hardhatShop.start(2)
//     const products = await hardhatShop.getProducing();
//     expect(await products).to.be.an("array");
//   });
// });