import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('todo', 'postgres', 'Xaker7654321', {
  host: 'localhost',
  dialect: 'postgres',
});

export default sequelize;
