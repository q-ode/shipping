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
});
