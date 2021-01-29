import { Injectable, ViewChild } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { MatSidenav } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  
  // private isDashboard: boolean;
  private sideNav: MatSidenav;

  private dashboardSource = new BehaviorSubject<boolean>(false);
  isDashboard = this.dashboardSource.asObservable();
  

  constructor() { }

  /**
   * setSideNav - Set the sidenav component.
   * 
   * @param sideNav 
   */
  public setSideNav(sidenav: MatSidenav): void {
    this.sideNav = sidenav;
  }

  /**
   * toggle - Sets the sidenav toggle (On/Off)
   */
  public toggle(): void {
    this.sideNav.toggle()
  }

  /**
   * closeSidenav
   */
  public closeSidenav() {
    this.sideNav.toggle(false);
  }

  /**
   * openSidenav
   */
  public openSidenav() {
    this.sideNav.toggle(true);
  }

  /**
   * setIsDashboard
      @param
        dashboard: boolean   */
  public setIsDashboard(dashboard: boolean) {
    this.dashboardSource.next(dashboard);
  }
}
