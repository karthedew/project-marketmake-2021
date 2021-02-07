
import { Inject, Injectable } from '@angular/core';
import { Contract, ethers, providers } from 'ethers';

// // --- THE CONTRACT DATA ---
import * as ContractJson from '../../../../../contracts/Lend.json';
import { WebSocketProvider } from '../../ethers/ethers.injectable';


/**
 * This is an Angular Injectable class for connecting the client to the 
 * lending Contract through the HardHat RPC localhost network. 
 * 
 */
@Injectable({ providedIn: 'root' })
export class LendingWebSocketContract extends Contract {

    constructor(
        @Inject(WebSocketProvider) socketProvider: providers.WebSocketProvider
    ) {
        // --- Contract Address ---
        let lendingAddress = "0xF55BbBb34484D17aC730d91B97D97CACC42F4C9b";

        // --- METAMASK Signer ---
        let signer = socketProvider.getSigner()

        // --- Ethers Contract Class Intialized Parameters ---
        super(lendingAddress, ContractJson.abi, signer);
    }
}