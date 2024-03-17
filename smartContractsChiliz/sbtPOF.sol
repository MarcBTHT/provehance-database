// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract ProofOfFidelity is ERC721, ERC721Enumerable, ERC721URIStorage { 
   
    uint256 private _nextTokenId;

    constructor() ERC721("Proof of Fidelity", "POF") {
        _nextTokenId = 0;
    }
    
    function claimSBT(uint256 fidelityLevel, string memory name, string memory company) public  {
    require(fidelityLevel >= 1 && fidelityLevel <= 3, "You are not a Silver, Gold, or Platinum member.");
    uint256 tokenId = _nextTokenId++;
    string memory nounsURL=string(abi.encodePacked("https://api.cloudnouns.com/v1/pfp?text=",company,"-",name,"&size=200"));

  
    // Token metadata with the SVG image URL included
    string memory tokenURI = string(Base64.encode
    (bytes
    (abi.encodePacked(
        '{"name": "Token #',
        Strings.toString(tokenId),
        '", "description": "A token representing a proof of fidelity.", ',
        '"image": "', nounsURL, '",',
        '"attributes": [{"trait_type": "Fidelity level", "value": "',
        Strings.toString(fidelityLevel),
        '"}]}'
    ))
    ));



    _safeMint(msg.sender, tokenId);
    _setTokenURI(tokenId, tokenURI);
}
    
    //auth c'est celui qui execute le fonction (si == owner du token alors ok)
    function _update(address to, uint256 tokenId, address auth) internal override(ERC721, ERC721Enumerable) returns (address) {
        require(auth == address(0) || to == address(0), "This a Soulbound token. It cannot be transferred. It can only be burned by the token owner.");
        return super._update(to,tokenId,auth); 
    }

    /*DATA ON-CHAIN*/
    function _baseURI() internal pure override returns (string memory) {
        return "data:application/json;base64,";
    }

    // The following functions are overrides required by Solidity.

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
    //Enumerate
    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage, ERC721Enumerable) returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    
}
