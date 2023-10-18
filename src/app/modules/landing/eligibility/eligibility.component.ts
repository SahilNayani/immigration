import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as Aos from 'aos';
import * as moment from 'moment';

@Component({
  selector: 'app-eligibility',
  templateUrl: './eligibility.component.html',
  styleUrls: ['./eligibility.component.scss']
})
export class EligibilityComponent implements OnInit {

  countryCodeFromURL: any = '';
  eligibilityForm: any;
  eligibilityNgModel: any = {};
  countries: any;
  selectedCountry: any;

  getOtpPop: boolean = false;

  preferredIntake: any = null;
  intakePeriodArr: any = [];
  graduationYearArr: any = [];
  hideShowFlags: any = {
    purpose: false
  };

  preferredVisitArr: any = [
    { name: 'Work Permit', key: 'work_permit' },
    { name: 'Study', key: 'study' },
    { name: 'Tour', key: 'tour' },
    { name: 'Visit', key: 'visit' }
  ];
  pursuingArr: any = [
    { name: 'PG Diploma', key: 'pg_diploma' },
    { name: "Master's", key: 'masters' },
    { name: "Bachelor's", key: 'bachelors' },
    { name: 'MBA', key: 'mba' },
    { name: 'PHD', key: 'phd' },
    { name: 'Not decided', key: 'not_decided' }
  ];
  educationLevelArr: any = [
    { name: "10th Standard", value: "10th_standard" },
    { name: "12th Standard", value: "12th_standard" },
    { name: "Bachelor's Degree", value: "bachelors_degree" },
    { name: "Master's Degree", value: "masters_degree" },
    { name: "MBBS / MD", value: "mbbs_md" },
  ];
  passportStatusArr: any = [
    { name: "Yes", value: "yes" },
    { name: "Applied", value: "applied" },
    { name: "No", value: "no" },
    { name: "Need Assistance", value: "need_assistance" },
  ];

  get preferredCountryCtrl() {
    return this.eligibilityForm.get('preferredCountry');
  }

  get purposeVisitCtrl() {
    return this.eligibilityForm.get('purposeVisit');
  }

  constructor(
    private _formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
  ) { }


  ngOnInit() {
    // Aos.init({disable: 'mobile'});//AOS - 2
    Aos.init({duration: 1200,});//AOS - 2
    Aos.refresh();

    this._prepareEligibilityForm();
    this.countries = [
      { name: 'Canada', code: 'CA' },
      // { name: 'UK', code: 'UK' },
      { name: 'USA', code: 'US' },
      // { name: 'New Zealand', code: 'NZ' },
      // { name: 'Australia', code: 'AU' },
      // { name: 'Germany', code: 'DE' },
      { name: 'Others', code: '' }
    ];
    
    this.activatedRoute.params.subscribe(s => {
      if (s && s['code'] && s['code'] != '') {
        this.countryCodeFromURL = s["code"];
      }
    });
    if (this.countryCodeFromURL && this.countryCodeFromURL != '') {
      this.countries.forEach((country: any) => {
        if (country.code == this.countryCodeFromURL) {
          this.eligibilityForm.get('preferredCountry').setValue(country);
        }
      });
    }

    let newDate = moment().add(1, 'months');
    for (let i = 0; i < 3; i++) {
      if (i != 0) {
        newDate = newDate.add(4, 'months');
      }
      this.intakePeriodArr.push({
        value: newDate.format('MMM_YYYY').toLowerCase(),
        name: newDate.format('MMM YYYY')
      });
    }
    let newYear = moment().add(0, 'years');
    for (let i = 0; i < 15; i++) {
      if (i != 0) {
        newYear = newYear.add(-1, 'years');
      }
      this.graduationYearArr.push({
        value: newYear.format('YYYY').toLowerCase(),
        name: newYear.format('YYYY')
      });
    }
  }

  resetForm() {
    this.eligibilityForm.reset();
  }

  validateEductionForm() {
    const highestLevelEducation = this.eligibilityForm.get('highestLevelEducation').valid;
    const grades = this.eligibilityForm.get('grades').valid;
    const highestEducationPassoutYear = this.eligibilityForm.get('highestEducationPassoutYear').valid;
    const passportStatus = this.eligibilityForm.get('passportStatus').valid;
    const englishTest = this.eligibilityForm.get('englishTest').valid;
    const englishTestGrades = this.eligibilityForm.get('englishTestGrades').valid;
    const admitStatus = this.eligibilityForm.get('admitStatus').valid;
    return (this.purposeVisitCtrl.value == 'work_permit' || this.purposeVisitCtrl.value == 'study') ?
     (highestLevelEducation && grades && highestEducationPassoutYear && passportStatus && englishTest && englishTestGrades && admitStatus) : (this.purposeVisitCtrl.value);
  }

  onEducationSelectionChange(): void {
    if (this.purposeVisitCtrl.value == 'tour' || this.purposeVisitCtrl.value == 'visit') {
      this.eligibilityForm.get('preferredIntake').clearValidators();
      this.eligibilityForm.get('preferredProgram').clearValidators();
      this.eligibilityForm.get('highestLevelEducation').clearValidators();
      this.eligibilityForm.get('grades').clearValidators();
      this.eligibilityForm.get('highestEducationPassoutYear').clearValidators();
      this.eligibilityForm.get('passportStatus').clearValidators();
      this.eligibilityForm.get('englishTest').clearValidators();
      this.eligibilityForm.get('englishTestGrades').clearValidators();
      this.eligibilityForm.get('admitStatus').clearValidators();
    } else {
      this.eligibilityForm.get('preferredIntake').setValidators([Validators.required]);
      if (this.purposeVisitCtrl.value == 'work_permit') {
        this.eligibilityForm.get('preferredProgram').clearValidators();
      } else {
        this.eligibilityForm.get('preferredProgram').setValidators([Validators.required]);
      }
      this.eligibilityForm.get('highestLevelEducation').setValidators([Validators.required]);
      this.eligibilityForm.get('grades').setValidators([Validators.required]);
      this.eligibilityForm.get('highestEducationPassoutYear').setValidators([Validators.required]);
      this.eligibilityForm.get('passportStatus').setValidators([Validators.required]);
      this.eligibilityForm.get('englishTest').setValidators([Validators.required]);
      this.eligibilityForm.get('englishTestGrades').setValidators([Validators.required]);
      this.eligibilityForm.get('admitStatus').setValidators([Validators.required]);
    }
    this.eligibilityForm.get('preferredIntake').updateValueAndValidity();
    this.eligibilityForm.get('preferredProgram').updateValueAndValidity();
    this.eligibilityForm.get('highestLevelEducation').updateValueAndValidity();
    this.eligibilityForm.get('grades').updateValueAndValidity();
    this.eligibilityForm.get('highestEducationPassoutYear').updateValueAndValidity();
    this.eligibilityForm.get('passportStatus').updateValueAndValidity();
    this.eligibilityForm.get('englishTest').updateValueAndValidity();
    this.eligibilityForm.get('englishTestGrades').updateValueAndValidity();
    this.eligibilityForm.get('admitStatus').updateValueAndValidity();
  }

  onCountryChange(event: any) {
    this.eligibilityForm.reset();
    const selectedCountryCode = event.value?.code;
    this.eligibilityForm.get('preferredCountry').setValue(event.value);
    const preparedMonthArr: any = [];
    if (selectedCountryCode == 'CA' || selectedCountryCode == 'UK' || selectedCountryCode == 'US') {
      let immigrationMonths = ['January', 'May', 'September'];
      if (selectedCountryCode == 'US') {
        immigrationMonths = ['January', 'September'];
      }
      immigrationMonths.forEach((monthString: string) => {
        const currentMonth = Number(moment().format('MM'));
        let newDate = moment().month(monthString);
        let newMonth = Number(newDate.format('MM'));
        if (moment().diff(newDate, 'months') && currentMonth >= newMonth) {
          newDate = newDate.add(1, 'years');
        }
        preparedMonthArr.push({
          value: newDate.format('MMM_YYYY').toLowerCase(),
          name: newDate.format('MMM YYYY')
        });
      });
    } else if (selectedCountryCode == 'AU') {
      const immigrationMonths = ['February', 'July', 'November'];
      immigrationMonths.forEach((monthString: string) => {
        let newDate = moment().month(monthString);
        if (moment().diff(newDate, 'months') > 0) {
          newDate = newDate.add(1, 'years');
        }
        preparedMonthArr.push({
          value: newDate.format('MMM_YYYY').toLowerCase(),
          name: newDate.format('MMM YYYY')
        });
      });
    }

    preparedMonthArr.sort(function(a: any, b: any) {
      const firstDate = a.name.split(' ')[1];
      const secondDate = b.name.split(' ')[1];
      return firstDate - secondDate
    });
    this.intakePeriodArr = preparedMonthArr;
    this.eligibilityNgModel = {};
  }

  getOtp() {
    if (this.eligibilityForm.invalid) {
      Object.keys(this.eligibilityForm.controls).forEach((key) => {
        this.eligibilityForm.controls[key].touched = true;
        this.eligibilityForm.controls[key].markAsDirty();
      });
      return;
    }
    this.getOtpPop = !this.getOtpPop;
  }

  test() {
    // console.log(this.eligibilityForm.value);
  }

  changeValue(field: string = '') {
    this.hideShowFlags[field] = true;
  }
  
  private _prepareEligibilityForm(eligibilityObj: any = {}): void {
    this.eligibilityForm = this._formBuilder.group({
      preferredCountry             : [eligibilityObj?.preferredCountry            || ''],
      purposeVisit                 : [eligibilityObj?.purposeVisit                || ''],
      preferredIntake              : [eligibilityObj?.preferredIntake             || ''],
      preferredProgram             : [eligibilityObj?.preferredProgram            || ''],
      highestLevelEducation        : [eligibilityObj?.highestLevelEducation       || ''],
      grades                       : [eligibilityObj?.grades                      || ''],
      highestEducationPassoutYear  : [eligibilityObj?.highestEducationPassoutYear || ''],
      passportStatus               : [eligibilityObj?.passportStatus              || ''],
      englishTest                  : [eligibilityObj?.englishTest                 || ''],
      englishTestGrades            : [eligibilityObj?.englishTestGrades           || ''],
      admitStatus                  : [eligibilityObj?.admitStatus                 || ''],
      name                         : [eligibilityObj?.name                        || '', [Validators.required]],
      email                        : [eligibilityObj?.email                       || '', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      phone                        : [eligibilityObj?.phone                       || '', [Validators.required]],
    });
  }
}
