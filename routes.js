const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const publicationController = require('./controllers/publicationController');


router.use(homeController);//everythin to pass from here, to include this in url /
router.use('/auth', authController);
router.use('/publications', publicationController);

module.exports = router;