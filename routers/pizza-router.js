const express = require('express');
// const moment = require('moment');

module.exports = (connection) => {
    const pizzaRouter = express.Router();

    pizzaRouter.route('/pizzas')
        .get((req, res) => {
            // const { query } = req;
            connection.query('SELECT * FROM pizza', (err, rows, fields) => {
                if(!!err) {
                    console.log(err);
                    return res.status(err.status).json(err);
                }
                return res.status(200).send({items: rows});
            });
        })

    return pizzaRouter;
}