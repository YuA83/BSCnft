// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract BscNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    constructor() ERC721("BinanceSmartChainNFT", "BFT") {}

    mapping(string => bool) private existsURI; // tokenURI => true or false
    mapping(uint256 => address[]) private ownerHistory; // tokenId => ownerHistory
    mapping(address => uint256[]) private myTokenList; // some account => tokenIds owned by the account
    mapping(uint256 => uint256) private salesList; // tokenId => price

    address private Marketaddress; // Market address

    // approve the Market address
    function setApproveAddress(address _Marketaddress) public {
        Marketaddress = _Marketaddress;
    }

    function setApprove(uint256 _tokenId) private {
        approve(Marketaddress, _tokenId);
    }

    // create token
    function createToken(string memory _tokenURI) public {
        require(!existsURI[_tokenURI], "The URI already exsists");

        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, _tokenURI);

        ownerHistory[newTokenId].push(msg.sender);
        myTokenList[msg.sender].push(newTokenId);
        existsURI[_tokenURI] = true;
    }

    // edit myTokenList and ownerHistory
    function editList(uint256 _tokenId, address _buyer) public {
        address seller = ownerOf(_tokenId);
        uint256 len = myTokenList[seller].length;

        for (uint i = 0; i < len; i++) {
            if (myTokenList[seller][i] == _tokenId) {
                myTokenList[seller][i] = myTokenList[seller][len-1];
            }
        }
        myTokenList[seller].pop();
        
        ownerHistory[_tokenId].push(_buyer);
        myTokenList[_buyer].push(_tokenId);
    }

    // send the token from seller to buyer
    function sendToken(uint256 _tokenId, address _buyer) public {
        address seller = ownerOf(_tokenId);
        safeTransferFrom(seller, _buyer, _tokenId);
        delete salesList[_tokenId];
    }
    
    // put the token on sales list
    function salesToken(uint256 _tokenId, uint256 _price) public {
        require(_tokenId > 0 && _tokenId <= getCount(), "Does not exists the tokenId");
        require(msg.sender == ownerOf(_tokenId), "You are not owner of the token");
        require(salesList[_tokenId] == 0, "The token already exists in salesList");
        require(_price > 0, "The price is higher than zero");

        setApprove(_tokenId);
        salesList[_tokenId] = _price;
    }

    // get list of token on sale
    function getSalesList(uint256 _tokenId) public view returns(uint256, uint256, string memory, address) {
        require(_tokenId > 0 && _tokenId <= getCount(), "Does not exists the tokenId");
        require(salesList[_tokenId] > 0, "Does not sales the token");

        return (
            _tokenId,
            salesList[_tokenId],
            tokenURI(_tokenId),
            ownerOf(_tokenId)
        );
    }

    // get token price
    function getTokenPrice(uint256 _tokenId) public view returns(uint256) {
        require(_tokenId > 0 && _tokenId <= getCount(), "Does not exists the tokenId");
        require(salesList[_tokenId] > 0, "Does not sales the token");
        return salesList[_tokenId];
    }

    // token Counter
    function getCount() public view returns(uint256) {
        return _tokenIds.current();
    }

    // owner history of the token
    function getOwnerHistory(uint256 _tokenId) public view returns(address[] memory) {
        require(_tokenId > 0 && _tokenId <= getCount(), "Does not exists the tokenId");
        return ownerHistory[_tokenId];
    }

    // my token list
    function getMyTokenList(address _account) public view returns(uint256[] memory) {
        return myTokenList[_account];
    }

    // get contract balance
    function getContractBalance() public view returns(uint256) {
        return address(this).balance;
    }
}