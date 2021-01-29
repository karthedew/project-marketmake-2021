import { resolve } from '@angular/compiler-cli/src/ngtsc/file_system';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, catchError  } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MetamaskService {

  ethereum = (window as any).ethereum;

  // --- BEHAVIOR SUBJECTS ---
  private userLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn = this.userLoggedIn.asObservable();

  constructor() {
    this.isLoggedIn.subscribe((res) => {
      console.log('This is the loggin status: ', res)
    })
    
    this.checkIsConnected();

    this.isLoggedIn.subscribe((res) => {
      console.log('This is the loggin status 2: ', res)
    })
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

  public async checkIsConnected(): Promise<boolean> {
    return this.ethereum.isConnected()
  }



}


