//Imports sequelize
const Sequelize = require('sequelize');
//requires .env for security
require('dotenv').config();


//ensures that jawsdb_url is set to allow for use with a site like Heroku
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
  //if not using heroku, then it uses these default variables and values
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = sequelize;
///= added comment to push folder"