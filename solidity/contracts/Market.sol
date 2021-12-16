// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./BscNFT.sol";

contract Market {
    address private BFTaddress; // BscNFT address

    constructor(address _BFTaddress) {
        BFTaddress = _BFTaddress; // BscNFT address
        setApproveAddress(address(this)); // set the Market address to approve
    }

    // set the Market address to approve
    function setApproveAddress(address _Marketaddress) private {
        BscNFT _BFT = BscNFT(BFTaddress);
        _BFT.setApproveAddress(_Marketaddress);
    }

    // buy the token
    function buyToken(uint256 _tokenId) public payable {
        BscNFT _BFT = BscNFT(BFTaddress);
        address seller = _BFT.ownerOf(_tokenId);
        uint256 price = _BFT.getTokenPrice(_tokenId);

        require(_tokenId > 0 && _tokenId <= _BFT.getCount(), "Does not exists the tokenId");
        require(msg.sender != seller, "You are Seller, Seller cannot puchase");
        require(price > 0, "Does not sales the token");
        require(msg.value == price, "Incorrected amount");
        
        // edit myTokenList and ownerhistory
        _BFT.editList(_tokenId, msg.sender);

        // payment od price
        // payable(seller).call{value: msg.value}(""); // return type is bool
        payable(seller).transfer(msg.value);

        // transfer the token from seller to buyer
        _BFT.sendToken(_tokenId, msg.sender);
    }

    // get contract balance
    function getMarketBalance() public view returns(uint256) {
        return address(this).balance;
    }
}