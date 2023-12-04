import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PortfolioComponent } from "./portfolio/portfolio.component";
import { PrivateRoutingModule } from "./private-routing.module";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from "@angular/forms";
@NgModule({
  declarations: [
    PortfolioComponent
  ],

  imports: [
    CommonModule,
    PrivateRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
  ]
})
export class PrivateModule {}
