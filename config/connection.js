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
<<<<<<< HEAD
=======
      host: process.env.DB_HOST,
      dialect: 'postgres',
      port: 5432
      
      //charles 
>>>>>>> 78b838f891c913c4affc41ddbf1a234e4a478489
      // host: 'localhost',
      // dialect: 'postgres',
      // port: 5432

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
