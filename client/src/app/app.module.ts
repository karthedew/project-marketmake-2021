import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToolbarComponent } from './core/components/toolbar/toolbar.component';
import { AaveComponent } from './core/pages/aave/aave.component';
import { HomeComponent } from './core/pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    AaveComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
