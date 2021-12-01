import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PrijaveComponent } from "./prijave/prijave.component";
import { IspitiComponent } from "./ispiti/ispiti.component";
import { PredmetiComponent } from "./predmeti/predmeti.component";

@NgModule({
  declarations: [
    AppComponent,
    PrijaveComponent,
    IspitiComponent,
    PredmetiComponent,
  ],
  imports: [
    NgxDatatableModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
