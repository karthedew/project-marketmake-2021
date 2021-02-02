import { Injectable, Inject } from '@angular/core';
import { ethers, providers } from 'ethers';
import { LendingContract } from './lending-contract.injectable';
import { U256, UInt256 } from "uint256";

@Injectable({
  providedIn: 'root'
})
export class LendingContractService {

  constructor(
    private lendingContract: LendingContract
  ) {
    let account = this.getAccount();
  }

  async getAccount() {
    // --- GET ACCOUNTS ---
    let accounts = await (window as any).ethereum.request({method: 'eth_requestAccounts'})
    return accounts[0]
  }

  async deposit() {

    this.lendingContract.signer.getAddress().then(address => {
    })
    this.lendingContract.signer.getGasPrice().then(gas => {
    })


    // this.lendingContract.sendTransaction({})

    // console.log('Depositing money...')
    // this.lendingContract.deposit(50, {value: ethers.utils.parseEther("0.5")});
    // console.log(this.lendingContract)
    // let account = await this.lendingContract.signer.getAddress();
    // console.log('Getting the balance of the account contributor...', account)
    // let tx = await this.lendingContract.balanceOf(account)
    // console.log('The transaction from the deposit: ', tx.hash);

    return 'success'
  }
}
