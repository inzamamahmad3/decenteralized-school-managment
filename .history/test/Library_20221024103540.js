const { expect } = require("chai");
const { ethers } = require("ethers");
function getRandomInterger(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
}

describe("Library Contract", function () {
  let Library;
  let library; // an object of our contract

  let owner;
  const NUM_UNFINISHED_BOOK = 5;
  const NUM_FINISHED_BOOK = 3;

  let unfinishedBookList;
  let finishedBookList;

  beforeEach(async function () {
    Library = await ethers.getContractFactory("Library");
    library = await Library.deploy();
    [owner] = await ethers.getSigners();

    unfinishedBookList = [];
    finishedBookList = [];

    for(let i = 0 ;i< NUM_UNFINISHED_BOOK; i++){
        let book = {
            'name': getRandomInterger(1, 1000).toString() ,
            'year': ,
            author: ,
            "finished": false
        }
    }
  });
});
