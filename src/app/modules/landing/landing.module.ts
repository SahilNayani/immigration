import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EligibilityComponent } from './eligibility/eligibility.component';

const routes: Routes = [
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
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
  ]
})
export class LandingModule { }
