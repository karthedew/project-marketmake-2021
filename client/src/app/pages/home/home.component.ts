import { Component, OnInit } from '@angular/core';

import { ethers, providers } from "ethers";
import { EtherWindow } from "../../core/interfaces/window.interface";
import { MetamaskService } from "../../core/services/metamask/metamask.service";
import { Subject , of} from 'rxjs'
import { map, catchError  } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLoggedIn: any;
  loadingError$ = new Subject<boolean>();

  constructor(private metamaskService: MetamaskService) { }

  ngOnInit(): void {
  }

}
