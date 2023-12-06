import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent {

  searchInput = new FormControl();
  searchResults: any[] = [];

  constructor(private router: Router, private userService: UserService) {
    this.setupSearchObservable()
  }

  navigateToRegister() {
    this.router.navigate(['/public/register'])
  }

  navigateToLogin() {
    this.router.navigate(['/public/login'])
  }


  onSearchInputChange(event: any) {
    const searchTerm = event.target.value;
    this.searchInput.setValue(searchTerm);
  }

  onSearchResultClick(result: any) {
    // Handle the click on a search result
    console.log('Clicked on:', result);
  }

  private setupSearchObservable() {
    this.searchInput.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((searchTerm: string) => this.userService.findUserByUsername(searchTerm))
      )
      .subscribe((results) => {
        this.searchResults = results;
      });
  }
}

