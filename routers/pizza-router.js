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
        
        // .post((req, res) => {
        //     const user = new User(req.body);
        //     user.createdAt = moment(new Date()).format('MMMM Do YYYY');
        //     // console.log(req.body);
        //     User.find({email: user.email}, (err, users) => {
        //         if (err) {
        //             return res.json(err);
        //         }
        //         // console.log(users)
        //         if(users.length != 0) return res.json({message: "Email alread in use"});

        //         user.save();
        //         return res.status(201).json({user: user});
        //     }) 
            
            
        // })
    // pizzaRouter.use('/users/:userId', (req, res, next) => {
    //     const { userId } = req.params;
    //     // console.log(userId);
    //     User.findById(userId, (err, user) => {
    //         if(err) {
    //             return res.status(500).send(err);
    //         }
    //         // console.log(user);
    //         if (user) {
    //             req.user = user;
    //             return next();
    //         }
    //         return res.sendStatus(404);
    //     })
    // })
    // pizzaRouter.route('/users/:userId')
    //     .get((req, res) => {
    //         res.json(req.user);
    //     })
    //     .patch((req, res) => {
    //         const { user } = req;
    //         if (req.body._id) {
    //             delete req.body._id;
    //         }

    //         Object.entries(req.body).forEach((item) => {
    //             const [key, value] = item;
    //             user[key] = value;
    //         });
    //         user.save();
    //         return res.json(user);
    //     })
    //     .delete((req, res) => {
    //         const { user } = req;
    //         console.log(user);
    //         req.user.remove(err => {
    //             if(err) {
    //                 return res.status(500).send(err);
    //             }
    //             return res.status(200).json({user});
    //         })
    //     })
        

    return pizzaRouter;
}