import { useState, useEffect } from "react";

import { contractAddress } from "../config";
import { ethers } from "ethers";

import Library from "../abi/Library.json";

import { NextPage } from "next";
declare let window: any;
const Home: NextPage = () => {
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
    } catch (error) {
      console.log("Error connecting to Metamask: ", error);
    }
  };
  return <></>;
};

export default Home;
