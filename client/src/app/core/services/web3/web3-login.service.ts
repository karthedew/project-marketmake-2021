import { InjectionToken, OnInit, Inject, Injectable } from "@angular/core";
import { WEB3 } from "./web3.injectable";

@Injectable({
    providedIn: 'root'
})
export class LoginService implements OnInit {

    // accounts: any;
    publicAddress: any;

    constructor(@Inject(WEB3) private web3: any) {}

    async ngOnInit() {
        // const accounts = await this.web3.eth.getAccounts();
        // this.publicAddress = accounts[0];
        // console.log(this.publicAddress);
    }

    async login(): Promise<boolean> {
        if ('enable' in this.web3.currentProvider) {
            try {
                await this.web3.currentProvider.enable();
                return true
            } catch (e) {
                console.log(e);
                return false
            }
            
        }
    }

    async getWeb3Provider() {
        return this.web3.currentProvider
    }

    async getPublicAddress() {

    }
}
