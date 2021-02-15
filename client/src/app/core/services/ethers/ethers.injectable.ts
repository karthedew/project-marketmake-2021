import { ElementSchemaRegistry } from "@angular/compiler";
import { InjectionToken } from "@angular/core";
import { ethers, getDefaultProvider, providers } from "ethers";
import Web3 from "web3";

/**
 * This connects to the Localhost Provider
 */
const RpcProvider = new InjectionToken<providers.JsonRpcProvider>('HardHat Ethereum RPC Provider', {
    providedIn: 'root',
    factory: () => new providers.JsonRpcProvider('http://localhost:8545')
})


/**
 * This connects to the Localhost Provider
 */
const WebSocketProvider = new InjectionToken<providers.WebSocketProvider>('HardHat Ethereum RPC Provider', {
    providedIn: 'root',
    factory: () => new providers.WebSocketProvider('wss://kovan.infura.io/ws/v3/4133d31370e042c1883b30ef86dfd251')
})

/**
 * This connects to the current MetaMask provider
 */
const MetaMaskProvider = new InjectionToken<providers.Web3Provider>('MetaMask Connected', {
    providedIn: 'root',
    factory: () => {
        const ethersProvider = new ethers.providers.Web3Provider((window as any).ethereum);
        return ethersProvider
    }
})


/**
 * This connects to the current window provider with Web3.js.
 */
const WEB3 = new InjectionToken<Web3>('web3', {
    providedIn: 'root',
    factory: () => {
        try {
            const provider = ('ethereum' in window) ? window['ethereum'] : Web3.givenProvider;
            return new Web3(provider);
        } catch (err) {
            throw new Error('Non-Ethereum browser detected. You should consider trying Mist or MetaMask!');
        }
    }
});

 export { MetaMaskProvider, WEB3, RpcProvider, WebSocketProvider }