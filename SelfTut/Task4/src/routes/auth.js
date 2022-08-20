const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const router = express.Router()
const User = require('../models/User')

const Joi = require('joi');
const verifyToken = require('../middlewares/verifyToken');

const registerValidator = (data) => {
    const rule = Joi.object({
        name: Joi.string().min(6).max(225).required(),
        email: Joi.string().min(6).max(225).required().email(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,20}$')).required(),
    })

    return rule.validate(data);
}

router.post('/register', async (req, res) => {
    const {
        err
    } = registerValidator(req.body);
    if (err) return res.status(222).send(err.details[0].message);

    const checkEmailExist = await User.findOne({
        email: req.body.email
    });

    if (checkEmailExist) return res.status(422).send('Email is exist');

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);


    const user = new User({
        email: req.body.email,
        password: hashPassword
    })

    try {
        await user.save();
        await res.send(user);
    } catch (err) {
        res.status(400).send(err);
    }
})

router.post('/login', async (req, res) => {
    const user = await User.findOne({
        email: req.body.email
    });
    if (!user) return res.status(422).send('Email not found.');

    const checkPassword = await bcrypt.compare(req.body.password, user.password);

    if (!checkPassword) return res.status(422).send('Email or Password is not correct');

    const token = jwt.sign({
        _id: user._id
    }, process.env.JWT_KEY);
    // res.header('auth-token', token).send(token);
    res.cookie('authtoken', token, {
        maxAge: 60 * 60 * 24,
        httpOnly: true
    })

    return res.send(`User ${user.email} has logged in`);
})

router.get('/', verifyToken, (req, res) => {
    User.find({}).exec(function (err, users) {
        res.send(users);
    });
});


module.exports = router;