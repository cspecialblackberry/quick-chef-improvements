const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      //casey and jonathan
//       host: process.env.DB_HOST,
//       dialect: 'postgres',
//       port: 5432
      
//       //charles 

//       // host: 'localhost',
//       // dialect: 'postgres',
//       // port: 5432

      //charles 
      host: 'localhost',
      dialect: 'mariadb',
      port: 3306

       //deployed 
    //   host: process.env.DB_HOST,
    //   dialect: 'postgres',
    //   port: 5432
    }

  );
}

module.exports = sequelize;
