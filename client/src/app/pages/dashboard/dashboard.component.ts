import { Component, OnInit } from '@angular/core';
import { LendingContract } from 'app/core/services/contracts/lending/lending-contract.injectable';
import { LendingContractService } from 'app/core/services/contracts/lending/lending-contract.service';
import { ethers } from 'ethers';
import { MetamaskService } from "../../core/services/metamask/metamask.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // --- LOCAL VARIABLES ---
  currentAddress: string;


  constructor(
    private metamaskService: MetamaskService,
    private lendingContractService: LendingContractService,
    private lendingContract: LendingContract
  ) { }

  ngOnInit(): void {
    this.metamaskService.getAccountAddress();
    this.metamaskService.address.subscribe(address => {
      this.currentAddress = address;
    });

  }

  async getData() {
    console.log(this.lendingContract);
    this.lendingContract.userStructs('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266')
      .then((result) => {
        console.log('The result: ', result.totalDeposited.toNumber())
      })
      .catch(err => console.error(err));
  }

}
