var express = require('express');
var router = express.Router({caseSensitive: true});
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var User = require('../models/user');


//register //
router.post('/register', function(req, res){
    if(req.body.name && req.body.password){
        var user = new User();
        user.name = req.body.name;
        console.time('bcryptHashing');
        user.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
        console.timeEnd('bcryptHashing');
        user.save(function(err, doc){
            if(err){
                return res.status(400).send(err);
            }
            return res.status(201).send(doc);
        });
    } else {
        return res.status(400).send({
            message: "Invalid credentials"
        })
    }
})

module.exports = router;