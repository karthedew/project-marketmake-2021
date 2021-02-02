import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AaveComponent } from './pages/aave/aave.component';
import { HomeComponent } from './pages/home/home.component';
import { LendingComponent } from './pages/lending/lending.component';

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
  },
  {
    path: 'lending',
    component: LendingComponent,
    data: {
      title: 'Lending Component'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
