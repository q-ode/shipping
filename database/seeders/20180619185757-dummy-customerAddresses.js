module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('customerAddresses', [
      {
        customerId: 1,
        street: 'Steindamm 80',
        countryCode: 'NG',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        customerId: 2,
        street: 'Reeperbahn 153',
        countryCode: 'IS',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        customerId: 3,
        street: 'Lagerstrasse 11',
        countryCode: 'PO',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        customerId: 1,
        street: 'Etharo 245',
        countryCode: 'ME',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        customerId: 2,
        street: 'Kilimani 935',
        countryCode: 'KE',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('customerAddresses', null, {});
  },
};
