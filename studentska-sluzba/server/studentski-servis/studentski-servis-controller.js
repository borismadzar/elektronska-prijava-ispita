const db = require("./db");
const request = require("request");

exports.autetntifikuj = (req, res) => {
  res.setHeader("Content-Type", "application/json");

  if (!req.body.gRrecaptcha) {
    return res.send(false);
  }

  request.post(
    {
      url: "https://www.google.com/recaptcha/api/siteverify",
      form: {
        secret: "6LdJEHccAAAAAN9OeNhUDpmkG6brDen9TENXrtuO",
        response: req.body.gRrecaptcha,
      },
    },
    function (error, response, body) {
      body = JSON.parse(body);

      if (body.success !== undefined && !body.success) {
        res.send(false);
      }

      db.provjeriOsnovnePodatke(
        req.body.ime,
        req.body.prezime,
        req.body.brojIndeksa,
        function (err, user) {
          if (user) {
            req.session.regenerate(function () {
              req.session.user = user;

              res.send(true);
            });
          } else {
            res.send(false);
          }
        }
      );
    }
  );
};

exports.nepolozeniPredmeti = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  db.predmetiKojeNePolozih(req.session.user.id, function (err, result) {
    res.send(result);
  });
};

exports.rokoviZaPredmet = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  db.rokoviZaIzaci(req.query.predmet_id, function (err, result) {
    res.send(result);
  });
};

exports.prijaviIspit = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  db.novaPrijava(req.session.user.id, req.body.termin_id, function (err) {
    if (err) res.send(false);
    else res.send(true);
  });
};

exports.restrict = function (req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};
