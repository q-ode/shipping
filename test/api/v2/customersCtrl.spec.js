const app = require('../../../config/app'),
  chai = require('chai'),
  chaiHttp = require('chai-http');

chai.use(chaiHttp);

const expect = chai.expect;

describe('Customers', () => {
  describe('GET: /v2/customers/:id', () => {
    it('Should return customer details for a valid customer', (done) => {
      chai.request(app)
        .get('/v2/customers/1')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.all.keys(
            ['id', 'firstname', 'lastname', 'dob', 'email', 'addresses', 'createdAt', 'updatedAt']);
          done();
        });
    });

    it('Should NOT return customer details for invalid customer', (done) => {
      chai.request(app)
        .get('/v2/customers/50')
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.message).to.equal('Not found');
          done();
        });
    });
  });

  describe('PUT: /v2/customers/:id', () => {
    it('Should update a given customer', (done) => {
      chai.request(app)
        .put('/v2/customers/1')
        .send({ firstname: 'Janet' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.firstname).to.equal('Janet');
          done();
        });
    });

    it('Should return an error if customer number isn\'t provided', (done) => {
      chai.request(app)
        .put('/v2/customers')
        .send({ firstname: 'Janet' })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.message).to.equal('Not Found');
          done();
        });
    });

    it('Should respect validation rules during update', (done) => {
      chai.request(app)
        .put('/v2/customers/2')
        .send({ firstname: ' ' })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('Firstname cannot be empty');
          done();
        });
    });
  });

  describe('DELETE: /v2/customers/:id', () => {
    it('Should delete a given customer', (done) => {
      chai.request(app)
        .delete('/v2/customers/1')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });

    it('Should return error for a customer that doesn\'t exist', (done) => {
      chai.request(app)
        .delete('/v2/customers/30')
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.message).to.equal('No record deleted');
          done();
        });
    });
  });

  describe('GET: /v2/customers/:id/spend', () => {
    it('Should get the total spend of a customer', (done) => {
      chai.request(app)
        .get('/v2/customers/3/spend')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.length).to.be.above(0);
          done();
        });
    });

    it('Should NOT return total spend for invalid customer', (done) => {
      chai.request(app)
        .get('/v2/customers/50/spend')
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.message).to.equal('Customer not found');
          done();
        });
    });
  });
});
