import { Component, Inject, Input, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { MetaMaskProvider } from 'app/core/services/ethers/ethers.injectable';
import { providers } from 'ethers';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MetamaskService } from "../../services/metamask/metamask.service";
import { map, shareReplay } from 'rxjs/operators';
import { logging } from 'protractor';


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
  toggleActive: boolean = false;
  loggedIn: boolean;

  // Font Awesome
  faEllipsisV = faEllipsisV;

  // Event Emitters
  @Output() sidenavToggle = new EventEmitter<Event>();

  // ----------------------------------------------------

  ethereum = (window as any).ethereum;

  @Input() isLoggedIn: boolean;

  providerName: string;

  constructor(
    private metaMaskService: MetamaskService,
    @Inject(MetaMaskProvider) provider: providers.Web3Provider,
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit(): void {

    // --- Observe the Ethereum Provider Changing ---
    this.ethereum.on('chainChanged', (_chainId) => window.location.reload());
    let _isConnected = this.metaMaskService.checkIsConnected();

    console.log(this.ethereum.isConnected())

    this.metaMaskService.checkIsConnected().then((result) => {
      this.isLoggedIn = result;
      console.log('result is: ', result)
    })
    // this.metaMaskService.checkIsConnected().then((result) => {
    //   this.isLoggedIn = result;
    // })

    // --- SUBSCRIBE TO LOGIN ---
    this.metaMaskService.isLoggedIn.subscribe(_loggedIn => {
      this.loggedIn = _loggedIn;

      console.log('IN THE TOOLBAR SUBSCRIBE IS LOGGED IN: ', _loggedIn)
    });

    // --- Get the Provider Name ---
    this.getChainId()

  }

  loginMetaMask() {
    this.metaMaskService.metaMaskLogin();
  }

  public onToggleSidenav(event: Event) {
    this.sidenavToggle.emit(event);
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  // public logout() {
  //   this.authService.logout();
  //   location.reload();
  // }


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
