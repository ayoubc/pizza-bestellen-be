const mysql = require('mysql');
const DB_CONFIG = {
    host: process.env.HOST || 'localhost',
    user: process.env.USER || 'root',
    password: process.env.PASSWORD || 'admin',
    database: process.env.DB || 'pizza_bestellen',
    multipleStatements: true
}
// const DB_CONFIG = {
//     host: process.env.HOST || 'remotemysql.com',
//     user: process.env.USER || 'JeuppLsVqH',
//     password: process.env.PASSWORD || 'jw9eA02MHm',
//     database: process.env.DB || 'JeuppLsVqH',
//     multipleStatements: true
// }

// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'admin'
const connection = mysql.createConnection(DB_CONFIG);
connection.connect((error) => {
    if(!!error) {
        console.log(error);
    }
    else{
        console.log('Success !!');
    }
})

module.exports = connection;