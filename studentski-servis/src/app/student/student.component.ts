import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { StudentService } from "./student.service";

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

  constructor(private studentService: StudentService, private router: Router) {}

  ngOnInit(): void {}

  public addTokenLog(message: string, token: string | null) {
    console.log(`${message}: ${token}`);
  }

  public provjeriPodatke() {
    this.studentService
      .provjeriPodatke(this.ime, this.prezime, this.brojIndeksa)
      .subscribe((r) => {
        if (r) this.router.navigateByUrl("/prijava");
        else this.prikaziNesupjesnaProvjera = true;
      });
  }
}
