const { expect } = require("chai");

describe("Testing Tracker", function () {
    it("Deployment should create default products", async function () {
      const hardhatTracker = await ethers.deployContract("Tracker");
      await hardhatTracker.initialize()
      const product = await hardhatTracker.getProduct(1);
      expect(await product.productName).to.equal("Clay Bottle");
    });
    it("Testing buyProducts", async function () {
        const hardhatTracker = await ethers.deployContract("Tracker");
        await hardhatTracker.initialize();
        await hardhatTracker.buyProduct(1);
        const product = await hardhatTracker.getOrdersOfUser();
        expect(await product[0].productId).to.equal(1);
      });
      it("Testing isOwner", async function () {
        const hardhatTracker = await ethers.deployContract("Tracker");
        await hardhatTracker.initialize();
        const isOwner = await hardhatTracker.isOwner();
        // const product = await hardhatTracker.getOrdersOfUser();
        expect(isOwner).to.equal(true);
      });
      it("Testing addStatus", async function () {
        const hardhatTracker = await ethers.deployContract("Tracker");
        await hardhatTracker.initialize();
        await hardhatTracker.buyProduct(1);
        await hardhatTracker.addStatus(1, 1, "Gyan Circle");
        const p = await hardhatTracker.getStatuses(1);
        console.log(p)
        // expect(await product[0].productId).to.equal(1);
      });
});