import React from 'react';

const Main = (props) => {
    const { 
        account, tokenIdChanged, addressChanged, 
        getCount, tokenURI, URI, ownerOf, 
        getOwnerList, getTokenList, sendToken, createToken } = props;
    return (
        <>
        <div>
            <h2>Account</h2>
            <p>{account}</p>
        </div>
        <div>
            <h2>NFT Count</h2>
            <p className="count"></p>
            <button onClick={getCount}>click</button>
        </div>
        <div>
            <h2>TokenURI</h2>
            <a className="uri" href={URI} target="_blank"></a>
            <input type="number" min="1" onChange={tokenIdChanged} placeholder="tokenId"/>
            <button onClick={tokenURI}>click</button>
        </div>
        <div>
            <h2>OwnerOf</h2>
            <p className="owner"></p>
            <input type="number" min="1" onChange={tokenIdChanged} placeholder="tokenId"/>
            <button onClick={ownerOf}>click</button>
        </div>
        <div>
            <h2>GetOwnerList</h2>
            <p className="ownerList"></p>
            <input type="number" min="1" onChange={tokenIdChanged} placeholder="tokenId"/>
            <button onClick={getOwnerList}>click</button>
        </div>
        <div>
            <h2>GetTokenList</h2>
            <p className="tokenList"></p>
            <input type="text" onChange={addressChanged} placeholder="address"/>
            <button onClick={getTokenList}>click</button>
        </div>
        <div>
            <h2>Create</h2>
            <form onSubmit={createToken}> 
                <input type="text" name="cid" placeholder="IPFS CID"/>
                <button type="submit">create</button>
            </form>
        </div>
        <div>
            <h2>SendToken</h2>
            <form onSubmit={sendToken}>
                <input type="number" name="tokenId" placeholder="tokenId"/>
                <input type="text" name="to" placeholder="toAddress"/>
                <button type="submit">send</button>
            </form>
            <div>
                <h5>BlockNumber :</h5><span className="blockNumber"></span>
                <h5>BlockHash :</h5><span className="blockHash"></span>
                <h5>TxHash :</h5><span className="txHash"></span>
            </div>
        </div>
        </>
    )
}

export default Main;
