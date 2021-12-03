var mysql = require("mysql2");
var config = require("../config");
var Predmet = require("./predmet");
var Ispit = require("./ispit");
var Student = require("./student");

var pool = mysql.createPool(config.mysql.connectionParameters);

exports.predmeti = function (callback) {
  pool.getConnection(function (err, connection) {
    connection.release();

    if (err) {
      console.log(err);
      callback(true);
      return;
    }

    connection.query(
      `select pnp.godina
                , np.smjer_oznaka as smjer
                , p.id            as sifraPredmeta
                , p.naziv
   
        from predmet p
                    join predmet_nastavni_plan pnp on p.id = pnp.predmet_id
                    join nastavni_plan np on pnp.nastavni_plan_id = np.id`,

      function (err, result) {
        if (err) throw err;

        var json_result = [];

        result.forEach((row) => {
          let p = new Predmet(
            row.godina,
            row.smjer,
            row.sifraPredmeta,
            row.naziv
          );
          json_result.push(p);
        });

        return callback(null, json_result);
      }
    );
  });
};

exports.predmet = function (predmetId, callback) {
  pool.getConnection(function (err, connection) {
    connection.release();

    if (err) {
      console.log(err);
      callback(true);
      return;
    }

    connection.query(
      `select pnp.godina
                  , np.smjer_oznaka as smjer
                  , p.id            as sifraPredmeta
                  , p.naziv
     
        from predmet p
                    join predmet_nastavni_plan pnp on p.id = pnp.predmet_id
                    join nastavni_plan np on pnp.nastavni_plan_id = np.id
        where p.id = ?`,
      [predmetId],

      function (err, result) {
        if (err) throw err;

        var row = result[0];

        let p = new Predmet(
          row.godina,
          row.smjer,
          row.sifraPredmeta,
          row.naziv
        );

        return callback(null, p);
      }
    );
  });
};

exports.ispiti = function (sifraPredmeta, callback) {
  pool.getConnection(function (err, connection) {
    connection.release();

    if (err) {
      console.log(err);
      callback(true);
      return;
    }

    connection.query(
      `select t.id
            , p.id          as sifraPredmeta
            , t.ispitni_rok as rok
            , DATE_FORMAT(t.vrijeme, "%d.%m.%Y. %H:%i") as vrijeme
            , t.mjesto
        from termin t
                join predmet p on t.predmet_id = p.id
        where p.id = ?`,
      [sifraPredmeta],
      function (err, result) {
        if (err) throw err;

        var json_result = [];

        result.forEach((row) => {
          let ispit = new Ispit(
            row.id,
            row.sifraPredmeta,
            row.rok,
            row.vrijeme,
            row.mjesto
          );
          json_result.push(ispit);
        });

        return callback(null, json_result);
      }
    );
  });
};

exports.ispit = function (ispitId, callback) {
  pool.getConnection(function (err, connection) {
    connection.release();

    if (err) {
      console.log(err);
      callback(true);
      return;
    }

    connection.query(
      `select t.id
              , p.id          as sifraPredmeta
              , t.ispitni_rok as rok
              , DATE_FORMAT(t.vrijeme, "%d.%m.%Y. %H:%i") as vrijeme
              , t.mjesto
          from termin t
                  join predmet p on t.predmet_id = p.id
          where t.id=?`,
      [ispitId],

      function (err, result) {
        if (err) throw err;

        var row = result[0];

        let ispit = new Ispit(
          row.id,
          row.sifraPredmeta,
          row.rok,
          row.vrijeme,
          row.mjesta
        );

        return callback(null, ispit);
      }
    );
  });
};

exports.prijave = function (terminId, callback) {
  pool.getConnection(function (err, connection) {
    connection.release();

    if (err) {
      console.log(err);
      callback(true);
      return;
    }

    connection.query(
      `select s.ime
            , s.prezime
            , s.broj_indeksa as brojIndeksa
        from student s
        where s.id in (select student_id from prijava where termin_id = ?)`,
      [terminId],

      function (err, result) {
        if (err) throw err;

        var json_result = [];

        result.forEach((row) => {
          let s = new Student(row.ime, row.prezime, row.brojIndeksa);
          json_result.push(s);
        });

        return callback(null, json_result);
      }
    );
  });
};
