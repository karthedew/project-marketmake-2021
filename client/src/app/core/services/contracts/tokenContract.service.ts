
import { Inject, Injectable } from '@angular/core';
import { Contract, ethers, providers } from 'ethers';
import { AppSigner } from "../ethers/appsigner.service";

// // --- THE CONTRACT DATA ---
import * as ContractAddress from '../../../../contracts/contract-address.json';
import * as ContractJson from '../../../../contracts/Token.json';
import { RpcProvider } from '../ethers/ethers.injectable';


/**
 * This is an Angular Injectable class for connecting the client to the 
 * TokenContract through the HardHat RPC localhost network. 
 * 
 *    NOTE: This is just an example and should be the methodology used
 *          for connecting to and interacting with the smart contract.
 */
@Injectable({ providedIn: 'root' })
export class TokenContract extends Contract {

  constructor(
    @Inject(RpcProvider) rpcProvider: providers.JsonRpcProvider
  ) {
    let signer = rpcProvider.getSigner()
    super(ContractAddress.Token, ContractJson.abi, signer);
  }
}