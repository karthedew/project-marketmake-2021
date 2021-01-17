import { Inject, Injectable } from "@angular/core";
import { Signer, utils, providers, Wallet } from "ethers";
import { RpcProvider } from "./ethers.injectable";

@Injectable({
    providedIn: 'root'
})
export class AppSigner extends Signer {

    private wallet: Wallet;

    private wallet_key: string = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';

    constructor(
        @Inject(RpcProvider) public rpcProvider: providers.JsonRpcProvider
    ) {
        super();
        this.connect()
    }

    // async login(password: string) {
    //     const wallet = await Wallet.fromEncryptedJson(localStorage.get('wallet'), password);
    //     this.wallet = wallet.connect(this.rpcProvider);
    // }

    connect() {
        const wallet = Wallet.fromEncryptedJsonSync(this.wallet_key, '')
        return this.wallet.connect(this.rpcProvider)
        // let wallet = new Wallet(this.wallet_key);
        // return 
    }

    public async getAddress(): Promise<string> {
        console.log('The wallet is: ')
        console.log(this.wallet)
        return this.wallet.getAddress()
    }

    public async signMessage(message: string): Promise<string> {
        return this.wallet.signMessage(message)
    }

    public async sendTransaction(transaction: providers.TransactionRequest): Promise<providers.TransactionResponse> {
        return this.wallet.sendTransaction(transaction);
    }

    public async signTransaction(transaction: providers.TransactionRequest): Promise<string> {
        return this.wallet.signTransaction(transaction)
    }
}