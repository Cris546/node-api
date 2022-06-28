var mysql = require('mysql');

const config = {
    db: {
        host: "localhost",
        database: 'test1',
        user: "db_user",
        password: "password"
    },
    listPerPage: 10,
};
    
module.exports = config;

