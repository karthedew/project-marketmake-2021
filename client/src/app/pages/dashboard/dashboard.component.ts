import { Component, OnInit } from '@angular/core';
import { LendingContract } from 'app/core/services/contracts/lending/lending-contract.injectable';
import { MetamaskService } from "../../core/services/metamask/metamask.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // --- LOCAL VARIABLES ---
  currentAddress: string;

  totalDeposited: string;
  aTokenBalance: string;
  givePercent: string;
  savedInterest: string;


  constructor(
    private metamaskService: MetamaskService,
    private lendingContract: LendingContract
  ) { }

  ngOnInit(): void {
    this.metamaskService.getAccountAddress();
    this.metamaskService.address.subscribe(address => {
      this.currentAddress = address;
    });

    this.lendingContract.userStructs('0x57F645660bCf2EE76AC570dEe6772758B410c10F')
      .then(({totalDeposited, aTokenBalance, givePercent, savedInterest}) => {
        console.log('The callback result: ', aTokenBalance.toString())
        this.totalDeposited = totalDeposited.toString();
        this.aTokenBalance = aTokenBalance.toString();
        this.givePercent = givePercent.toString();
        this.savedInterest = savedInterest.toString();
      })
  }

}
