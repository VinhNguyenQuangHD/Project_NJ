const express = require("express");
const session = require('express-session');

const flash = require("express-flash");

const { check, validationResult } = require('express-validator');
const app = express();
const router = express.Router();

app.use(flash());

router.post('/register',
    [
        check('name')
            .not()
            .isEmpty()
            .withMessage('Name is required'),
        check('email', 'Email is required')
            .isEmail(),
        check('password', 'Password is requried')
            .isLength({ min: 6 })
            .custom((val, { req, loc, path }) => {
                if(val.isLength() < 6){
                    req.flash("error", "Password is too short");
                    res.redirect("/register");
                }
                else if (val !== req.body.repassword) {
                    req.flash("error", "Password is not match");
                    res.redirect("/register");
                } else {
                    return value;
                }
            }),
    ], (req, res) => {
        var errors = validationResult(req).array();
        if (errors) {
            req.session.errors = errors;
            req.session.success = false;
            res.redirect('/register');
        } else {
            req.session.success = true;
            res.redirect('/register');
        }
    });

router.get('/', function (req, res) {
    res.render('register', {
        success: req.session.success,
        errors: req.session.errors
    });
    req.session.errors = null;
});

module.exports = router;