import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Contract, ethers, providers } from "ethers";
import { TokenContract } from "./core/services/contracts/tokenContract.service";
import { MetaMaskProvider } from './core/services/ethers/ethers.injectable';
import { LoginService } from "./core/services/web3/web3-login.service";
import { ChainLinkContract } from "./core/services/contracts/chainlinkContract.service";
import { SidenavService } from "./core/services/sidenav/sidenav.service";

import * as PriceConsumerJson from '../contracts/PriceConsumerV3.json';
import { SidenavComponent } from './core/components/sidenav/sidenav.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  // --- CLASS VARIABLES ---
  title = 'frontend';
  isLoggedIn: boolean = false;
  toggleActive: boolean = false;
  toggleToolbar: boolean = false;

  contractName: string;

  @ViewChild(SidenavComponent) public sidenavComponent: SidenavComponent

  constructor(
    private contract: TokenContract,
    private chainLinkContract: ChainLinkContract,
    private loginService: LoginService,
    private sideNavService: SidenavService,
    @Inject(MetaMaskProvider) metaMaskProvider: providers.Web3Provider
  ) { }

  ngOnInit(): void {
    
  }

  clickMenu() {
    this.toggleActive = !this.toggleActive;
    this.sideNavService.toggle();
  }

  childEventClicked($event: Event) {
    this.toggleActive = !this.toggleActive;
    this.sideNavService.toggle();
  }

}
