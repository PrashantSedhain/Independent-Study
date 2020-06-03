import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthData } from "./signupAuth-data.model";
import {
  loginAuthData,
  UserDetails,
  UserImg,
  currentUserID,
  CurrentUserDetails,
} from "./loginAuth-data";
import { Subject, Observable } from "rxjs";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class AuthService {
  private token: string;
  private isAuthenticated = false;
  private authStatusListner = new Subject<boolean>();
  private loginErrors = new Subject<string>();
  private tokenTimer: any;
  user: Observable<UserDetails>;
  data: UserDetails;

  constructor(private http: HttpClient, private router: Router) {}

  headers = new HttpHeaders({
    "Content-Type": "application/json",
  });

  getToken() {
    return this.token;
  }
  public getLoginErrors(): Subject<string> {
    return this.loginErrors;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListner() {
    return this.authStatusListner.asObservable();
  }

  createUser(
    // firstName: string,
    // lastName: string,
    email: string,
    password: string
  ) {
    const authData: AuthData = {
      // firstName: firstName,
      // lastName: lastName,
      email: email,
      password: password,
    };
    this.http
      .post("http://localhost:3000/api/user/signup", authData, {
        headers: this.headers,
      })
      .subscribe(
        () => {
          this.login(email, password);
          this.router.navigate(["/login"]);
        },
        (error) => {
          this.authStatusListner.next(false);
        }
      );
  }

  login(email: string, password: string) {
    const authData: loginAuthData = {
      email: email,
      password: password,
    };
    this.http
      .post<{ token: string; expiresIn: number }>(
        "http://localhost:3000/api/user/login",
        authData,
        { headers: this.headers }
      )
      .subscribe(
        (res) => {
          const token = res.token;
          this.token = token;
          if (token) {
            const expiresInDuration = res.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isAuthenticated = true;
            this.authStatusListner.next(true);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            this.saveAuthData(token, expirationDate);
            this.router.navigate(["/splitPage"]);
          }
        },
        (error) => {
          this.authStatusListner.next(false);
        }
      );
  }

  autoAuthUser() {
    const authInfo = this.getAuthData();
    const now = new Date();
    if (authInfo) {
      //gets time in milliseconds
      const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
      if (expiresIn > 0) {
        this.token = authInfo.token;
        this.isAuthenticated = true;
        //dividing to get time in seconds
        this.setAuthTimer(expiresIn / 1000);
        this.authStatusListner.next(true);
      }
    }
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListner.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/"]);
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
    };
  }

  public getUserDetails(id: string): Observable<UserDetails> {
    return this.http.get<UserDetails>(
      "http://localhost:3000/api/user/getUserDetails/" + id
    );
  }
  public getcurrentUserDetails(): Observable<CurrentUserDetails> {
    return this.http.get<CurrentUserDetails>(
      "http://localhost:3000/api/user/getCurrentUserDetails"
    );
  }
  public getCurrentUserID(): currentUserID {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split(".")[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public updatePost(info, location) {
    return this.http.put("http://localhost:3000/api/user/updateProfile", {
      info: info,
      location: location,
    });
  }
}
