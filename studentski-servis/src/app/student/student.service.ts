import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class StudentService {
  provjeriPodatkeUrl: any = "http://localhost:3000/autentifikacija";

  constructor(private http: HttpClient) {}

  provjeriPodatke(
    ime: string,
    prezime: string,
    brojIndeksa: string
  ): Observable<boolean> {
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
}
