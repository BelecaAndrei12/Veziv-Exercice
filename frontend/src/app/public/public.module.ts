import { NgModule } from "@angular/core";
import { WelcomeComponent } from "./welcome/welcome.component";
import { CommonModule } from "@angular/common";
import { PublicRoutingModule } from "./public-routing.module";
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    WelcomeComponent,
    RegisterComponent,
    LoginComponent,
  ],

  imports: [
    CommonModule,
    PublicRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
  ]
})
export class PublicModule {}
