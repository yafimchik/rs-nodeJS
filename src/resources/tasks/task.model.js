const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../utils/mysql.database');
const Board = require('../boards/board.model');
const Column = require('../boards/columns/column.model');
const User = require('../users/user.model');

const TASK_MODEL_NAME = 'task';

class Task extends Model {}

const taskSchema = {
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
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  order: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  userId: {
    allowNull: true,
    type: DataTypes.UUID,
    references: {
      // This is a reference to another model
      model: User,
      // This is the column name of the referenced model
      key: 'id'
    }
  },
  columnId: {
    allowNull: true,
    type: DataTypes.UUID,
    references: {
      // This is a reference to another model
      model: Column,
      // This is the column name of the referenced model
      key: 'id'
    }
  },
  boardId: {
    allowNull: false,
    type: DataTypes.UUID,
    references: {
      // This is a reference to another model
      model: Board,
      // This is the column name of the referenced model
      key: 'id'
    }
  }
};

Task.init(taskSchema, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: TASK_MODEL_NAME // We need to choose the model name
});

module.exports = {
  model: Task,
  schema: taskSchema
};
