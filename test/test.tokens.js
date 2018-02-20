const sequelize = require('sequelize');
const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../app');
const { Tokens } = require('../server/models');

const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

function cleanup() {
  return Tokens.destroy({ truncate: true, cascade: true });
}

function createToken() {
  let token = {
    id: 1,
    name: 'TestCoin',
    category: 'General',
    description: 'Here is the test description of TestCoin',
    age: '1 Year',
    symbol: 'TTC',
    website: 'www.test.test',
    founders: 'Mr Test, Mrs Test',
  };
  return Tokens.create(token);
}

describe('Tokens', () => {
  beforeEach(done => {
    cleanup();
    createToken();
    done();
  });

  describe('/GET tokens', () => {
    it('it should GET all the tokens and reviews', done => {
      chai
        .request(app)
        .get('/api/tokens')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });
  describe('/POST token', () => {
    it('it should POST a token ', done => {
      let token = {
        name: 'TwoCoin',
        category: 'General',
        description: 'Here is the test description of TwoCoin',
        age: '2 Year',
        symbol: '2TC',
        website: 'www.2.test',
        founders: 'Mr 2, Mrs 2',
      };
      chai
        .request(app)
        .post('/api/tokens')
        .send(token)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('/GET/:name token', () => {
    it('it should GET a token by the given name', done => {
      chai
        .request(app)
        .get('/api/tokens/TestCoin')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('/PUT/:tokenId token', () => {
    it('it should UPDATE a token given the id', done => {
      chai
        .request(app)
        .put('/api/tokens/1')
        .send({
          name: 'NewTestCoin',
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  /*describe('/DELETE/:id tokens', () => {
      it('it should DELETE a token given the id', (done) => {
                chai.request(app)
                .delete('/api/tokens/1')
                .end((err, res) => {
                    res.should.have.status(204);
                    res.body.should.be.a('object');
                  done();
                });
          });
      });*/
});
