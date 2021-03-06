import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// ANGULAR MATERIAL IMPORTS 
import { MaterialModule } from "./modules/material.module";
import { ClipboardModule } from '@angular/cdk/clipboard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToolbarComponent } from './core/components/toolbar/toolbar.component';
import { AaveComponent } from './pages/aave/aave.component';
import { HomeComponent } from './pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidenavComponent } from './core/components/sidenav/sidenav.component';
import { LendingComponent } from './pages/lending/lending.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    AaveComponent,
    HomeComponent,
    SidenavComponent,
    LendingComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FontAwesomeModule,
    ClipboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
