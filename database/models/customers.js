module.exports = (sequelize, DataTypes) => {
  const customers = sequelize.define('customers', {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        checkEmpty: (value) => {
          if (value.trim() === '') {
            throw new Error('Firstname cannot be empty');
          }
        },
      },
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        checkEmpty: (value) => {
          if (value.trim() === '') {
            throw new Error('Lastname cannot be empty');
          }
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        checkEmpty: (value) => {
          if (value.trim() === '') {
            throw new Error('Email address cannot be empty');
          }
        },
        isEmail: true,
      },
    },
    dob: {
      type: DataTypes.DATEONLY,
      validate: {
        isDate: true,
      },
    },
  }, {
    paranoid: true,
  });
  customers.associate = function(models) {
    customers.hasMany(models.customerAddresses, { as: 'addresses' });
  };
  return customers;
};
