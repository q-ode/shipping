const app = require('../../../config/app'),
  chai = require('chai'),
  chaiHttp = require('chai-http');

chai.use(chaiHttp);

const expect = chai.expect;

describe('Orders', () => {
  describe('GET: /v2/customers/:id/orders', () => {
    it('Should returns orders by customer id', (done) => {
      chai.request(app)
        .get('/v2/customers/2/orders')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.length.above(0);
          done();
        });
    });

    it('Should return no orders where customer doesn\'t exist', (done) => {
      chai.request(app)
        .get('/v2/customers/30/orders')
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.message).to.equal('Customer not found');
          done();
        });
    });
  });
});
