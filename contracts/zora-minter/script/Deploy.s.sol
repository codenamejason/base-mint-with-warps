// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.23;

import {ZoraMinter} from "../src/ZoraMinter.sol";
import {Script, console} from "forge-std/Script.sol";

import {FrameNFTFactory} from "../src/FrameNFTFactory.sol";

contract Deploy is Script {
    address internal referrer = address(0x86924c37A93734E8611Eb081238928a9d18a63c0);
    address internal signer = address(0x44DD9B89d4087246A0Fc54dba0c69000a4F59162);
    address internal collection = address(0xF5a3b6DEE033AE5025E4332695931CaDeB7f4D2B);
    address internal minter = address(0xFF8B0f870ff56870Dc5aBd6cB3E6E89c8ba2e062);

    function run() external {
        address owner = msg.sender;
        uint256 deployerPrivateKey = vm.envUint("DEPLOYER_PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);

        new ZoraMinter{salt: unicode"🐎"}(owner, referrer, signer, collection, minter);

        new FrameNFTFactory{salt: unicode"🐎"}();

        vm.stopBroadcast();
    }
}
