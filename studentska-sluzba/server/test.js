var chai = require("chai");
var chaiHttp = require("chai-http");
var testData = require("./testData");
var expect = chai.expect;

chai.use(chaiHttp);
chai.should();

const app = require("./app.js");

describe("autentifikacija", () => {
  it("vraća 'true' ako su kredencijali dobri", (done) => {
    chai
      .request(app)
      .post("/autentifikacija")
      .send({ ime: "Boris", prezime: "Đukić", brojIndeksa: "07/02" })
      .end((err, res) => {
        if (err) done(err);

        expect(res).to.have.status(200);
        expect(res).to.have.cookie("connect.sid");
        res.body.should.be.eql(true);
        done();
      });
  });

  it("vraća 'false' ako kredencijali nisu dobri", (done) => {
    chai
      .request(app)
      .post("/autentifikacija")
      .send({ ime: "boro", prezime: "djuka", brojIndeksa: "01/01" })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);
        expect(res).not.to.have.cookie("connect.sid");
        res.body.should.be.eql(false);
        done();
      });
  });
});

describe("neautorizovan pristup", () => {
  it("pregled predmeti koje student nije položio nije dozvoljen neatorizovanim korisnicima", (done) => {
    chai
      .request(app)
      .get("/predmeti_koje_ne_polozih ")
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(401);
        done();
      });
  });

  it("pregled ispitnih rokovi za predmet nije dozvoljen neatorizovanim korisnicima", (done) => {
    chai
      .request(app)
      .get("/rokovi_za_predmet?predmet_id=10002")
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(401);
        done();
      });
  });

  it("prijava ispita nije dozvoljena neatorizovanim korisnicima", (done) => {
    chai
      .request(app)
      .post("/prijavi")
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(401);
        done();
      });
  });
});

var agent = chai.request.agent(app);
describe("autorizovan pristup", () => {
  it("uredno se prikazuju predmeti koje student nije položio", (done) => {
    agent
      .post("/autentifikacija")
      .send({ ime: "Boris", prezime: "Đukić", brojIndeksa: "07/02" })
      .then((res1) => {
        expect(res1).to.have.cookie("connect.sid");

        agent
          .get("/predmeti_koje_ne_polozih")
          .then((res2) => {
            expect(res2).to.have.status(200);
            res2.body.should.be.eql(testData.godine);
            done();
          })
          .catch(done);
      })
      .catch(done);
  });

  it("uredno se prikazuju rokovi za predmet", (done) => {
    agent
      .post("/autentifikacija")
      .send({ ime: "Boris", prezime: "Đukić", brojIndeksa: "07/02" })
      .then((res1) => {
        expect(res1).to.have.cookie("connect.sid");

        agent
          .get("/rokovi_za_predmet?predmet_id=10002")
          .then((res2) => {
            expect(res2).to.have.status(200);
            res2.body.should.be.eql(testData.rokovi);
            done();
          })
          .catch(done);
      })
      .catch(done);
  });

  it("radi prijava ispita", (done) => {
    agent
      .post("/autentifikacija")
      .send({ ime: "Boris", prezime: "Đukić", brojIndeksa: "07/02" })
      .then((res1) => {
        expect(res1).to.have.cookie("connect.sid");

        agent
          .post("/prijavi")
          .send({ termin_id: 11 })
          .then((res2) => {
            expect(res2).to.have.status(200);
            res2.text.should.be.eql("OK");
            done();
          })
          .catch(done);
      })
      .catch(done);
  });
});

after(function () {
  agent.close();
});
