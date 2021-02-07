
import { Inject, Injectable } from '@angular/core';
import { Contract, ethers, providers } from 'ethers';

// // --- THE CONTRACT DATA ---
import * as ContractJson from '../../../../../contracts/Lend.sol/Lend.json';
import { MetaMaskProvider, RpcProvider } from '../../ethers/ethers.injectable';


/**
 * This is an Angular Injectable class for connecting the client to the 
 * lending Contract through the HardHat RPC localhost network. 
 * 
 */
@Injectable({ providedIn: 'root' })
export class LendingContract extends Contract {

    constructor(
        @Inject(MetaMaskProvider) rpcProvider: providers.Web3Provider
    ) {
        // --- Contract Address ---
        // let lendingAddress = "0x158B2A3BC34305E39779883B0dfF4D950dB67C10";
        let lendingAddress = "0xE0D1FFe386216B5ab4798baDfbaa6614FfF9541D";

        // --- METAMASK Signer ---
        let signer = rpcProvider.getSigner()

        // --- Ethers Contract Class Intialized Parameters ---
        super(lendingAddress, ContractJson.abi, signer);
    }
}

// @Injectable({ providedIn: 'root' })
// export class LendingContract extends Contract {

//     constructor(
//         @Inject(RpcProvider) rpcProvider: providers.JsonRpcProvider
//     ) {
//         let lendingAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
//         let signer = rpcProvider.getSigner()
//         super(lendingAddress, ContractJson.abi, signer);
//     }
// }