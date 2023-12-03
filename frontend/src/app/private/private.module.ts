import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PortfolioComponent } from "./portfolio/portfolio.component";
import { PrivateRoutingModule } from "./private-routing.module";

@NgModule({
  declarations: [
    PortfolioComponent
  ],

  imports: [
    CommonModule,
    PrivateRoutingModule,
  ]
})
export class PrivateModule {}
