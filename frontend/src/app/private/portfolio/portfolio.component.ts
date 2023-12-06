import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Observable, map, of, switchMap, tap } from 'rxjs';
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
  userImage: string | ArrayBuffer = '../../../assets/default-image.jpg';
  entryImageDefault: string = '../../../assets/default-image.jpg';
  userId!: number
  portfolioEntries$: Observable<PortfolioEntry[]> | undefined;
  editEntryForm: FormGroup | null = null;
  addNewEntryForm: FormGroup | null = null;
  activeEntry:FormGroup | null = null;
  activeEntryId: number | undefined;
  previewImage: string = '';
  previewEntryImage: string = '';
  base64PreviewEntry: string= '';
  base64Preview: string = '';
  isPreview: boolean = false;
  isPreviewEntry = false;
  isDialogueActive = false;

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
      this.user.profileImage = user.profileImage!
      this.userImage = this.getBase64Image(this.user.profileImage);
    })


    this.portfolioEntries$ = this.userService.getUserPortfolioEntries(this.userId).pipe(
      tap(entries => console.log('Original entries:', entries)),
      map(entries => entries.map(entry => ({ ...entry, entryImage: this.getBase64Image(entry.entryImage) }))),
      tap(transformedEntries => console.log('Transformed entries:', transformedEntries))
    );

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


  async onFileSelected(event: any) {
    console.log('user')
    const file = event.target.files[0];
    if (file) {
      try {
        const base64Data: string = await this.covertFileToBase64(file);
        this.base64Preview = base64Data
        this.previewImage = this.getImage(base64Data)
        this.isPreview = true;

      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('Error: No file selected');
    }
  }

  uploadImage() {
    this.userService.updateProfileImage(this.userId, this.base64Preview)
      .pipe(
        switchMap(() => this.authService.getLoggedUser())
      )
      .subscribe(
        (user) => {
          this.userImage = this.getBase64Image(user.profileImage)
          this.resetPreview();
        }
      );
  }

  resetPreview() {
    this.previewImage = ''
    this.base64Preview = ''
    this.isPreview = false
  }

  resetPreviewEntry() {
    this.previewEntryImage = ''
    this.base64PreviewEntry = ''
    this.isPreviewEntry = false
    this.isDialogueActive = false
  }


  covertFileToBase64(file: any): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64Data = reader.result?.toString().split(',')[1];
        resolve(base64Data!);
      };

      reader.onerror = () => {
        reject(new Error('Failed to read the file.'));
      };

      reader.readAsDataURL(file);
    });
  }


  getBase64Image(image: any): string {
    if(image !== null) {
    const arrayBuffer = new Uint8Array(image.data);
    const binary = [...arrayBuffer].map(byte => String.fromCharCode(byte)).join('');
    return `data:${image.type};base64,${btoa(binary)}`; }
    return ''
  }


   getImage(base64Data: string): string {
    return `data:Buffer;base64,${base64Data}`;
   }


   async onFileSelectedEntry(event: any,entry: PortfolioEntry) {
    this.activeEntryId = entry.id
    console.log(this.activeEntryId)
    const file = event.target.files[0];
    if (file) {
      try {
        const base64Data: string = await this.covertFileToBase64(file);
        this.base64PreviewEntry = base64Data
        this.previewEntryImage = this.getImage(base64Data)
        this.isPreviewEntry  = true;
        setTimeout(() => this.isDialogueActive = true, 1000)

      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('Error: No file selected');
    }
   }

   onYesAns() {
    if (this.activeEntryId && this.base64PreviewEntry) {
      this.portfolioService.uploadEntryImage(this.activeEntryId, this.base64PreviewEntry).pipe(
        switchMap(() => this.userService.getUserPortfolioEntries(this.userId)),
        map(entries => entries.map(entry => ({ ...entry, entryImage: this.getBase64Image(entry.entryImage) })))
      ).subscribe(
        transformedEntries => {
          this.portfolioEntries$ = of(transformedEntries);
          this.resetPreviewEntry();
        },
        error => {
          console.error(error);
        }
      );
    }
  }

   onNoAns(){
    this.resetPreviewEntry()
   }

}
