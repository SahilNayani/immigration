import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './modules/landing/home/home.component';
import { CarouselModule } from 'primeng/carousel';
import { RatingModule } from 'primeng/rating';
import { EligibilityComponent } from './modules/landing/eligibility/eligibility.component';
import { LandingComponent } from './modules/landing/landing.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ButtonModule } from 'primeng/button';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { GlobalFunctions } from './modules/common/global-functions';
import { ToastrModule, provideToastr } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EligibilityComponent,
    LandingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    CarouselModule,
    RatingModule,
    DropdownModule,
    BrowserAnimationsModule,
    RadioButtonModule,
    SelectButtonModule,
    ButtonModule,
    SlickCarouselModule,
    ToastrModule.forRoot(), 
  ],
  providers: [
    provideAnimations(),
    provideToastr(),
    GlobalFunctions,
    { provide: LocationStrategy, useClass: HashLocationStrategy, },
    { provide: Window, useValue: window },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
