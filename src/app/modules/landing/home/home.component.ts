import { Component, OnInit } from '@angular/core';
import * as Aos from 'aos';

declare let $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  starValue: any = 4;
  bannerSlide: any = [
    {
      id: '1001',
      subTitle: "",
      title: "Welcome to",
      colorTitle: 'Global Gateway Immigration',
      description: "Are you dreaming of a new life in a foreign land? At Global Gateway Immigration, we specialize in making those dreams a reality. With our expert guidance and comprehensive immigration services, we’re here to help you navigate the complex world of immigration.",
      btnUrl: "/eligibility",
      image: '/assets/images/hero/welcome.webp'
    },{
      id: '1002',
      subTitle: "Jan'24 Intake is opening soon!",
      title: "Pursue your advanced degree  and earn your Master's degree in",
      colorTitle: 'the United Kingdom.',
      description: "Book a free counselling session & find out universities where you can get an admit.",
      btnUrl: "/eligibility/UK",
      image: '/assets/images/hero/uk.webp'
    },{
      id: '1003',
      subTitle: "Jan'24 Intake is opening soon!",
      title: "Pursue your advanced degree  and earn your Master's degree in",
      colorTitle: 'the Canada.',
      description: "Book a free counselling session & find out universities where you can get an admit.",
      btnUrl: "/eligibility/CA",
      image: '/assets/images/hero/canada.webp'
    },{
      id: '1003',
      subTitle: "Jan'24 Intake is opening soon!",
      title: "Pursue your advanced degree  and earn your Master's degree in",
      colorTitle: 'the United States of America.',
      description: "Book a free counselling session & find out universities where you can get an admit.",
      btnUrl: "/eligibility/US",
      image: '/assets/images/hero/usa.webp'
    },
  ];
  universities: any = [
    {
      id: '1001',
      universityLogo: '/assets/images/university/logo/bpp.webp',
      name: 'BPP University',
      image: '/assets/images/university/bpp.webp',
      status: 'Admission Open',
      fees: '(₹) - ₹17 Lakhs',
      applicationDeadline: '15th September',
    },{
      id: '1002',
      universityLogo: '/assets/images/university/logo/coventry.webp',
      name: 'Coventry University',
      image: '/assets/images/university/coventry.webp',
      status: 'Admission Open',
      fees: '(₹) - ₹16 Lakhs',
      applicationDeadline: '15th Sepember',
    },{
      id: '1003',
      universityLogo: '/assets/images/university/logo/bpp.webp',
      name: 'University of East London',
      image: '/assets/images/university/bpp.webp',
      status: 'Admission Open',
      fees: '(₹) - ₹13 Lakhs',
      applicationDeadline: '15th Sepember',
    },{
      id: '1004',
      universityLogo: '/assets/images/university/logo/teesside.webp',
      name: 'Teesside University',
      image: '/assets/images/university/teesside.webp',
      status: 'Admission Open',
      fees: '(₹) - ₹18 Lakhs',
      applicationDeadline: '15th Sepember',
    },{
      id: '1005',
      universityLogo: '/assets/images/university/logo/manchester.webp',
      name: 'University of Manchester',
      image: '/assets/images/university/manchester.webp',
      status: 'Admission Open',
      fees: '(₹) - ₹16 Lakhs',
      applicationDeadline: '15th Sepember',
    },{
      id: '1006',
      universityLogo: '/assets/images/university/logo/manchester.webp',
      name: 'BPP University',
      image: '/assets/images/university/manchester.webp',
      status: 'Admission Open',
      fees: '(₹) - ₹17 Lakhs',
      applicationDeadline: '15th Sepember',
    },
  ];
  slideConfig = {"slidesToShow": 1, "slidesToScroll": 1, "dots": true, "autoplay": true, "autoplaySpeed": 2000};
  
  ngOnInit() {
    // Aos.init({disable: 'mobile'});//AOS - 2
    Aos.init({duration: 1200,});//AOS - 2
    Aos.refresh();
  }

  toggleClass(IdName: any, className: any){
    var element = document.querySelector(IdName);
    element.classList.toggle(className);
  }
  addClass(IdName: any, className: any){
    var element = document.querySelector(IdName);
    element.classList.add(className);
  }
  removeClass(IdName: any, className: any){
    var element = document.querySelector(IdName);
    element.classList.remove(className);
  }
  
  // On Click to scroll
  scrollToElement($element: any): void {
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }
}
