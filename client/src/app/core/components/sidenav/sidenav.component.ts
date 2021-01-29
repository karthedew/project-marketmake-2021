import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable, Subject } from 'rxjs';
import { map, shareReplay } from "rxjs/operators";
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from "../../services/sidenav/sidenav.service";
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, UrlSegment } from '@angular/router';
// --- FORT AWESOME ---
import { faDesktop, faUser, faHome } from "@fortawesome/free-solid-svg-icons";


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  // --- LOCAL VARIABLES ---
  show: boolean = false;
  private isDashboardSource = new Subject<string>();
  isDashboard = this.isDashboardSource.asObservable();

  // Font Awesome
  faDesktop = faDesktop;
  faUser = faUser;
  faHome = faHome;

  @ViewChild('sidenav') public sideNav: MatSidenav;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );


  constructor(
    private breakpointObserver: BreakpointObserver,
    private activatedRoute: ActivatedRoute,
    private sidenavService: SidenavService

  ) { }

  ngOnInit(): void {
  }

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


}
