import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Web3 from 'web3';

import BFT from './build-contracts/BFT.json';
import MainContainer from './containers/MainContainer';

const App = () => {
    const { ethereum, alert } = window;
    const [Account, setAccount] = useState("");
    // const [NetworkId, setNetworkId] = useState("");
    const [Contract, setContract] = useState("");

    useEffect(() => {
        getWeb3();
    // }, [Account, NetworkId]);
    }, [Account]);

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

            const netId = await web3.eth.net.getId();
            const network = await BFT.networks[netId];
            // setNetworkId(netId);

            const contractBFT = new web3.eth.Contract(BFT.abi, network.address);
            setContract(contractBFT);
        }
        else {
            alert("Please install MetaMask");
        }
    }

    return (
        <>
        {/* react-router-dom 최신버전(v.6)부터 Switch => Routes, component => element 로 변경 */}
        <Routes>
            <Route path="/" element={<MainContainer account={Account} BFT={Contract}/>} />
        </Routes>
        </>
    );
}

export default App;