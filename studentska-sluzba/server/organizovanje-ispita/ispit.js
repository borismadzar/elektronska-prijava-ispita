class Ispit {
  id;
  sifraPredmeta;
  rok;
  vrijeme;
  mjesto;

  constructor(id, sifraPredmeta, rok, vrijeme, mjesta) {
    this.id = id;
    this.sifraPredmeta = sifraPredmeta;
    this.rok = rok;
    this.vrijeme = vrijeme;
    this.mjesto = mjesta;
  }
}

module.exports = Ispit;
