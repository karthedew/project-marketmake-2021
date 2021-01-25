import { Component, OnInit } from '@angular/core';

import { ethers, providers } from "ethers";
import { EtherWindow } from "../../core/interfaces/window.interface";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    // let window: EtherWindow;
    // window.ethereum.enable();
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const signer = provider.getSigner();
    // console.log("The provider: ", provider);
    // console.log('The signer: ', signer);

    // console.log('The window: ', window)

    // if (typeof web3 !== 'undefined') {
    //   var web3Provider = new ethers.providers.Web3Provider(web3.currentProvider, ethers.providers.networks.ropsten);
    //   web3Provider.getBalance("..some address.."). then(function(balance) {
    //     var etherString = ethers.utils.formatEther(balance);
    //     console.log("Balance: " + etherString);
    //   });
    // }
  }

}
