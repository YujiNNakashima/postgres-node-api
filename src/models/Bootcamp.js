const { Model, DataTypes } = require('sequelize');

class Bootcamp extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull:false,
        validate: {
          is: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        },
        unique: {
          args: true,
          msg: "Email address already in use!",
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      careers: {
        type: DataTypes.STRING,
        allowNull: true
      },
      average_cost: {
        type: DataTypes.INTEGER,
        allowNull: true
      }, 
    }, {
      sequelize
    });
  }

  static associate(models) {
    this.belongsTo(models.User, {foreignKey: 'user_id', as: 'user'})
  }
}

module.exports = Bootcamp;