const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./ecommerceDB.db');

db.serialize(() => {
    
    db.run(`
        CREATE TABLE IF NOT EXISTS user (
            id VARCHAR(255) PRIMARY KEY,
            name TEXT NOT NULL,
            password TEXT NOT NULL,
            userRole TEXT NOT NULL
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS product (
            id VARCHAR(255) PRIMARY KEY,
            name TEXT NOT NULL,
            unitPrice REAL NOT NULL,
            qtd INTEGER NOT NULL,
            width REAL NOT NULL,
            height REAL NOT NULL,
            length REAL NOT NULL,
            color TEXT NOT NULL,
            weight REAL NOT NULL,
            material TEXT NOT NULL
        )
    `);
});


function exec(query, params = []) {
    return new Promise((resolve, reject) => {
        db.all(query, params, (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}

module.exports = {
    exec
};