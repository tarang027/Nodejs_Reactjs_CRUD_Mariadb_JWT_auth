'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Page extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Page.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT(11)
    },
    pageName: DataTypes.STRING,
    pageLink: DataTypes.STRING,
    hide: DataTypes.BOOLEAN,
    menuText: DataTypes.STRING,
    menuTootltip: DataTypes.STRING,
    menuOrder: DataTypes.STRING,
    pageTitle: DataTypes.STRING,
    pageText: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Page',
    tableName: 'tbl_page',
    timestamps: false,
  });
  return Page;
};