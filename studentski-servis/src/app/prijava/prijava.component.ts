import { Component, OnInit } from "@angular/core";
import { Godina } from "./godina";
import { IspitniRok } from "./ispitni-rok";
import { Predmet } from "./predmet";
import { PrijavaService } from "./prijava.service";
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

  constructor(private prijavaService: PrijavaService) {
    prijavaService
      .predmtiKojeStudentNijePolozio()
      .subscribe((godine) => (this.godine = godine));
  }

  ngOnInit(): void {}

  predmet_click(p: Predmet): void {
    this.odabranPredmet = p;

    this.prijavaService
      .rokoviZaOdabraniPredmet(p.id)
      .subscribe((rokovi) => (this.rokovi = rokovi));
  }

  prijaviIspit_click(): void {
    this.prijavaService
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
