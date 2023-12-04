import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent {
  constructor(
    private authService:AuthService,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.authService.getLoggedUser().subscribe(user => console.log(user))
    this.userService.getUserPortfolioEntries(1).subscribe(entries => console.log(entries))
  }

}
