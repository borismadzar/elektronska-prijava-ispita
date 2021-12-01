import { Component, OnInit } from "@angular/core";
import { Predmet } from "../studentska-sluzba.dtos";
import { StudentskaSluzbaService } from "../studentska-sluzba.service";

@Component({
  selector: "app-predmeti",
  templateUrl: "./predmeti.component.html",
  styleUrls: ["./predmeti.component.css"],
})
export class PredmetiComponent implements OnInit {
  rows: Predmet[] = [];

  constructor(studentskaSluzbaService: StudentskaSluzbaService) {
    studentskaSluzbaService
      .predmeti()
      .subscribe((predmeti) => (this.rows = predmeti));
  }

  ngOnInit(): void {}
}
