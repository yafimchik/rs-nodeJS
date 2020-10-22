const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../../utils/mysql.database');

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
  columnId: {
    allowNull: true,
    type: DataTypes.UUID
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
