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

  describe('#deleteCustomer', () => {
    it('Should delete a customer given valid id', (done) => {
      customersFacade.deleteCustomer(2)
        .then((noOfDeletedRecords) => {
          expect(noOfDeletedRecords).to.equal(1);
          done();
        });
    });

    it('Should return and error for an invalid id', (done) => {
      customersFacade.deleteCustomer(20)
        .catch((error) => {
          expect(error).to.deep.equal(['No record deleted']);
          done();
        });
    });
  });

  describe('#getCustomersByItem', () => {
    it('Should return customers based on the order item', (done) => {
      customersFacade.getCustomersByItem('Playstation 4')
        .then((customers) => {
          expect(customers.length).to.be.above(0);
          expect(customers[0]).to.have.all.keys(
            ['id', 'firstname', 'lastname', 'dob', 'email', 'createdAt', 'updatedAt']);
          done();
        });
    });
  });
});
