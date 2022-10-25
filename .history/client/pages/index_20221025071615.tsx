import { useState, useEffect } from "react";

import { contractAddress } from "../config";
import { ethers } from "ethers";

import Library from "../abi/Library.json";

import { NextPage } from "next";
declare let window: any;
const Home: NextPage = () => {
  const [currentAccount, setCurrentAccount] = useState("");
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
  return (
    <>
      <div className="flex flex-col items-center bg-[mf3f6f4] text-[m6a50aa] min-h-screen pb-20">
        <div className="trasition hover:rotate-180 hover:scale"></div>
      </div>
    </>
  );
};

export default Home;
