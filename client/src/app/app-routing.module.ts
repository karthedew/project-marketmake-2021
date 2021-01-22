import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AaveComponent } from './core/pages/aave/aave.component';
import { HomeComponent } from './core/pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      title: 'Home Component'
    }
  },
  {
    path: 'aave',
    component: AaveComponent,
    data: {
      title: 'Aave Component'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
