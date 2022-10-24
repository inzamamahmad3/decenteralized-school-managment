// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Library {
    struct Book {
        uint256 id;
        string name;
        uint256 year;
        string author;
        bool finished;
    }
    Book[] private bookList;
    mapping(uint256 => address) bookToOwner;
    event AddBook(address recipient, uint256 bookId);

    function addBook(
        string memory name,
        uint16 year,
        string memory author,
        bool finished
    ) external {
        uint256 bookId = bookList.length;
        bookList.push(Book(bookId, name, year, author, finished));
        bookToOwner[bookId] = msg.sender;
        emit AddBook(msg.sender, bookId);
    }

    function _getBookList(bool finished) private view returns (Book[] memory) {
        Book[] memory temporary = new Book[](bookList.length)
    }
}
