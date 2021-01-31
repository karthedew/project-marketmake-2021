import { Component, Inject, Input, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { MetaMaskProvider } from 'app/core/services/ethers/ethers.injectable';
import { providers } from 'ethers';
import { BehaviorSubject, Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MetamaskService } from "../../services/metamask/metamask.service";
import { map, shareReplay } from 'rxjs/operators';
import { logging } from 'protractor';
import { connected } from 'process';


interface ConnectInfo {
  chainId: string;
}


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  // --- LOCAL VARIABLES ---
  ethereum = (window as any).ethereum;
  toggleActive: boolean = false;
  loggedIn: boolean = false;
  providerName: string;


  currentAddress: string;
  addressEmitter$ = new BehaviorSubject<string>('');

  // Font Awesome
  faEllipsisV = faEllipsisV;

  // Event Emitters
  @Input() isLoggedIn: boolean;
  @Output() sidenavToggle = new EventEmitter<Event>();

  // --- CLASS OBSERVABLES ---
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  
  // isLoggedIn$: Observable<boolean> = this.metaMaskService

  constructor(
    private metaMaskService: MetamaskService,
    @Inject(MetaMaskProvider) provider: providers.Web3Provider,
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit(): void {

    // --- GET ACCOUNTS ---
    this.ethereum.request({method: 'eth_requestAccounts'})
      .then(accounts => {
        this.loggedIn = true
        this.changeAddress(accounts[0]);
      })
      .catch(err => {
        this.loggedIn = false
      })

    // --- Observe the Ethereum Provider Changing ---
    this.ethereum.on('chainChanged', (_chainId) => window.location.reload());

    this.ethereum.on('accountsChanged', (accounts) => {
      window.location.reload()
    })
    
    // --- Get the Provider Name ---
    this.getChainId()
  }



  // =======================================================

  loginMetaMask() {
    this.metaMaskService.metaMaskLogin();
    if (this.ethereum.isConnected()) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false
    }
  }

  changeAddress(address: string) {
    this.currentAddress = address
    this.addressEmitter$.next(address);
  }

  public onToggleSidenav(event: Event) {
    this.sidenavToggle.emit(event);
  }

  public copyAddress() {
    alert('Copied to Clipboard')
  }


  private getChainId() {
    this.ethereum.request({ method: 'eth_chainId' })
      .then(chainId => {
        let name = this.getProviderName(chainId);
        this.providerName = name;
      })
      .catch(err => console.error('You could not get the chainID', err))
  }

  private getProviderName(chainId: string): string {

    if (chainId == '0x1') {
      return 'Ethereum'
    }

    if (chainId == '0x3') {
      return 'Ropsten'
    }

    if (chainId == '0x4') {
      return 'Rinkeby'
    }

    if (chainId == '0x5') {
      return 'Goerli'
    }

    if (chainId == '0x2a') {
      return 'Kovan'
    }

    else {
      return 'unknown'
    }

  }

}
