const chai = require('chai');
const expect = chai.expect;

const validateParameter =
  require('../../../helpers/controller').validateParameter;

describe('Controller Helper', () => {
  describe('#validateParameter', () => {
    it('Should return true for valid value', ()=> {
      expect(validateParameter('free')).to.be.true;
    });

    it('Should return false for null value', ()=> {
      expect(validateParameter(null)).to.be.false;
    });

    it('Should return false for empty value', ()=> {
      expect(validateParameter('  ')).to.be.false;
    });
  });
});
