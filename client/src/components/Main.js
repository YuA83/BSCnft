import React from 'react';

const Main = (props) => {
    const { 
        account, tokenIdChanged, addressChanged, 
        ownerHistory, 
        fileBuffer, createToken, IPFS_URL,
        salesToken,
    } = props;

    return (
        <>
        <div>
            <span className="contractAddr"></span>
        </div>
        <div>
            <h4>My Wallet</h4>
            <h5>Account: </h5><span>{account}</span>
            <h5>My Token List</h5>
            <ul className="myTokenList"></ul>
        </div>
        <div>
            <h4>NFT Count</h4>
            <p className="count"></p>
            {/* count, tokenId, Image, 판매 유무 */}
        </div>
        <div>
            {/* 판매 리스트 (토큰 아이디, 이미지, 소유주, 가격) */}
        </div>
        <div>
            <h4>IPFS File Upload & Create Token</h4>
            <form onSubmit={createToken}>
                <input type="file" name="file" placeholder="upload your file" onChange={fileBuffer}/>
                <button type="submit">upload</button>
            </form>
            <div>
                <h4>Create Result</h4>
                <h5>CID :</h5><span className="cid"></span>
                <h5>URL :</h5><a className="url" href={IPFS_URL} target="_blank"></a>
                <img src={IPFS_URL}/>
            </div>
        </div>
        <div>
            <h4>Sales Token</h4>
            <form onSubmit={salesToken}>
                <input type="number" onChange={tokenIdChanged} placeholder="tokenId"/>
                <input type="text" placeholder="price"/>
            </form>
        </div>
        <div>
            <h4>Buy Token</h4>
        </div>
        <div>
            <h4>The Token Owner History</h4>
            <p className="ownerHistory"></p>
            <input type="number" min="1" onChange={tokenIdChanged} placeholder="tokenId"/>
            <button onClick={ownerHistory}>click</button>
        </div>
        </>
    )
}

export default Main;
