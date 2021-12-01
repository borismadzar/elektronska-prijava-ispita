class Predmet {
  godina;
  smjer;
  sifraPredmeta;
  naziv;

  constructor(godina, smjer, sifraPredmeta, naziv) {
    this.godina = godina;
    this.smjer = smjer;
    this.sifraPredmeta = sifraPredmeta;
    this.naziv = naziv;
  }
}

module.exports = Predmet;
