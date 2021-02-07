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
  }

  async getAccount() {
    // --- GET ACCOUNTS ---
    let accounts = await (window as any).ethereum.request({method: 'eth_requestAccounts'})
    return accounts[0]
  }

  async deposit(percent: string, amount: string) {

    // this.lendingContract.signer.getAddress().then(address => {
    // })
    // this.lendingContract.signer.getGasPrice().then(gas => {
    // })
    let tx = {
      value: ethers.utils.parseEther(amount)
    }

    // this.lendingContract.estimateGas.deposit(percent, {
    //   value: ethers.utils.parseEther(amount)
    // })

    console.log('This is the Lending Contract on Kovan: ', this.lendingContract.address)
    this.lendingContract.signer.getGasPrice()
      .then(gas => console.log('The gas price: ', gas))

    let Gwei_price = '0.000000229';
    let Gwei_limit = '0.00000000000071';
    
    let transaction = this.lendingContract.deposit(percent, {
      value: ethers.utils.parseEther(amount),
      gasPrice: ethers.utils.parseEther(Gwei_price),
      gasLimit: ethers.utils.parseEther(Gwei_limit)
    })

    // transaction.then(rest => {
    //   console.log(rest)
    // })
    // .catch(err => console.error(err))

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
