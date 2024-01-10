import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CONSTANTS } from './constants';
import { HttpHeaders } from "@angular/common/http";
import { ToastrService } from 'ngx-toastr';
import { DOCUMENT } from '@angular/common';
import * as _ from 'lodash';

declare let $: any;

@Injectable()
export class GlobalFunctions {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private _router: Router,
    private _toastrService: ToastrService
  ) {
  }

  //Header Functions
  // lOGIN NO HOI TYARE
  getHeader(): any {
    return {
      headers: new HttpHeaders({
        'content-Type': 'application/json',
        // 'observe': 'response'
      })
    };
  }

  // INPUT TYPE FILE HOI TYARE
  getFileAuthorizationHeader(): any {
    return {
      headers: new HttpHeaders({
        'Authorization': 'bearer ' + localStorage.getItem('accessToken')
      })
    };
  }

  // INPUT TYPE FILE VAGAR NU HOI TYARE
  getAuthorizationHeader(): any {
    return {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': 'bearer ' + localStorage.getItem('accessToken')
        // 'token': localStorage.getItem('accessToken'),
      })
    };
  }

  copyObject(dataObj: any): any {
    return JSON.parse(JSON.stringify(dataObj));
  }

  convertArrToJSON(arr: any, field: any): any {
    const obj: any = {};
    _.each(arr, (dataObj: any, index: any) => {
      if (index !== undefined && dataObj[field] && dataObj[field] !== undefined) {
        obj[dataObj[field]] = dataObj;
      }
    });
    return obj;
  }

  successErrorHandling(response: any, that: any, messageVariable: any): any {
    this._toastrService.clear();
    let messageText = '';
    messageText = response.message || CONSTANTS.message.INTERNAL_ERROR;
    if (response.code === CONSTANTS.errorCodes.UNAUTHORIZED ||
      response.code === CONSTANTS.errorCodes.TOKEN_EXPIRED ||
      response.code === CONSTANTS.errorCodes.TOKEN_REQUIRED) {
      localStorage.removeItem('accessToken');
      this._toastrService.error(messageText, 'Oops..!');
      // window.location.href = '/login';
      this._router.navigate(['/login'], { queryParams: { redirectURL: this._router.url } });
    } else {
      this._toastrService.error(messageText, 'Oops..!');
    }
    if (messageVariable) {
      messageVariable = messageText;
    }
  }

  errorHanding(errorResponse: any, that: any, messageVariable: any, isSingleErrorReturn: boolean = false): any {
    // let error = errorResponse.json();
    const error = errorResponse.error;
    this._toastrService.clear();

    let messageText: any = '';
    messageText = errorResponse.message || CONSTANTS.message.INTERNAL_ERROR;
    if (error) {
      if (error.details) {
        messageText = error.details.errors;
      } else if (error.error) {
        messageText = error.error;
      } else if (error.message) {
        messageText = error.message;
      }
    }
    if (errorResponse.status === CONSTANTS.errorCodes.UNAUTHORIZED ||
      errorResponse.status === CONSTANTS.errorCodes.TOKEN_EXPIRED ||
      errorResponse.status === CONSTANTS.errorCodes.TOKEN_REQUIRED) {
      localStorage.removeItem('accessToken');
      this._toastrService.error(messageText, 'Oops..!');
      // window.location.href = '/login';
      this._router.navigate(['/login'], { queryParams: { redirectURL: this._router.url } });
    } else if (errorResponse.status === CONSTANTS.errorCodes.ERROR_CODE_VALIDATION_FAILED ||
      errorResponse.status === CONSTANTS.errorCodes.ALREADY_EXISTS) {
      if (error.error && Object.keys(error.error).length) {
        messageText = '';
        _.each(error.error, (message: any, key: any) => {
          messageText = messageText + ' ' + message;
          if (isSingleErrorReturn) {
            if (messageVariable) {
              messageVariable = messageText;
            }
            that.message.error = messageText;
            $('#' + key).focus();
            return;
          }
        });
        this._toastrService.error(messageText, 'Oops..!');
      }
    } else if (errorResponse.status === CONSTANTS.errorCodes.BAD_REQUEST ||
      errorResponse.status === CONSTANTS.errorCodes.NOT_FOUND_HTTP_EXCEPTION ||
      errorResponse.status === CONSTANTS.errorCodes.PERMISSION_DENIED ||
      errorResponse.status === CONSTANTS.errorCodes.METHOD_NOT_FOUND ||
      // errorResponse.status === CONSTANTS.errorCodes.ALREADY_EXISTS ||
      errorResponse.status === CONSTANTS.errorCodes.DATABASE_INITIALIZATION_FAIL ||
      errorResponse.status === CONSTANTS.errorCodes.INVALID_DOMAIN) {
        console.log(messageText.details.errors);
      if (messageText.details.errors && messageText.details.errors.length) {
        for (let index = 0; index < messageText.details.errors.length; index++) {
          const element = messageText.details.errors[index];
          console.log(element);
          
        this._toastrService.error(element.message, element.path.join(', ').toUpperCase());
        }
      } else {
        console.log(messageText);
        this._toastrService.error(messageText, 'Oops..!');
      }
    } else {
      this._toastrService.error(messageText, 'Oops..!');
    }
    if (!messageVariable) {
      if (that.message && that.message) {
        that.message.error = messageText;
      }
    } else {
      messageVariable = messageText;
    }
    if (that.isLoading) {
      that.isLoading = false;
    }
  }

  getPlainText(strSrc: any = '') {
    var resultStr = "";
    // Ignore the <p> tag if it is in very start of the text
    if (strSrc && strSrc != '' && strSrc.indexOf('<p>') == 0)
      resultStr = strSrc.substring(3);
    else
      resultStr = strSrc;
    // Replace <p> with two newlines
    // resultStr = resultStr.replace(/<p>/gi, "\r\n\r\n");
    // Replace <br /> with one newline
    // resultStr = resultStr.replace(/<br \/>/gi, "\r\n");
    // resultStr = resultStr.replace(/<br>/gi, "\r\n");
    
    // Replace &nbsp; with space
    resultStr = resultStr.replace(/&nbsp;/gi, " ");
    return resultStr.replace(/<[^<|>]+?>/gi, '').trim();
  }

}
