import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { Ispit, Predmet, Student } from "./studentska-sluzba.dtos";

@Injectable({
  providedIn: "root",
})
export class StudentskaSluzbaService {
  predmetiUrl: string = "http://localhost:3000/predmeti";
  predmetUrl: string = "http://localhost:3000/predmet";
  ispitiUrl: string = "http://localhost:3000/ispiti";
  ispitUrl: string = "http://localhost:3000/ispit";
  prijaveUrl: string = "http://localhost:3000/prijave";

  constructor(private http: HttpClient) {}

  predmeti(): Observable<Predmet[]> {
    return this.http.get<Predmet[]>(this.predmetiUrl);
  }

  ispiti(sifraPredmeta: string): Observable<Ispit[]> {
    return this.http.get<Ispit[]>(
      `${this.ispitiUrl}?sifraPredmeta=${sifraPredmeta}`
    );
  }

  prijave(terminId: number): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.prijaveUrl}?id=${terminId}`);
  }

  predmet(sifraPredmeta: string): Observable<Predmet> {
    return this.http.get<Predmet>(
      `${this.predmetUrl}?sifraPredmeta=${sifraPredmeta}`
    );
  }

  ispit(id: number): Observable<Ispit> {
    return this.http.get<Ispit>(`${this.ispitUrl}?id=${id}`);
  }
}
