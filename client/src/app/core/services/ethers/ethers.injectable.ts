import { ElementSchemaRegistry } from "@angular/compiler";
import { InjectionToken } from "@angular/core";
import { ethers, getDefaultProvider, providers } from "ethers";

import { EtherWindow } from "../../interfaces/window.interface";
// import {  } from "module";

/*

*/

// const CONTRACT_ADDRESS = 
var win: EtherWindow

const RpcProvider = new InjectionToken<providers.JsonRpcProvider>('HardHat Ethereum RPC Provider', {
    providedIn: 'root',
    factory: () => new providers.JsonRpcProvider('http://localhost:8545')
})

const MetaMaskProvider = new InjectionToken<any>('MetaMask Connected', {
    providedIn: 'root',
    factory: () => new ethers.providers.Web3Provider(win.ethereum)
})


// await window.ethereum.enable()
// const provider = new ethers.providers.Web3Provider(window.ethereum);
// const signer = provider.getSigner();
// const RopstenProvider = new InjectionToken<any>('')

// const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545')
/**
 * for MetaMask
 * const provider = new ethers.providers.Web3Provider(window.ethereum);
 * 
 * for connection to main-net
 * const provider = new ethers.providers.getDefaultProvider();
 */

 export { RpcProvider }