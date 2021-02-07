import { Component, OnInit } from '@angular/core';
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
    private metamaskService: MetamaskService
  ) { }

  ngOnInit(): void {
    this.metamaskService.getAccountAddress();
    this.metamaskService.address.subscribe(address => {
      this.currentAddress = address;
    });

    // this.ethereum.selectedAddress.then(address => console.log('SELECTED-ADDRESS is: ', address))


    console.log((window as any).ethereum.selectedAddress())

  }

}
