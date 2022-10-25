import { useState, useEffect } from "react";

import { contractAddress } from "../config";
import { ethers } from "ethers";

import Library from "../abi/Library.json";

import { NextPage } from "next";
declare let window: any;
const Home: NextPage = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [bookName, setBookName] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookYear, setBookYear] = useState("");
  const [bookFinished, setBookFinished] = useState("no");
  const connectWallet = async () => {
    try {
      const { etherem } = window;
      if (!etherem) {
        console.log("Metamask is not connected");
        return;
      }
      let chainId = await etherem.request({ method: "eth_chainId" });
      const goerliChainId = "0x5";
      if (chainId != goerliChainId) {
        alert("You're not connected to Goerli Test Network");
        return;
      }
      const accounts = await etherem.request({ method: "eth_requestAccounts" });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log("Error connecting to Metamask: ", error);
    }
  };

  const submitBook = async () => {
    let book = {
      name: bookName,
      year: parseInt(bookYear),
      author: bookAuthor,
      finished: bookFinished == "yes" ? true : false,
    };
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const LibraryContract = new ethers.Contract(
          contractAddress,
          Library.abi,
          signer
        );
        let libraryTx = await LibraryContract.addBook(
          book.name,
          book.year,
          book.author,
          book.finished
        );
        console.log(libraryTx);
      } else {
        console.log("Ethereum object does not exist");
      }
    } catch (error) {
      console.log("Error while submitig book", error);
    }
  };
  return (
    <>
      <div className="flex flex-col items-center bg-[mf3f6f4] text-[m6a50aa] min-h-screen pb-20">
        <div className="trasition hover:rotate-180 hover:scale-105 transition duration-500 ease-in-out"></div>
        <h2 className="text-3xl font-bold mb-20 mt-12">
          Manage your Personal Library
        </h2>
        {currentAccount == "" ? (
          <button
            className="text-2xl font-bold py-3 px-12 bg-orange-600 rounded-lg mb-10 hover:scale-105 transition"
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
        ) : (
          <div>
            <div className="text-3xl font-bold mb-20 mt-12">
              <h4>Wallet Connected: {currentAccount}</h4>
            </div>

            <div className="text-xl font-semibold mb-20 mt-4">
              <input
                className="text-xl font-bold mb-2 mt-1"
                type={"text"}
                placeholder="Book Name"
                value={bookName}
                onChange={(e) => setBookName(e.target.value)}
              />
              <br />
              <input
                className="text-xl font-bold mb-2 mt-1"
                type={"text"}
                placeholder="Book Author"
                value={bookName}
                onChange={(e) => setBookAuthor(e.target.value)}
              />
              <br />
              <input
                className="text-xl font-bold mb-2 mt-1"
                type={"text"}
                placeholder="Book Name"
                value={bookName}
                onChange={(e) => setBookName(e.target.value)}
              />
              <br />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
