var mysql = require("mysql2");
var config = require("../config");
var Godina = require("./Godina");
var Predmet = require("./Predmet");

var Rok = require("./Rok");
var Termin = require("./Termin");

var pool = mysql.createPool(config.mysql.connectionParameters);

exports.provjeriOsnovnePodatke = function (
  ime,
  prezime,
  brojIndeksa,
  callback
) {
  pool.getConnection(function (err, connection) {
    connection.release();

    if (err) {
      console.log(err);
      callback(true);
      return;
    }

    connection.query(
      `select id,
                                ime,
                                prezime,
                                broj_indeksa as brojIndeksa
                        from student
                        where ime = ?
                        and prezime = ?
                        and broj_indeksa = ?`,
      [ime, prezime, brojIndeksa],

      function (err, result) {
        if (err) throw err;

        if (result.length == 1) return callback(null, result[0]);
        callback(new Error("invalid password"));
      }
    );
  });
};

exports.predmetiKojeNePolozih = function (studentId, callback) {
  pool.getConnection(function (err, connection) {
    connection.release();

    if (err) {
      console.log(err);
      callback(true);
      return;
    }

    connection.query(
      `select 
        p.id, 
        p.naziv, 
        pnp.godina 
      from predmet p 
      join predmet_nastavni_plan pnp on p.id = pnp.predmet_id
        where p.id in (select predmet_id from student_predmet where student_id = ? and polozio = false)`,
      [studentId],

      function (err, result) {
        if (err) throw err;

        var json_result = [];

        result.forEach((row) => {
          let p = new Predmet(row.id, row.naziv);

          let g = json_result.find((x) => x.godina == row.godina);

          if (g == undefined) {
            g = new Godina(row.godina);
            json_result.push(g);
          }

          g.predmeti.push(p);
        });

        return callback(null, json_result);
      }
    );
  });
};

exports.rokoviZaIzaci = function (predmetId, callback) {
  pool.getConnection(function (err, connection) {
    connection.release();

    if (err) {
      console.log(err);
      callback(true);
      return;
    }

    connection.query(
      `select t.id,
                t.predmet_id,
                t.ispitni_rok,
                DATE_FORMAT(t.vrijeme, "%d.%m.%Y. %H:%i") as vrijeme,
                t.mjesto
        from termin t
        where predmet_id = ?`,
      [predmetId],

      function (err, result) {
        if (err) throw err;

        var json_result = [];

        result.forEach((row) => {
          let t = new Termin(row.id, row.vrijeme, row.mjesto);

          let r = json_result.find((x) => x.naziv == row.ispitni_rok);

          if (r == undefined) {
            r = new Rok(row.ispitni_rok);
            json_result.push(r);
          }

          r.termini.push(t);
        });

        return callback(null, json_result);
      }
    );
  });
};

exports.novaPrijava = function (userId, terminId, callback) {
  pool.getConnection(function (err, connection) {
    connection.release();

    if (err) {
      console.log(err);
      callback(true);
      return;
    }

    connection.query(
      `insert into prijava (student_id, termin_id)
                            values (?, ?);`,
      [userId, terminId],

      function (err) {
        if (err) {
          console.log(err);
          callback(true);
          return;
        } else callback(false);
      }
    );
  });
};
