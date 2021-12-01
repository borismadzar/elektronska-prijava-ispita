import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Ispit, Predmet, Student } from "../studentska-sluzba.dtos";
import { StudentskaSluzbaService } from "../studentska-sluzba.service";

@Component({
  selector: "app-prijave",
  templateUrl: "./prijave.component.html",
  styleUrls: ["./prijave.component.css"],
})
export class PrijaveComponent implements OnInit {
  rows: Student[] = [];

  predmet: Predmet = null;
  ispit: Ispit = null;

  constructor(
    route: ActivatedRoute,
    studentskaSluzbaService: StudentskaSluzbaService
  ) {
    route.queryParams.subscribe((params) => {
      studentskaSluzbaService
        .prijave(params["id"])
        .subscribe((prijave) => (this.rows = prijave));

      studentskaSluzbaService.ispit(params["id"]).subscribe((ispit) => {
        this.ispit = ispit;

        studentskaSluzbaService
          .predmet(ispit.sifraPredmeta)
          .subscribe((predmet) => (this.predmet = predmet));
      });
    });
  }

  ngOnInit(): void {}
}
