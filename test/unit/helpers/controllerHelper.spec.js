const chai = require('chai');
const expect = chai.expect;

const validateParameter =
  require('../../../helpers/controllerHelper').validateParameter;
const formatMessages =
  require('../../../helpers/controllerHelper').formatMessages;

describe('Controller Helper', () => {
  describe('#validateParameter', () => {
    it('Should return true for valid value', () => {
      expect(validateParameter('free')).to.be.true;
    });

    it('Should return false for null value', () => {
      expect(validateParameter(null)).to.be.false;
    });

    it('Should return false for empty value', () => {
      expect(validateParameter('  ')).to.be.false;
    });
  });

  describe('#formatMessages', () => {
    it('Should return a single message string for an array with one element',
      () => {
        expect(formatMessages(['free'])).to.equal('free');
      });

    it('Should return a comma delimited message string with an ampersand',
      () => {
        expect(formatMessages(['free', 'me', 'now'])).to.equal('free, me & now');
      });

    it('Should the same input for an object that isn\'t a valid input', () => {
      expect(formatMessages(324)).to.equal(324);
    });
  });
});
