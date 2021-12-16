// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract BFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("BSCNonFungibleToken", "BFT") {}

    mapping(uint256 => address[]) ownerList;
    mapping(address => uint256[]) tokenList;

    function create(address _from, string memory _uri) public {
        _tokenIds.increment();

        uint256 newId = _tokenIds.current();

        _safeMint(_from, newId);
        _setTokenURI(newId, _uri);

        ownerList[newId].push(msg.sender);
        tokenList[msg.sender].push(newId);
    }

    function sendToken(uint256 _tokenId, address _to, address _from) public {
        safeTransferFrom(_from, _to, _tokenId);
        
        ownerList[_tokenId].push(_to);
        tokenList[_to].push(_tokenId);

        for(uint i = 0; i < tokenList[_from].length; i++) {
            if (tokenList[_from][i] == _tokenId)
                delete tokenList[_from][i];
        }
    }

    function getCount() public view returns(uint256) {
        if (_tokenIds.current() < 1)
            return 0;
        else
            return _tokenIds.current();
    }

    function getOwnerList(uint256 _tokenId) public view returns(address[] memory) {
        return ownerList[_tokenId];
    }

    function getTokenList(address _account) public view returns(uint256[] memory) {
        return tokenList[_account];
    }
}