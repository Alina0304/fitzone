const mysql=require('mysql');

const  db= mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'system',
    database: 'fit',
});
module.exports=db;