import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TestObject, TestService } from './test/test-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
 message: Observable<TestObject> = this.testService.getMessage()

  constructor(private testService: TestService) {}
}
