class Termin {
  id;
  vrijeme;
  mjesto;

  constructor(id, vrijeme, mjesto) {
    this.id = id;
    this.vrijeme = vrijeme;
    this.mjesto = mjesto;
  }
}

module.exports = Termin;
