import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { StudentskiServis } from "../studentski-servis.service";
import { ReCaptchaV3Service } from "ng-recaptcha";

@Component({
  selector: "app-student",
  templateUrl: "./student.component.html",
  styleUrls: ["./student.component.css"],
})
export class StudentComponent implements OnInit {
  ime: string;
  prezime: string;
  brojIndeksa: string;

  prikaziNesupjesnaProvjera: boolean;

  constructor(
    private studentskiServis: StudentskiServis,
    private router: Router,
    private recaptchaV3Service: ReCaptchaV3Service
  ) {}

  ngOnInit(): void {}

  public addTokenLog(message: string, token: string | null) {
    console.log(`${message}: ${token}`);
  }

  public provjeriPodatke() {
    this.recaptchaV3Service
      .execute("addTokenLog")
      .subscribe((token: string) => {
        console.debug(`Token [${token}] generated`);

        this.studentskiServis
          .provjeriPodatke(this.ime, this.prezime, this.brojIndeksa, token)
          .subscribe((r) => {
            if (r) this.router.navigateByUrl("/prijava");
            else this.prikaziNesupjesnaProvjera = true;
          });
      });
  }
}
