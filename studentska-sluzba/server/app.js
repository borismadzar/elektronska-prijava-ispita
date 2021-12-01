const express = require("express");
const session = require("express-session");

const studentskiServisController = require("./studentski-servis/studentski-servis-controller");
const restrict =
  require("./studentski-servis/studentski-servis-controller").restrict;

const organizovanjeIspitaController = require("./organizovanje-ispita/organizovanje-ispita-controller");

const config = require("./config");
const cors = require("cors");

const app = express();
module.exports = app;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:4040", "http://localhost:5050"],
    credentials: true,
  })
);
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "shhhh, very secret",
  })
);

app.post("/autentifikacija", studentskiServisController.autetntifikuj);
app.get(
  "/predmeti_koje_ne_polozih",
  restrict,
  studentskiServisController.nepolozeniPredmeti
);
app.get(
  "/rokovi_za_predmet",
  restrict,
  studentskiServisController.rokoviZaPredmet
);
app.post("/prijavi", restrict, studentskiServisController.prijaviIspit);

app.get("/predmeti", organizovanjeIspitaController.predmeti);
app.get("/predmet", organizovanjeIspitaController.predmet);
app.get("/ispiti", organizovanjeIspitaController.ispiti);
app.get("/ispit", organizovanjeIspitaController.ispit);
app.get("/prijave", organizovanjeIspitaController.prijave);

app.listen(config.express.port, config.express.ip, () => {
  console.log(
    `studentska-sluzba app listening at http://${config.express.ip}:${config.express.port}`
  );
});
