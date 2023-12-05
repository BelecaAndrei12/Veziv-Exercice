import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PortfolioEntry } from "../models/portfolio-entry.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(
    private http: HttpClient,
  ) {}

  createEntry(entry:PortfolioEntry):Observable<PortfolioEntry> {
    return this.http.post<PortfolioEntry>(`api/portfolio-entry`,entry)
  }

  updateEntry(entryId: number, updatedEntry: PortfolioEntry): Observable<PortfolioEntry> {
    return this.http.patch<PortfolioEntry>(`api/portfolio-entry/${entryId}`,updatedEntry)
  }

  deleteEntry(entryId: number): Observable<void> {
    return this.http.delete<void>(`api/portfolio-entry/${entryId}`)
  }
}
