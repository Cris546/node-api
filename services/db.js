const mysql = require('mysql');
const config = require('../config');

var pool = mysql.createPool({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database
})


// pool.on('acquire', function(connection) {
//     console.log('Connection %d acquired', connection.threadID);
// });

// pool.on('connection', function(connection){
//     console.log('Connection %d being used', connection.threadID);
// })

// pool.on('error', err => {
//     console.log("Error has been detected in pool: " + err.message);
// });

module.exports = pool;

