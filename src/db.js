const Sequelize = require('sequelize');
const config = require('../config/config.database');
const User = require('../src/models/User');
const Bootcamp = require('../src/models/Bootcamp');
const Course = require('../src/models/Course');

const sequelize = new Sequelize(config);

User.init(sequelize);
Bootcamp.init(sequelize);
Course.init(sequelize);

User.associate(sequelize.models);
Bootcamp.associate(sequelize.models);
Course.associate(sequelize.models);


const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

connect();

module.exports = sequelize;