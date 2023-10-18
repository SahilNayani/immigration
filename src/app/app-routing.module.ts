import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './modules/landing/landing.component';
import { HomeComponent } from './modules/landing/home/home.component';
import { EligibilityComponent } from './modules/landing/eligibility/eligibility.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: LandingComponent,
  //   children: [
  //   ]
  // },
  {
    path: '',
    component: HomeComponent
  },{
    path: 'eligibility',
    component: EligibilityComponent
  },{
    path: 'eligibility/:code',
    component: EligibilityComponent
  },
];

@NgModule({
  // imports: [RouterModule.forRoot(routes, { useHash: true })],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
