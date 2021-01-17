import { Component } from '@angular/core';
import { ethers, providers } from "ethers";
import { TokenContract } from "./core/services/contracts/tokenContract.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';

  contractName: string;

  constructor(private contract: TokenContract) {

    /**
     * This is an example of:
     *   [1] calling a function from the smart contract using an Angular Injectable token and,
     *   [2] Making the smart contract accessible through an Angular class.
     */
    this.contractName = this.contract.name();

    // See method below for description.
    this.getContractName();
  }


  /**
  * getContractName: void
  * 
  *   This method is just and example of the quick and easy way to connect
  *   the Angular frontend to the hardhat localhost.
  */
  async getContractName() {

    // --- Local Imports ---
    var contract = require('../contracts/Token.json')
    var contract_address = require('../contracts/contract-address.json')

    // --- Set the Ethers.js Provider ---
    const provider = new providers.JsonRpcProvider('http://localhost:8545');

    // --- Create a new Ethere.js Contract ---
    let cn = new ethers.Contract(contract_address.Token, contract.abi, provider);

    // --- Call the name() method from the Smart Contract ---
    let contract_name = await cn.name();

    this.contractName = contract_name;

  }

}
