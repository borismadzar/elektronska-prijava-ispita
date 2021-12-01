const db = require("./db");

exports.predmeti = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  db.predmeti(function (err, result) {
    res.send(result);
  });
};

exports.predmet = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  db.predmet(req.query.sifraPredmeta, function (err, result) {
    res.send(result);
  });
};

exports.ispiti = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  db.ispiti(req.query.sifraPredmeta, function (err, result) {
    res.send(result);
  });
};

exports.ispit = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  db.ispit(req.query.id, function (err, result) {
    res.send(result);
  });
};

exports.prijave = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  db.prijave(req.query.id, function (err, result) {
    res.send(result);
  });
};
