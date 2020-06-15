const { Model, DataTypes } = require('sequelize');

class User extends Model {
  
  static init(sequelize) {
    super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        unique:true,
        validate: {
          is: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        },
        unique: {
          args: true,
          msg: 'Email address already in use!'
      }
      },
      role: {
        type: DataTypes.STRING,
        validate: {
          isIn: [['user', 'publisher']]
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      reset_password_token: {
        type: DataTypes.STRING,
        allowNull: true
      },
      reset_password_expire: {
        type: DataTypes.DATE
      }

    }, {
      sequelize
    })
  }

  static associate(models) {
    this.hasMany(models.Course, {foreignKey: 'user_id', as: 'courses'})
    this.hasMany(models.Bootcamp, {foreignKey: 'user_id', as: 'bootcamps'})
  }

}

module.exports = User;