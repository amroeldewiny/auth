import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';

import { ILoginCredentials } from '../../interface/login-interface';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthService {
  public apiUrl: any = "http://auth.test";
  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  public data: any = "";
  authenticated = new BehaviorSubject<boolean>(false);

  constructor(public http: HttpClient, public router: Router) {
    if (localStorage.getItem("token")) {
      this.appendHeader("Authorization", `Bearer ${localStorage.getItem("token")}`);
      this.authenticated.next(true);
    }
  }

  getData(path: string): Observable<any> {
    return this.http.get(this.apiUrl + path, { headers: this.headers })
      .map((res: any) => res)
      .catch((error: any) => {
        return Observable.throw(error);
      })
  }

  postData(path: string, body?: any) {
    return this.http.post(this.apiUrl + path, body, { headers: this.headers })
      .map((res: any) => res)
      .catch((error: any) => {
        return Observable.throw(error);
      })
  }

  loginUser(value: ILoginCredentials) {
    this.postData('/api/login', value)
      .subscribe(
        (res: any) => {
          if (res) {
            this.appendHeader("Authorization", `Bearer ${res.token}`);
            localStorage.setItem("token", res.token);
            this.authenticated.next(true);
            this.router.navigate(['dashboard']);
          } else {
            // coming soon
          }
        },
        //console.log(res.token),
        (error) => {
          console.log(error)
        }
      );
  }

  registerUser(value: any) {
    this.postData('/api/register', value)
      .subscribe((res: any) => {
        if (res) {
          this.appendHeader("Authorization", `Bearer ${res[1].token.token}`);
          localStorage.setItem("token", res[1].token.token);
          this.authenticated.next(true);
          this.router.navigate(['dashboard']);
        } else {
          // coming soon
        }
      }, (error) => {
        console.log(error);
      })
  }

  logoutUser() {
    this.deleteHeader("Authorization");
    localStorage.removeItem("token");
    this.authenticated.next(true);
  }

  authChangeObs() {
    return this.authenticated.asObservable();
  }

  private appendHeader(key: string, value: any) {
    this.headers = this.headers.append(key, value);
  }

  private getHeader(key: string) {
    return this.headers.get(key);
  }

  private deleteHeader(key: string, value?: any) {
    this.headers = this.headers.delete(key, value);
  }

}
