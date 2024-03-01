const router = require('express').Router();

const authService = require('../services/authService');
const { COOKIE_SESSION_NAME } = require('../constants');
const { isAuth, isGuest } = require('../middlewares/authMiddleware');
//isGuest when i am login i can't access login, because i am already login,
//i can't do that --> http://localhost:3000/login, it's gonna return us in home page
const {getErrorMessage} = require('../utils/errorHelpers');

router.get('/login', isGuest, (req, res) => {
    res.render('auth/login'); //auth folder with login
});

router.post('/login', isGuest, async (req, res) => {
    const { username, password } = req.body;

    const user = await authService.login(username, password);
    const token = await authService.createToken(user);

    res.cookie(COOKIE_SESSION_NAME, token, { httpOnly: true });

    res.redirect('/');

});

router.get('/register', isGuest, (req, res) => {
    res.render('auth/register');
});

router.post('/register', isGuest, async (req, res) => {
    const { password, repeatPassword, ...userData } = req.body; //only i need the password and repeatpassword, other is in userData

    if (password !== repeatPassword) {
        return res.render('auth/register', { error: 'Password mismatch!' }); //in the same page to return the error
    }

    try {
        //Create user
        const createdUser = await authService.create({ password, ...userData });
        const token = await authService.createToken(createdUser); //when we register to go in login

        res.cookie(COOKIE_SESSION_NAME, token, { httpOnly: true });
        res.redirect('/'); //when we are register to redirect us in home page, not in login , because this is automatically happens

    } catch (error) {
        //Add mongoose error mapper
        return res.render('auth/register', { error: getErrorMessage(error) });
    }

});

//isAuth for logout, you have to login to logout :D
router.get('/logout', isAuth, (req, res) => {
    res.clearCookie(COOKIE_SESSION_NAME);
    res.redirect('/');
})

module.exports = router;