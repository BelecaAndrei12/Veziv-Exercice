import { HttpClient, HttpHeaders } from "@angular/common/http";
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

  updateProfileImage(userId: number, image: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers };
    return this.http.patch(`/api/user/${userId}/upload-image`, {image},options)
  }
}
