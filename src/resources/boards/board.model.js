const { sequelize } = require('../../utils/mysql.database');

const BOARD_MODEL_NAME = 'board';

const { DataTypes, Model } = require('sequelize');
const Column = require('./columns/column.model');

class Board extends Model {}

const boardSchema = {
  id: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  }
};

Board.init(boardSchema, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: BOARD_MODEL_NAME // We need to choose the model name
});

Board.hasMany(Column, {
  foreignKey: 'boardId',
  onDelete: 'cascade',
  onUpdate: 'cascade'
});

module.exports = {
  model: Board,
  schema: boardSchema
};
