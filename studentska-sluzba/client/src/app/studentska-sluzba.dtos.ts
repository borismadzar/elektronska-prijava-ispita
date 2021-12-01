export interface Predmet {
  godina: string;
  smjer: string;
  sifraPredmeta: string;
  naziv: string;
}

export interface Ispit {
  id: number;
  sifraPredmeta: string;
  rok: string;
  vrijeme: string;
  mjesto: string;
}

export interface Student {
  ime: string;
  prezime: string;
  brojIndeksa: string;
}
