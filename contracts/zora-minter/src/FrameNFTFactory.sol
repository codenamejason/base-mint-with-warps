// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import {FrameNFT} from "./FrameNFT.sol";

/// @title SyndicateFrameNFTFactory
/// @notice Factory contract for creating Syndicate Frame NFT Contracts
/// @author @codenamejason <jaxcoder75@gmail.com>
contract FrameNFTFactory {
    event FrameNFTDeployed(address indexed nftContract, string name, string symbol);

    constructor() {}

    /// @notice Create a new SyndicateFrameNFT contract
    /// @param _name Name of the NFT contract
    /// @param _symbol Symbol of the NFT contract
    function createSyndicateFrameNFT(string memory _name, string memory _symbol) external {
        FrameNFT nft = new FrameNFT(_name, _symbol);

        emit FrameNFTDeployed(address(nft), _name, _symbol);
    }
}
