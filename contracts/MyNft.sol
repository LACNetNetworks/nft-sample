// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/interfaces/IERC4906.sol";
import "./BaseRelayRecipient.sol";
contract MyNft is ERC721, Ownable, BaseRelayRecipient {
    uint256 private _tokenIdCounter;
    event Paused(address owner);
    event Unpaused(address owner);
    error ContractPaused();
    error TokenDoesNotExist(uint256 tokenId);
    constructor(
        address owner_,
        address trustedForwarder_
    )
        Ownable(owner_)
        BaseRelayRecipient(trustedForwarder_)
        ERC721("Mynft", "MYNFT")
    {}
    /// @notice Override necesario para compatibilidad con transacciones relayed en LACChain
    function _msgSender()
        internal
        view
        override(Context, BaseRelayRecipient)
        returns (address)
    {
        return BaseRelayRecipient._msgSender();
    }
    function mint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;
        _safeMint(to, tokenId);
    }
}
