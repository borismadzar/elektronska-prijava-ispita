import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Godina } from "./godina";
import { IspitniRok } from "./ispitni-rok";

@Injectable({
  providedIn: "root",
})
export class PrijavaService {
  predmtiKojeStudentNijePolozioUrl: any =
    "http://localhost:3000/predmeti_koje_ne_polozih";
  rokoviZaOdabraniPredmetUrl: any = "http://localhost:3000/rokovi_za_predmet";
  prijaviIspitUrl: any = "http://localhost:3000/prijavi";

  constructor(private http: HttpClient) {}

  predmtiKojeStudentNijePolozio(): Observable<Godina[]> {
    return this.http.get<Godina[]>(this.predmtiKojeStudentNijePolozioUrl, {
      withCredentials: true,
    });
  }

  rokoviZaOdabraniPredmet(predmetId: number): Observable<IspitniRok[]> {
    return this.http.get<IspitniRok[]>(
      `${this.rokoviZaOdabraniPredmetUrl}?predmet_id=${predmetId}`,
      {
        withCredentials: true,
      }
    );
  }

  kreirajPrijavu(terminId: number) {
    return this.http.post<boolean>(
      this.prijaviIspitUrl,
      {
        termin_id: terminId,
      },
      {
        withCredentials: true,
      }
    );
  }
}
