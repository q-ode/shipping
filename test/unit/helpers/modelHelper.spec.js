const chai = require('chai');
const expect = chai.expect;

const getError =
  require('../../../helpers/modelHelper').getError;

const sequelizeError = {
  "name": "SequelizeValidationError",
  "errors": [
    {
      "message": "Customer name cannot be empty",
      "type": "Validation error",
      "path": "customerName",
      "value": "",
      "origin": "FUNCTION",
      "instance": {
        "id": null,
        "customerName": "",
        "customerAddress": "fddf",
        "item": "dfdf",
        "price": "34",
        "currency": "dffd",
        "updatedAt": "2018-06-16T10:49:51.683Z",
        "createdAt": "2018-06-16T10:49:51.683Z"
      },
      "validatorKey": "checkEmpty",
      "validatorName": null,
      "validatorArgs": [],
      "__raw": {}
    },
    {
      "message": "Currency given not supported",
      "type": "Validation error",
      "path": "currency",
      "value": "dffd",
      "origin": "FUNCTION",
      "instance": {
        "id": null,
        "customerName": "",
        "customerAddress": "fddf",
        "item": "dfdf",
        "price": "34",
        "currency": "dffd",
        "updatedAt": "2018-06-16T10:49:51.683Z",
        "createdAt": "2018-06-16T10:49:51.683Z"
      },
      "validatorKey": "isIn",
      "validatorName": "isIn",
      "validatorArgs": [
        [
          "EUR",
          "USD"
        ]
      ],
      "__raw": {
        "validatorName": "isIn",
        "validatorArgs": [
          [
            "EUR",
            "USD"
          ]
        ]
      }
    }
  ]
};

describe('Model Helper', () => {
  describe('#getError', () => {
    it('Should an array of the error messages from the sequelize error object',
      () => {
        expect(getError(sequelizeError)).to.deep.equal(
          ['Customer name cannot be empty', 'Currency given not supported']
        );
      });

    it('Should return an empty array when error message doesn\'t exist',
      () => {
        expect(getError({})).to.deep.equal([]);
      });
  });
});
