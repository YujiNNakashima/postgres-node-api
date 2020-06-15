const { Model, DataTypes } = require('sequelize');

class Course extends Model {
  static init(sequelize) {
    super.init({
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      weeks: {
        type: DataTypes.STRING,
        allowNull:false
      },
      tuition: {
        type: DataTypes.FLOAT,
        allowNull: false,
      }
    }, {
      sequelize
    });
  }

  static associate(models) {
    this.belongsTo(models.User, {foreignKey: 'user_id', as: 'users'})
    this.belongsTo(models.Bootcamp, {foreignKey: 'bootcamp_id', as: 'bootcamps'})
  }
}

module.exports = Course;