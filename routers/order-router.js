const express = require('express');
// const moment = require('moment');

module.exports = (connection) => {
    const orderRouter = express.Router();


    const findCustomerByEmail = (req, res) => {
        const { email } = req.body.customer;
        const sqlQuery = `SELECT id FROM customer WHERE email LIKE '${email}';`;

        return new Promise((resolve, reject) => {
            connection.query(sqlQuery, (err, rows, fields) => {
                if (!!err) {
                    reject(err);
                }
                resolve(rows.length === 0 ? null : rows[0].id);
            });
        })

    }

    const insertCustomer = (req, res, callback) => {
        const { firstName, lastName, phone, email } = req.body.customer;
        findCustomerByEmail(req, res).then(customerId => {
            console.log(customerId)
            if (!!customerId) {
                callback(customerId);
            }
            else {
                const sqlQuery = `INSERT INTO customer (first_name, last_name, phone, email) VALUES ('${firstName}', '${lastName}', '${phone}', '${email}');`;
                connection.query(sqlQuery, (err, rows, fields) => {
                    if (!!err) {
                        console.log(err);
                        return res.status(err.status).json(err);
                    }
                    else {
                        callback(rows.insertId);
                    }
                });
            }
        }).catch(err => {
            console.log(err);
            return res.status(err.status).json(err);
        });
        
    }

    const insertOrder = (req, res, customerId, callback) => {
        const { totalPrice, address } = req.body;
        const sqlQuery = `INSERT INTO  pizza_order (total_price, customer_id, address) VALUES ('${totalPrice}', ${customerId} , '${address}');`
        connection.query(sqlQuery, (err, rows, fields) => {
            if (!!err) {
                console.log(err);
                return res.status(err.status).json(err);
            }
            else {
                callback(rows.insertId);
            }
        });
    }

    const insertOrderDetail = (req, res, orderId, pizzaId, quantity) => {
        const sqlQuery = `INSERT INTO order_detail (order_id, pizza_id, quantity) VALUES (${orderId}, ${pizzaId}, ${quantity});`
        // may be you should try to do this query as transaction
        connection.query(sqlQuery, (err, rows, fields) => {
            if (!!err) {
                console.log(err);
                return res.status(err.status).json(err);
            }
        });
    }

    orderRouter.route('/orders')
        .post((req, res) => {
            insertCustomer(req, res, (customerId) => {
                insertOrder(req, res, customerId, async (orderId) => {
                    const { items } = req.body;
                    for (let item of items) {
                        let response = await insertOrderDetail(req, res, orderId, item.id, item.quantity);
                    }
                    return res.status(201).json({ message: "Order finished" });
                });
            })
        })


    return orderRouter;
}