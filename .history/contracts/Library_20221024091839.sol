// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Library {
    struct Book {
        uint256 id;
        string name;
        uint256 year;
        string author;
        bool finish;
    }
}
