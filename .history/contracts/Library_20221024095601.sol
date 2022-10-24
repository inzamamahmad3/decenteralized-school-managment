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
        Book[] memory temporary = new Book[](bookList.length);

        uint256 counter = 0;
        for (uint256 i = 0; i < bookList.length; i++) {
            if (
                bookToOwner[i] == msg.sender && bookList[i].finished == finished
            ) {
                temporary[counter] = bookList[i];
                counter++;
            }
        }
        Book[] memory result = new Book[](counter);
        for (uint256 i = 0; i < counter; i++) {
            result[i] = temporary[i];
        }
        return result;
    }

    function getFinishedBooks() external view returns (Book[] memory) {
        return _getBookList(true);
    }
}
