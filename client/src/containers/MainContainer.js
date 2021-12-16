import React, { useState } from 'react';
import Main from '../components/Main';

const MainContainer = (props) => {
    const { account, BFT } = props;
    const [TokenId, setTokenId] = useState(1);
    const [Address, setAddress] = useState("");
    const [URI, setURI] = useState("");

    const tokenIdChanged = (e) => {
        setTokenId(e.target.value);
    }
    const addressChanged = (e) => {
        setAddress(e.target.value);
    }
    
    const getCount = async () => {
        const count = await BFT.methods.getCount().call();
        document.querySelector(".count").innerHTML = count;
    }

    const tokenURI = async () => {
        const count = await BFT.methods.getCount().call();
        if (0 < TokenId && TokenId <= count) {
            const uri = await BFT.methods.tokenURI(TokenId).call();
            setURI("http://"+uri);
            document.querySelector(".uri").innerHTML = uri;
        }
        else {
            window.alert("[ ERROR ] Token Counter over or No exist token");
        }
    }

    const ownerOf = async () => {
        const count = await BFT.methods.getCount().call();
        if (0 < TokenId && TokenId <= count) {
            const owner = await BFT.methods.ownerOf(TokenId).call();
            document.querySelector(".owner").innerHTML = owner;
        }
        else {
            window.alert("[ ERROR ] NFT Counter over or No exist token");
        }
    }

    const getOwnerList = async () => {
        const count = await BFT.methods.getCount().call();
        if (0 < TokenId && TokenId <= count) {
            const ownerList = await BFT.methods.getOwnerList(TokenId).call();
            for (let i = 0; i < ownerList.length; i++) {
                console.log(i);
                console.log(ownerList[i]);
                document.querySelector(".ownerList").append(`${ownerList[i]}\n`);
            }
        }
        else {
            window.alert("[ ERROR ] NFT Counter over or No exist token");
        }
    }

    const getTokenList = async () => {
        const tokenList = await BFT.methods.getTokenList(Address).call();
        if (tokenList !== "") {
            document.querySelector(".tokenList").innerHTML = "Nothing";
        }
        else {
            document.querySelector(".tokenList").innerHTML = tokenList;
        }
    }

    const sendToken = async (e) => {
        e.preventDefault();
        const tokenId = await e.target.tokenId.value;
        const to = await e.target.to.value;
        const send = await BFT.methods.sendToken(tokenId, to, account).send({from: account});
        document.querySelector(".blockNumber").innerHTML = send.blockNumber;
        document.querySelector(".blockHash").innerHTML = send.blockHash;
        document.querySelector(".txHash").innerHTML = send.transactionHash;
    }

    const createToken = async (e) => {
        e.preventDefault();
        const cid = await e.target.cid.value;
        const create = await BFT.methods.create(account, cid).send({from: account});
        console.log(create);
    }

    return (
        <Main 
            account={account}
            tokenIdChanged={tokenIdChanged}
            addressChanged={addressChanged}
            getCount={getCount}
            tokenURI={tokenURI}
            URI={URI}
            ownerOf={ownerOf}
            getOwnerList={getOwnerList}
            getTokenList={getTokenList}
            sendToken={sendToken}
            createToken={createToken}
        />
    )
}

export default MainContainer;
