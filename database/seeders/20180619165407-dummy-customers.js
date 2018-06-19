module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('customers', [
      {
        firstname: 'Peter',
        lastname: 'Lustig',
        email: 'peter.lustig@gmail.com',
        dob: '1991-10-06',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstname: 'John',
        lastname: 'Smith',
        email: 'jsmith@hotmail.com',
        dob: '1993-03-21',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstname: 'Ted',
        lastname: 'Justice',
        email: 't.j@ymail.com',
        dob: '1991-11-03',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('customers', null, {});
  },
};
