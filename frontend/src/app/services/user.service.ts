import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PortfolioEntry } from "../models/portfolio-entry.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private http: HttpClient,
  ) {}


  getUserPortfolioEntries(userId: number): Observable<PortfolioEntry[]> {
      return this.http.get<PortfolioEntry[]>(`api/portfolio-entry/${userId}`)
  }
}
