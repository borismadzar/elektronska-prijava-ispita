import { Component, OnInit } from "@angular/core";
import { StudentskiServis } from "../studentski-servis.service";
import { Godina } from "./godina";
import { IspitniRok } from "./ispitni-rok";
import { Predmet } from "./predmet";
import { Termin } from "./termin";

@Component({
  selector: "app-prijava",
  templateUrl: "./prijava.component.html",
  styleUrls: ["./prijava.component.css"],
})
export class PrijavaComponent implements OnInit {
  odabranPredmet: Predmet = null;
  odabranIspitniRok: IspitniRok = null;
  odabranTermin: Termin = null;
  uspjesnoPrijavljenIspit: boolean = false;

  godine: Godina[] = [];

  rokovi: IspitniRok[] = [];

  constructor(public studentskiServis: StudentskiServis) {
    studentskiServis
      .predmtiKojeStudentNijePolozio()
      .subscribe((godine) => (this.godine = godine));
  }

  ngOnInit(): void {}

  predmet_click(p: Predmet): void {
    this.odabranPredmet = p;

    this.studentskiServis
      .rokoviZaOdabraniPredmet(p.id)
      .subscribe((rokovi) => (this.rokovi = rokovi));
  }

  prijaviIspit_click(): void {
    this.studentskiServis
      .kreirajPrijavu(this.odabranTermin.id)
      .subscribe((ok) => {
        console.log(ok);
        if (ok) this.uspjesnoPrijavljenIspit = true;
      });
  }

  odustani_click(): void {
    this.reset();
  }

  prijaviDrugiIspit_click(): void {
    this.reset();
  }

  reset(): void {
    this.odabranPredmet = null;
    this.odabranIspitniRok = null;
    this.odabranTermin = null;
    this.uspjesnoPrijavljenIspit = false;
  }
}
