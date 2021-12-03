import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { Godina } from "./prijava/godina";
import { IspitniRok } from "./prijava/ispitni-rok";
import { Student } from "./student/student";

@Injectable({
  providedIn: "root",
})
export class StudentskiServis {
  provjeriPodatkeUrl: any = "http://localhost:3000/autentifikacija";
  predmtiKojeStudentNijePolozioUrl: any =
    "http://localhost:3000/predmeti_koje_ne_polozih";
  rokoviZaOdabraniPredmetUrl: any = "http://localhost:3000/rokovi_za_predmet";
  prijaviIspitUrl: any = "http://localhost:3000/prijavi";

  constructor(private http: HttpClient) {}

  student: Student = null;

  provjeriPodatke(
    ime: string,
    prezime: string,
    brojIndeksa: string
  ): Observable<boolean> {
    this.student = { ime, prezime, brojIndeksa };
    return this.http.post<boolean>(
      this.provjeriPodatkeUrl,
      {
        ime: ime,
        prezime: prezime,
        brojIndeksa: brojIndeksa,
      },
      {
        withCredentials: true,
      }
    );
  }

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
