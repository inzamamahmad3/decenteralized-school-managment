import { useState, useEffect } from "react";

import { contractAddress } from "../config";
import { ethers } from "ethers";

import Library from "../abi/Library.json";

import { NextPage } from "next";
declare let window: any;
const Home: NextPage = () => {
  const connectWallet = async () => {
    try {
    } catch (error) {
      console.log("Error connecting to Metamask: ", error);
    }
  };
  return <></>;
};

export default Home;
