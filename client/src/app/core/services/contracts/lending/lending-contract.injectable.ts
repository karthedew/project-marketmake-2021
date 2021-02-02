
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
        @Inject(RpcProvider) rpcProvider: providers.JsonRpcProvider
    ) {
        let lendingAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
        let signer = rpcProvider.getSigner()
        super(lendingAddress, ContractJson.abi, signer);
    }
}


// @Injectable({ providedIn: 'root' })
// export class LendingContract extends Contract {

//     constructor(
//         @Inject(MetaMaskProvider) rpcProvider: providers.Web3Provider
//     ) {
//         let lendingAddress = "0xBE8189aaa2166081B76d166649aB1Efb2ca5D4a5";
//         let signer = rpcProvider.getSigner()
//         super(lendingAddress, ContractJson.abi, signer);
//     }
// }