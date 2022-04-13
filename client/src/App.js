import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { create } from 'ipfs-http-client';
import Web3 from 'web3';

import BFTbuild from './contracts_build/BscNFT.json';
import Marketbuild from './contracts_build/Market.json';
import MainContainer from './containers/MainContainer';

const App = () => {
    const { ethereum, alert } = window;
    const [account, setAccount] = useState("");
    // const [chain, setChain] = useState("");
    const [BFT, setBFT] = useState("");
    const [BFTaddress, setBFTaddress] = useState("");
    const [Marketaddress, setMarketaddress] = useState("");
    const [Market, setMarket] = useState("");

    const client = create("https://ipfs.infura.io:5001/api/v0");

    useEffect(() => {
        getWeb3();
    }, []);

    // Ethereum Provider API
    // if the account is changed, rerendering
    ethereum.on("accountsChanged", () => {
        getWeb3();
    });
    // ethereum.on("chainChanged", () => {
    //     getWeb3();
    // });

    const getWeb3 = async () => {
        if (ethereum) {
            const web3 = new Web3(ethereum);
            await ethereum.enable();

            const accounts = await web3.eth.getAccounts();
            setAccount(accounts[0]);

            const networkId = await web3.eth.net.getId();
            // setChain(networkId);
            
            const BFTaddress = await BFTbuild.networks[networkId].address;
            setBFTaddress(BFTaddress);
            const Marketaddress = await Marketbuild.networks[networkId].address;
            setMarketaddress(Marketaddress);

            setBFT(new web3.eth.Contract(BFTbuild.abi, BFTaddress));
            setMarket(new web3.eth.Contract(Marketbuild.abi, Marketaddress));
        }
        else {
            alert("Please install MetaMask");
        }
    }

    return (
        <> {/* react-router-dom 최신버전(v.6)부터 Switch => Routes, component => element 로 변경 */}
        <Routes>
            <Route path="/" element={<MainContainer account={account} BFT={BFT} Market={Market} client={client} BFTaddress={BFTaddress} Marketaddress={Marketaddress}/>} />
        </Routes>
        </>
    );
}

export default App;