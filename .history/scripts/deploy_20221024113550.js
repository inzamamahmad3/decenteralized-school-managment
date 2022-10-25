const { ethers } = require("hardhat");

const main = async () => {
  const contractFactory = await ethers.getContractFactory("Library");
  const contract = await contractFactory.deploy();
  await contract.deployed();
  console.log("Contract Address : ", contract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();

//  0xedB6D034593B815ba8196F35970A0B3B0B55aF01
