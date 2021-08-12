'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    UserName: DataTypes.STRING,
    Password: DataTypes.STRING,
    UserType: DataTypes.INTEGER,
    FirstName: DataTypes.STRING,
    LastName: DataTypes.STRING,
    Email: DataTypes.STRING,
    PhoneNumber: DataTypes.STRING,
    CreationDate: DataTypes.DATE,
    LastLogin: DataTypes.DATE,
    UserImage: DataTypes.STRING,
    ActivateKey: DataTypes.STRING,
    Bio: DataTypes.STRING,
    Website: DataTypes.STRING,
    Genre: DataTypes.STRING,
    PayPalEmail: DataTypes.STRING,
    facebook: DataTypes.STRING,
    myspace: DataTypes.STRING,
    twitter: DataTypes.STRING,
    TwitterName: DataTypes.STRING,
    Instagram: DataTypes.STRING,
    Soundcloud: DataTypes.STRING,
    Reverbnation: DataTypes.STRING,
    Exclusive: DataTypes.STRING,
    ExclusiveApproved: DataTypes.STRING,
    DJStart: DataTypes.CHAR
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'tbl_user',
    timestamps: false,
  });
  return User;
};