import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})

export class HttpService {
  token = `Token ${localStorage.getItem('access_token')}`;
  user = localStorage.getItem('user')
  // httpOptions = new HttpHeaders({'Content-Type': 'application/json'})  

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': this.token,
    }),
  };
  NoAuthHttpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  httpOptionsMultipart = {
    headers: new HttpHeaders({
    }),
  };

  // httpHeaderFile = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //     'authorization': 'Token 37d266065dc70ea5a61cac9f6db65bd7307a8746',
  //   }),
  // };


  constructor(private http: HttpClient) {
    this.token = `Token ${localStorage.getItem('access_token')}`;
    // console.log('auth services', localStorage.getItem('access_token'))
    // console.log("token", this.token);
    if (localStorage.getItem('access_token')) {

      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'authorization': this.token,
        }),
      };

      this.httpOptionsMultipart = {
        headers: new HttpHeaders({
          'authorization': this.token,
        }),
      };
    }
  }

  get(url: string) {
    return this.http.get(url, this.httpOptions);
  }
  gettoken() {
    // console.log(localStorage.getItem("access_token"))
    return !!localStorage.getItem("access_token");
  }
  post(url: string, data: any) {
    return this.http.post(url, JSON.stringify(data), this.httpOptions);
  }
  getUser() {
    if (this.user) {
      return JSON.parse(this.user)
    }
    return false;
  }
}
