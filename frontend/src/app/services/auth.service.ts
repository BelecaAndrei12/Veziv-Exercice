import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { User } from "../models/user.model";
import { Observable, catchError, tap, throwError } from "rxjs";
import { LoginResponse } from "../models/login-response.model";

@Injectable({
  providedIn:'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private jwtService: JwtHelperService
  ) {}

    createUser(user: User) {
      return this.http.post<User>('api/user/register',user).pipe(
        catchError(() => {
          let errorMessage = 'An error occurred. Please try again later.'
          return throwError(() => errorMessage)
        })
      )
    }

    login(user: User): Observable<LoginResponse> {
      return this.http.post<LoginResponse>('api/user/login', user).pipe(
        tap((response: LoginResponse) => localStorage.setItem('jwt-token',response.message)),
      )
    }

}
