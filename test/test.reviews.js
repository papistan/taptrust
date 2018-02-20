const sequelize = require('sequelize');
const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../app');
const { Reviews } = require('../server/models');

const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

function cleanup() {
  return Reviews.destroy({ truncate: true, cascade: true });
}

function createReview() {
  let review = {
    id: 1,
    name: 'Test Reviewer',
    review: 'Here is a test review. It is only a test, and is just testing.',
    url: 'test.com',
    score_overall: 90,
    score_transparency: 100,
    score_governance: 100,
    score_legal: 80,
    score_functionality: 80,
    tokenId: 1,
  };
  return Reviews.create(review);
}

describe('Reviews', () => {
  beforeEach(done => {
    cleanup();
    createReview();
    done();
  });

  describe('/GET reviews', () => {
    it('it should GET all the reviews with a given tokenId', done => {
      chai
        .request(app)
        .get('/api/tokens/1/reviews')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });

  describe('/POST review', () => {
    it('it should POST a review with a given tokenId and update aggregate token scores', done => {
      let review = {
        name: 'Posted Test Reviewer',
        review:
          'Here is a posted test review. It is only a test, and is just testing.',
        url: 'posttest.com',
        score_transparency: 50,
        score_governance: 50,
        score_legal: 60,
        score_functionality: 60,
        tokenId: 1,
      };
      chai
        .request(app)
        .post('/api/tokens/1/reviews')
        .send(review)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('/GET/:id review', () => {
    it('it should GET a review by a given reviewsId', done => {
      chai
        .request(app)
        .get('/api/reviews/1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('/PUT/:reviewsId token', () => {
    it('it should UPDATE a token given the id', done => {
      chai
        .request(app)
        .put('/api/reviews/1')
        .send({
          name: 'New Test',
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('/DELETE/:id review', () => {
    it('it should DELETE a review given the id', done => {
      chai
        .request(app)
        .delete('/api/tokens/1/reviews/1')
        .end((err, res) => {
          res.should.have.status(204);
          res.body.should.be.a('object');
          done();
        });
    });
  });
});
