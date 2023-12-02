import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface TestObject {
    message: string
}

@Injectable({providedIn:'root'})
export class TestService {
  constructor(private http: HttpClient) { }
   getMessage(): Observable<TestObject> {
    return this.http.get<TestObject>('api')
   }
}
