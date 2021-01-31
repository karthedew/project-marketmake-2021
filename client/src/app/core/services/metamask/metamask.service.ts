import { resolve } from '@angular/compiler-cli/src/ngtsc/file_system';
import { Inject, Injectable, OnInit } from '@angular/core';
import { rejects } from 'assert';
import { Resolver } from 'dns';
import { providers } from 'ethers';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, catchError  } from 'rxjs/operators';
import { MetaMaskProvider } from '../ethers/ethers.injectable';

@Injectable({
  providedIn: 'root'
})
export class MetamaskService {

  ethereum = (window as any).ethereum;

  // --- BEHAVIOR SUBJECTS ---
  private userLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn = this.userLoggedIn.asObservable();

  // --- OBSERVABLES ---
  constructor() { }

  public checkLoggedIn() {
    // if( (window as any).ethereum.isConnected() ) {
      
    // }
    this.updateLoggedIn(true)
  }

  public metaMaskLogin() {
    (window as any).ethereum.request({ method: 'eth_requestAccounts' })
      .then(result => {
        this.updateLoggedIn(true);
      })
      .catch(err => {
        this.updateLoggedIn(false);
        alert('Please login with MetaMask to use this application')
      })
    
  }

  /**
     * updateLoggedIn
     */
  public updateLoggedIn(loggedin: boolean) {
    this.userLoggedIn.next(loggedin);
  }
  
}


