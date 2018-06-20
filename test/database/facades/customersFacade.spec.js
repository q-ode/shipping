const chai = require('chai');
const expect = chai.expect;

const customersFacade = require('../../../database/facades/customerFacade');

describe('Customers Facade', () => {
  describe('#getCustomer', () => {
    it('Should return correct customer for a given id', (done) => {
      customersFacade.getCustomer(1)
        .then((customer) => {
          expect(customer.firstname).to.equal('Peter');
          done();
        });
    });

    it('Should return correct customer addresses along with customer', (done) => {
      customersFacade.getCustomer(1)
        .then((customer) => {
          expect(customer.address).to.not.be.null;
          done();
        });
    });
  });

  describe('#updateCustomer', () => {
    it('Should update a customer given valid parameters', (done) => {
      const newValues = {
        firstname: 'Toruk',
        lastname: 'Mactao',
        email: 'jsmith@hotmail.com',
        dob: '1994-03-21',
      };

      customersFacade.updateCustomer(1, newValues)
        .then((customer) => {
          expect(customer.firstname).to.equal(newValues.firstname);
          done();
        });
    });

    it('Should NOT update a customer that doesn\'t exist', (done) => {
      const newValues = {
        firstname: 'Toruk',
        lastname: 'Mactao',
        email: 'jsmith@hotmail.com',
        dob: '1994-03-21',
      };

      customersFacade.updateCustomer(30, newValues)
        .catch((errors) => {
          expect(errors).to.deep.equal(['No records updated']);
          done();
        });
    });
  });
});
