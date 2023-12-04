import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PortfolioEntry } from "../models/portfolio-entry.model";

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(
    private http: HttpClient,
  ) {}


  updateEntry(entryId: number, updatedEntry: PortfolioEntry) {
    return this.http.patch<PortfolioEntry>(`api/portfolio-entry/${entryId}`,updatedEntry)
  }
}
