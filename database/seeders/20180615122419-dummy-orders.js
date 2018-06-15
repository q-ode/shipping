module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('orders', [
      {
        customerName: 'Peter Lustig',
        customerAddress: 'Steindamm 80',
        item: 'Macbook',
        price: 1700,
        currency: 'EUR',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        customerName: 'John Smith',
        customerAddress: 'Reeperbahn 153 ',
        item: 'Macbook',
        price: 1700,
        currency: 'EUR',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        customerName: 'Ted Justice',
        customerAddress: 'Lagerstrasse 11 ',
        item: 'Book "Guide to Hamburg"',
        price: '20',
        currency: 'EUR',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        customerName: 'Peter Lustig',
        customerAddress: 'Steindamm 80',
        item: 'Book "Cooking 101"',
        price: 10,
        currency: 'EUR',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        customerName: 'Peter Lustig',
        customerAddress: 'Steindamm 80',
        item: 'Inline Skates',
        price: 75,
        currency: 'EUR',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        customerName: 'Ted Justice',
        customerAddress: 'Lagerstrasse 11',
        item: 'Playstation 4',
        price: 75,
        currency: 'EUR',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        customerName: 'John Smith',
        customerAddress: 'Reeperbahn 153',
        item: 'Flux compensator',
        price: 2000,
        currency: 'USD',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        customerName: 'Peter Lustig',
        customerAddress: 'Steindamm 80',
        item: 'Inline Skates',
        price: 75,
        currency: 'EUR',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('orders', null, {});
  }
};
