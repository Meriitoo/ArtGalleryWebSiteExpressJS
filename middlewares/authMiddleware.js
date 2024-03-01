const jwt = require('jsonwebtoken');

const { COOKIE_SESSION_NAME } = require('../constants');
const { SECRET } = require('../config/env'); //if the token is be edited, if it is not original it is modificated

//Authentication
exports.auth = async (req, res, next) => {
    const token = req.cookies[COOKIE_SESSION_NAME]; //can be guest or login, if no token is it guest, move on and next


    //if is it loged
    if (token) {
        jwt.verify(token, SECRET, ((err, decodedToken) => {
            if (err) {
                res.clearCookie(COOKIE_SESSION_NAME);

                // return next(err);
                return res.redirect('./login');
            }
   
            req.user = decodedToken;
            res.locals.user = decodedToken; //to have acces to navigation

            next();
        }));
    //else move on like guest
    } else {
        next();
    }

};

//Authorization
//router guards for user when is not login, to not have acces to change url and acces it 
exports.isAuth = (req, res, next)  => {
    if (!req.user) {
        return res.redirect('/auth/login');
    }

    next();
}

exports.isGuest = (req, res, next)  => {
    if (req.user) {
        return res.redirect('/');
    }

    next();
}