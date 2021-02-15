
import { Inject, Injectable } from '@angular/core';
import { Contract, ethers, providers } from 'ethers';

// // --- THE CONTRACT DATA ---
import * as PriceConsumerJson from '../../../../contracts/PriceConsumerV3.json'
import { MetaMaskProvider } from '../ethers/ethers.injectable';


/**
 * This is an Angular Injectable class for connecting the client to the 
 * TokenContract through the HardHat RPC localhost network. 
 * 
 *    NOTE: This is just an example and should be the methodology used
 *          for connecting to and interacting with the smart contract.
 */
@Injectable({ providedIn: 'root' })
export class ChainLinkContract extends Contract {

    constructor(
        @Inject(MetaMaskProvider) metaMaskProvider: providers.Web3Provider
    ) {
        // let priceConsumerAddress = "0xCdd5083844Bed450fb7353e5606B85EFc790D03f";
        let priceConsumerAddress = "0xBE8189aaa2166081B76d166649aB1Efb2ca5D4a5";
        let signer = metaMaskProvider.getSigner();
        super(priceConsumerAddress, PriceConsumerJson.abi, signer);
  }
}