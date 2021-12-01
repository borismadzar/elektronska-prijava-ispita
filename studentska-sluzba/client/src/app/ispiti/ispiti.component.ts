import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Ispit, Predmet } from "../studentska-sluzba.dtos";
import { StudentskaSluzbaService } from "../studentska-sluzba.service";

@Component({
  selector: "app-ispiti",
  templateUrl: "./ispiti.component.html",
  styleUrls: ["./ispiti.component.css"],
})
export class IspitiComponent implements OnInit {
  rows: Ispit[] = [];
  predmet: Predmet = null;

  constructor(
    route: ActivatedRoute,
    studentskaSluzbaService: StudentskaSluzbaService
  ) {
    route.queryParams.subscribe((params) => {
      studentskaSluzbaService
        .ispiti(params["sifraPredmeta"])
        .subscribe((ispiti) => (this.rows = ispiti));

      studentskaSluzbaService
        .predmet(params["sifraPredmeta"])
        .subscribe((predmet) => (this.predmet = predmet));
    });
  }

  ngOnInit(): void {}
}
