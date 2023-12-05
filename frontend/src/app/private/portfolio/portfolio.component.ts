import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';
import { PortfolioEntry } from '../../models/portfolio-entry.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent {
  user: User =  {} as User;
  imageUrl:string = "../../../assets/default-image.jpg"
  userId!: number
  portfolioEntries$: Observable<PortfolioEntry[]> | undefined;
  editEntryForm: FormGroup | null = null;
  addNewEntryForm: FormGroup | null = null;
  activeEntry:FormGroup | null = null;
  activeEntryId: number | undefined;

  constructor(
    private authService:AuthService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private portfolioService: PortfolioService,
  ) {}

  ngOnInit() {
    this.userId = this.authService.getDecodedToken().id
    this.authService.getLoggedUser().subscribe(user => {
      this.user.username = user.username,
      this.user.description = user.description,
      this.user.email = user.email
    })
    this.portfolioEntries$ =  this.userService.getUserPortfolioEntries(this.userId)
}

  onAddEntry() {
    this.addNewEntryForm = this.formBuilder.group({
      title:['',Validators.required],
      description:['', Validators.required],
      customerUrl:['', Validators.pattern('https?://.+')]
    })

    this.activeEntry = this.addNewEntryForm
    document.body.classList.add('overlay-visible');
  }

  createEntry() {
    if(this.addNewEntryForm && this.addNewEntryForm.valid){
      const newEntry = {
        userId:this.userId,
        title: this.activeEntry?.value.title,
        description: this.activeEntry?.value.description,
        customerUrl: this.activeEntry?.value.customerUrl,
      }
      console.log(newEntry)
      this.portfolioService.createEntry(newEntry).subscribe(
        () => {
          this.portfolioEntries$ = this.userService.getUserPortfolioEntries(this.userId)
          this.closeAddEntryForm()
        }
      )
    }
  }

  closeAddEntryForm(){
    this.addNewEntryForm = null
    document.body.classList.remove('overlay-visible');
  }

  editEntry(entry: PortfolioEntry){
    this.editEntryForm = this.formBuilder.group({
      title:[entry.title, Validators.required],
      description:[entry.description, Validators.required],
      customerUrl:[entry.customerUrl, Validators.pattern('https?://.+')]
    })
    this.activeEntry  = this.editEntryForm
    this.activeEntryId = entry.id
    document.body.classList.add('overlay-visible');
  }

  closeEntryEditForm(){
    this.editEntryForm = null
    document.body.classList.remove('overlay-visible');
  }

  saveChanges() {
    if(this.editEntryForm && this.editEntryForm.valid) {
      const updatedEntry = {
        title: this.activeEntry?.value.title,
        description: this.activeEntry?.value.description,
        customerUrl: this.activeEntry?.value.customerUrl,
      }
      this.portfolioService.updateEntry(this.activeEntryId!,updatedEntry).subscribe(
        () => {
          this.portfolioEntries$ = this.userService.getUserPortfolioEntries(this.userId)
          this.closeEntryEditForm()
        }
      )
      this.closeEntryEditForm()
    }
  }

  deleteEntry(entry: PortfolioEntry) {
    this.portfolioService.deleteEntry(entry.id!).subscribe(
      () => {
        this.portfolioEntries$ = this.userService.getUserPortfolioEntries(this.userId)
      }
    )
  }
}
