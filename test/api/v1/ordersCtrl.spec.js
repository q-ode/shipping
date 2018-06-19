const app = require('../../../config/app'),
  chai = require('chai'),
  chaiHttp = require('chai-http');

chai.use(chaiHttp);

const expect = chai.expect;

describe('Orders', () => {
  describe('POST: /v1/orders', () => {
    it('Should create an order with valid parameters are provided', (done) => {
      chai.request(app)
        .post('/v1/orders')
        .send({
          customerName: 'Jane Doe',
          customerAddress: '80 John Street, Glasgow',
          item: 'Spagetti Cabonara',
          price: '50',
          currency: 'USD'
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.all.keys(
            ['id', 'customerName', 'customerAddress', 'item', 'price',
              'currency', 'createdAt', 'updatedAt']
          );
          done();
        });
    });

    it('Should NOT create an order with missing required fields', (done) => {
      chai.request(app)
        .post('/v1/orders')
        .send({
          customerName: 'Jane Doe',
          customerAddress: '80 John Street, Glasgow',
          item: 'Spagetti Cabonara',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('orders.price cannot be null & orders.currency cannot be null');
          done();
        });
    });

    it('Should NOT create an order with empty required fields', (done) => {
      chai.request(app)
        .post('/v1/orders')
        .send({
          customerName: '',
          customerAddress: '80 John Street, Glasgow',
          item: '  ',
          price: '50',
          currency: 'USD'
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('Customer name cannot be empty & Item name cannot be empty');
          done();
        });
    });
  });

  describe('PUT: /v1/orders/:id', () => {
    it('Should update a given order', (done) => {
      chai.request(app)
        .put('/v1/orders/1')
        .send({
          customerName: 'Jane Doe'
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.customerName).to.equal('Jane Doe');
          done();
        });
    });

    it('Should return an error if order number isn\'t provided', (done) => {
      chai.request(app)
        .put('/v1/orders')
        .send({
          customerName: 'Jane Doe'
        })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.message).to.equal('Not Found');
          done();
        });
    });

    it('Should respect validation rules during update', (done) => {
      chai.request(app)
        .put('/v1/orders/1')
        .send({
          customerName: ' ',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('Customer name cannot be empty');
          done();
        });
    });
  });

  describe('DELETE: /v1/orders/:id', () => {
    it('Should delete a given order', (done) => {
      chai.request(app)
        .delete('/v1/orders/5')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });

    it('Should return error for an order that doesn\'t exist', (done) => {
      chai.request(app)
        .delete('/v1/orders/500')
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.message).to.equal('No record deleted');
          done();
        });
    });
  });

  describe('GET: /v1/customers/:name/orders', () => {
    it('Should returns orders by customer name', (done) => {
      chai.request(app)
        .get('/v1/customers/John Smith/orders')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.length.above(0);
          done();
        });
    });

    it('Should return no orders where customer doesn\'t exist', (done) => {
      chai.request(app)
        .get('/v1/customers/Harry Potter/orders')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.length).to.equal(0);
          done();
        });
    });
  });

  describe('GET: /v1/addresses/:address/orders', () => {
    it('Should returns orders by address', (done) => {
      chai.request(app)
        .get('/v1/addresses/Steindamm 80/orders')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.length.above(0);
          done();
        });
    });

    it('Should return no orders where address doesn\'t exist', (done) => {
      chai.request(app)
        .get('/v1/addresses/House 23 Nigeria Road/orders')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.length).to.equal(0);
          done();
        });
    });
  });

  describe('GET: /v1/orders/items', () => {
    it('Should order items and their frequency/count', (done) => {
      chai.request(app)
        .get('/v1/orders/items')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body[0]).to.have.property('item');
          expect(res.body[0]).to.have.property('count');
          done();
        });
    });
  });
});
