import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class Todo extends Model {
  public id!: number;
  public text!: string;
  public done!: boolean;
}

Todo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: 'todos',
  },
);

export default Todo;
