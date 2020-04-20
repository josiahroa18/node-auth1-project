const express = require('express');
const bcrypt = require('bcryptjs');

const router = express.Router();

const User = require('../users/userModel');

router.post('/register', (req, res) => {
    const rounds = process.env.HASH_ROUNDS || 8;
    const hash = bcrypt.hashSync(req.body.password, rounds);
    req.body.password = hash;

    User.addUser(req.body)
    .then(newUser => {
        res.status(201).json(newUser);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

router.post('/login', (req, res) => {
    User.getBy(req.body.username)
    .then(found => {
        if(found && bcrypt.compareSync(req.body.password, found.password)){
            req.session.loggedIn = true;
            res.status(201).json({ message: 'Welcome!' })
        }else{
            res.status(404).json({ message: 'You are not registered or invalid credentials' })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router;