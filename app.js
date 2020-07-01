const express = require('express');
const cors = require('cors');
const connection = require('./connection');


const app = express();
const PORT = process.env.PORT || 3030;



app.use(cors());

app.get('/', (req, res) => {
    connection.query('SELECT * FROM pizza', (err, rows, fields) => {
        if(!!err) {
            console.log(err);
        }
        else{
            res.status(200).send({data: rows});
        }
    });
    // return res.json({ text: "Hello World" });
});

app.server = app.listen(PORT, (req, res) => {
    console.log(`Server Running in Port ${PORT} ....`);
})

module.exports = app;