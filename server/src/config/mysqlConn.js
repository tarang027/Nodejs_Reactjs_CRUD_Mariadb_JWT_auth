const mysql = require('mysql');


// const mysqlConnection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'test',
//     multipleStatements: true
// });

// mysqlConnection.connect((err) => {
//     if (!err)
//         console.log('Connection Established Successfully');
//     else
//         console.log('Connection Failed!' + JSON.stringify(err, undefined, 2));
// });

const mariadb = require('mariadb');
const pool = mariadb.createPool({ host: "127.0.0.1", user: "root", password: "omtec12#", database: 'mern_stack_auth' });

const getPool = async () => {
    return await pool.getConnection();
}

pool.getConnection((err) => {
    if (!err)
        console.log('Connection Established Successfully');
    else
        console.log('Connection Failed!' + JSON.stringify(err, undefined, 2));
});

module.exports = {
    // mysqlConnection: getPool
    mysqlConnection: pool
}