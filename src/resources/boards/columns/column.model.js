const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../../utils/mysql.database');
// const Board = require('../board.model');

const COLUMN_MODEL_NAME = 'column';

class Column extends Model {}

const columnSchema = {
  id: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  order: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
};

Column.init(columnSchema, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: COLUMN_MODEL_NAME // We need to choose the model name
});

module.exports = {
  model: Column,
  schema: columnSchema
};
