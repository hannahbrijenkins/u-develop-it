const sqlite3 =require('sqlite3').verbose();
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = new sqlite3.Database('./db/election.db', err => {
    if (err) {
        return console.error(err.message);
    }

    console.log('Connected to the election database.');
});

app.use((req, res) => {
    res.status(404).end();
});

// db.all(`SELECT * FROM candidates`, (err, rows) => {
//     console.log(rows);
// });

// GET a single candidate
// db.get(`SELECT * FROM candidates WHERE id = 5`, (err, row) => {
//     if(err) {
//         console.log(err);
//     }
//     console.log(row);
// });

// DELETE a candidate
// db.run(`DELETE FROM candidates WHERE id =?`, 2, function(err, result) {
//     if (err) {
//         console.log(err);
//     }
//     console.log(result, this, this.changes);
// });

// Create a candidate
const sql = 'INSERT INTO candidates (id, first_name, last_name, industry_connected) VALUES (?,?,?,?)';
const params = [4, 'Charles', 'LeRoi', 1];
// ES5 function, not arrow function, to use this
db.run(sql, params, function(err, result) {
    if (err) {
        console.log(err);
    }
    console.log(result, this.lastID);
});

// Start server after DB connection
db.on('open', () => {
    app.listen(PORT, () => {
        console.log(`Server is now running on port ${PORT}`);
    });
});
