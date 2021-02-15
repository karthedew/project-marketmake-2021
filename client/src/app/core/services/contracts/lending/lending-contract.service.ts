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

    let Gwei_price = '0.000000229';
    let Gwei_limit = '0.00000000000071';
    
    let transaction = this.lendingContract.deposit(percent, {
      value: ethers.utils.parseEther(amount),
      gasPrice: ethers.utils.parseEther(Gwei_price),
      gasLimit: ethers.utils.parseEther(Gwei_limit)
    })
    
    return transaction
  }
  
}
