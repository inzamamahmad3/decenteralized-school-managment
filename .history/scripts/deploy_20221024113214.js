const { ethers } = require("hardhat");

const main = async () => {
  const contractFactory = await ethers.getContractFactory("Library");
  const contract = await contractFactory.deploy();
  await contract.deployed();
  console.log("Contract Address : ", contract.address);
};
