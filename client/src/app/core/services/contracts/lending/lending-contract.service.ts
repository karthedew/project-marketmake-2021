import { Injectable, Inject } from '@angular/core';
import { ethers, providers, Transaction } from 'ethers';
import { LendingContract } from './lending-contract.injectable';

@Injectable({
  providedIn: 'root'
})
export class LendingContractService {

  constructor(
    private lendingContract: LendingContract
  ) {
    let account = this.getAccount();

    // --- Watch Events on Contract ---
    this.lendingContract.on("Deposit", (_totalDeposit, _interest) => {
      console.log('You made it!')
      console.log('Total Deposited: ', _totalDeposit)
      console.log('Total Interest: ', _interest)
    })
  }

  async getAccount() {
    // --- GET ACCOUNTS ---
    let accounts = await (window as any).ethereum.request({method: 'eth_requestAccounts'})
    return accounts[0]
  }

  async deposit(percent: string, amount: string) {
    this.lendingContract.deposit(percent, {
      value: ethers.utils.parseEther(amount),
      gasLimit: ethers.utils.parseEther('0.0000000000095')
    }).catch(err => console.error(err))
  }


  async getContractData() {
    console.log("THis is the User Struct: ", this.lendingContract);

    console.log('This is the address: ', this.lendingContract.address);

    let address = this.getAccount();

    this.lendingContract.getuser(address)
      .then(result => console.log('The getUser is: ', result))
      .catch(err => console.log(err))

    // this.lendingContract.balanceOf('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266')
    //   .then(result => console.log("The balance of is: ", result))
    //   .catch(err => console.log(err))

    // this.lendingContract.lastATokenBalance.then(result => {
    //   console.log('This is the user struct: ', result)
    // })
  }
}
