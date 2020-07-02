const express = require('express');
const cors = require('cors');
const connection = require('./connection');
const bodyParser = require('body-parser');
const pizzaRouter = require('./routers/pizza-router')(connection);

const app = express();
const PORT = process.env.PORT || 3030;


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', pizzaRouter);

app.get('/', (req, res) => {
    return res.json({ version: "1.0.0" });
});

app.server = app.listen(PORT, (req, res) => {
    console.log(`Server Running in Port ${PORT} ....`);
})

module.exports = app;