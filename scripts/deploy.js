const hre = require("hardhat");

async function main() {
  const Tracker = await hre.ethers.getContractFactory("Tracker");
  const tracker = await Tracker.deploy();
  await tracker.waitForDeployment();
  await tracker.initialize();
  console.log("Deployed contract address: ",`${await tracker.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
