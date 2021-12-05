import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { StudentComponent } from "./student/student.component";
import { PrijavaComponent } from "./prijava/prijava.component";

import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from "ng-recaptcha";

@NgModule({
  declarations: [AppComponent, StudentComponent, PrijavaComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RecaptchaV3Module,
  ],
  providers: [
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: "6LdJEHccAAAAAOLFndHOVKrqalLVO0rd5L1lIvhx",
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
