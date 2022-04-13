import React, { useEffect, useState } from 'react';
import Main from '../components/Main';

const MainContainer = (props) => {
    const { account, BFT, Market, client, BFTaddress, Marketaddress } = props;
    const [tokenId, setTokenId] = useState(1);
    const [address, setAddress] = useState("");
    const [file, setFile] = useState("");
    const [IPFS_URL, setURL] = useState("");

    useEffect(() => {
        document.querySelector(".contractAddr").innerHTML = BFTaddress;
    }, [])

    const tokenIdChanged = (e) => {
        setTokenId(e.target.value);
    }
    const addressChanged = (e) => {
        setAddress(e.target.value);
    }

// 완료
    const ownerHistory = async () => {
        const count = await BFT.methods.getCount().call();
        if (0 < tokenId && tokenId <= count) {
            document.querySelector(".ownerHistory").innerHTML = "";
            const ownerList = await BFT.methods.getOwnerHistory(tokenId).call();
            
            for (let i = 0; i < ownerList.length; i++) {
                console.log(i);
                console.log(ownerList[i]);
                document.querySelector(".ownerHistory").append(`${ownerList[i]}\n`);
            }
        }
        else {
            window.alert("[ ERROR ] NFT Counter over or No exist token");
        }
    }
// 완료
    const fileBuffer = async (e) => {
        const data = await e.target.files[0];
        const reader = new FileReader();

        reader.readAsArrayBuffer(data);
        reader.onload = () => {
            setFile(Buffer(reader.result));
        }

        e.preventDefault();
    }
// 완료
    const createToken = async (e) => {
        e.preventDefault();

        const created = await client.add(file);
        await BFT.methods.createToken(created.path).send({from: account});

        const url = `https://ipfs.infura.io/ipfs/${created.path}`;
        setURL(url);

        document.querySelector(".cid").innerHTML = created.path;
        document.querySelector(".url").innerHTML = url;
    }

    const salesToken = () => {

    }

    return (
        <Main 
            account={account}
            tokenIdChanged={tokenIdChanged}
            addressChanged={addressChanged}
            
            ownerHistory={ownerHistory}
            
            fileBuffer={fileBuffer}
            createToken={createToken}
            IPFS_URL={IPFS_URL}

            salesToken={salesToken}
        />
    )
}

export default MainContainer;
