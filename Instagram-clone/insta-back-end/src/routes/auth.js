const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../src/db/env');
const requireLogin = require('../middleware/requireLogin');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
//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
const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: "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"
    }
}))
router.post('/signup', (req, res) => {
    const { firstName, lastName, mobile, email, password, pic } = req.body
    if (!firstName || !lastName || !mobile || !email || !password) {
        return res.status(422).json({ error: `please add all the fields` })
    }
    User.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: `user already exists with this email [${email}]` })
            }
            bcrypt.hash(password, 12)
                .then(hashedpassword => {
                    const user = new User({
                        fullName: firstName + ' ' + lastName,
                        firstName,
                        lastName,
                        mobile,
                        email,
                        pic,
                        password: hashedpassword

                    })

                    user.save()

                        .then(user => {

                            transporter.sendMail({

                                to: user.email,
                                from: "no-reply@sahustheclassic.com",
                                subject: "signUp Successfull",
                                html: "<h1> Welcome to The Business</h1>"
                            })
                            res.json({ message: "Account Created successfully" })
                        })
                        .catch(error => {
                            console.log(error);
                        })
                })
        })
        .catch(error => {
            console.log(error);
        })
})


router.post('/signin', (req, res) => {
    console.log(JWT_SECRET)
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(422).json({ error: "please enter email or password" })
    }
    User.findOne({ email: email })
        .then(savedUser => {
            if (!savedUser) {
                return res.status(422).json({ error: "email or password is wrong" })
            }
            bcrypt.compare(password, savedUser.password)
                .then(doMatch => {
                    if (doMatch) {
                        //res.json({ message: `you are signed in successfully` });
                        const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
                        const { _id, email, mobile, fullName, followers, following, pic } = savedUser
                        res.json({ token, user: { _id, mobile, email, fullName, followers, following, pic } });
                    }
                    else {
                        return res.status(422).json({ error: `invalid email or password ` })
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        })
        .catch(error => {
            console.log(error);
        })
})

router.post('/reset-password', (req, res) => {
    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log(err);
        }
        const token = buffer.toString("hex")
        User.findOne({ email: req.body.email })
            .then(user => {
                if (!user) {
                    return res.status(422).json({ error: "User do not exists with that email" })
                }
                user.resetToken = token
                user.expireToken = Date.now() + 3600000
                user.save().then((result) => {
                    transporter.sendMail({
                        to: user.email,
                        from: "no-reply@sahustheclassic.com",
                        subject: "password reset",
                        html: `
                    <h1>You request for password reset</h1>
                    <h5>click in this <a href="http://localhost:3000/reset/${token}">link</a> to reset password</h5>
                    `
                    })
                    res.json({ message: "check Your email" });
                })
            })

    })
})

router.post('/new-password', (req, res) => {
    const newPassword = req.body.password
    const sentToken = req.body.token
    User.findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } })
        .then(user => {
            if (user) {
                return res.status(422).json({ error: "Try again session expired" })
            }
            bcrypt.hash(newPassword, 12).then(hashedpassword => {
                user.password = hashedpassword
                user.resetToken = undefined
                user.expireToken = undefined
                user.save().then((savedUser) => {
                    res.json({ message: "password updated success" })
                })
            })
        }).catch(err => {
            console.log(err)
        })
})
module.exports = router