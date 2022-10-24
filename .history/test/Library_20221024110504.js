const { expect } = require("chai");
const { ethers } = require("ethers");
function getRandomInterger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function verifyBook(bookChain, book) {
  expect(book.name).to.equal(bookChain.name);
  expect(book.year.toString().to.equal(bookChain.year.toString()));
  expect(book.author).to.equal(bookChain.author);
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

    for (let i = 0; i < NUM_UNFINISHED_BOOK; i++) {
      let book = {
        name: getRandomInterger(1, 1000).toString(),
        year: getRandomInterger(1000, 2022).toString(),
        author: getRandomInterger(1, 1000).toString(),
        finished: false,
      };
      await library.addBook(book.name, book.year, book.author, book.finished);
      unfinishedBookList.push(book);
    }

    for (let i = 0; i < NUM_FINISHED_BOOK; i++) {
      let book = {
        name: getRandomInterger(1, 1000).toString(),
        year: getRandomInterger(1000, 2022).toString(),
        author: getRandomInterger(1, 1000).toString(),
        finished: true,
      };
      await library.addBook(book.name, book.year, book.author, book.finished);
      finishedBookList.push(book);
    }
  });

  describe("ADD a Book", function () {
    it("should emit add Book event", async function () {
      let book = {
        name: getRandomInterger(1, 1000).toString(),
        year: getRandomInterger(1000, 2022).toString(),
        author: getRandomInterger(1, 1000).toString(),
        finished: true,
      };
      await expect(
        await library.addBook(book.name, book.year, book.author, book.finished)
      )
        .to.emit(library, "AddBook")
        .withArgs(owner.address, NUM_UNFINISHED_BOOK + NUM_UNFINISHED_BOOK);
    });
  });

  describe("Get Book", function () {
    it("Should return the correct unfinished books", async function () {
      const booksFromChain = await library.getUnFinishedBooks();

      expect(booksFromChain.length).to.equal(NUM_UNFINISHED_BOOK);
    });
  });
});
