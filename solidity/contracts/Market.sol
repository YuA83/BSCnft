// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./BFT.sol";

contract Market {
    address private BFTaddress; // BFT address

    constructor(address _BFTaddress) {
        BFTaddress = _BFTaddress; // BFT address
        setApproveAddress(address(this)); // Market address
    }

    function setApproveAddress(address _Marketaddress) private {
        BFT _BFT = BFT(BFTaddress);
        _BFT.setApproveAddress(_Marketaddress);
    }
    
    // 토큰 구메
    function buyToken(uint256 _tokenId) public payable {
        BFT _BFT = BFT(BFTaddress);
        address seller = _BFT.ownerOf(_tokenId);
        uint256 price = _BFT.getTokenPrice(_tokenId);

        require(_tokenId > 0 && _tokenId <= _BFT.getCount(), "Does not exists the tokenId");
        require(msg.sender != seller, "You are Seller, Seller cannot puchase");
        require(price > 0, "Does not sales the token");
        require(msg.value == price, "Incorrected amount");
        
        // myTokenList, ownerhistory 수정
        _BFT.editList(_tokenId, msg.sender);

        // 금액 지불
        payable(seller).call{value: msg.value}(""); // return bool

        // 토큰 전송(소유권 이전)
        _BFT.sendToken(_tokenId, msg.sender);
    }

    // get contract balance
    function getContractBalance() public view returns(uint256) {
        return address(this).balance;
    }
}