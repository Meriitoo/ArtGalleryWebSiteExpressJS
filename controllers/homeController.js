const router = require('express').Router();

const publicationService = require('../services/publicationService');
const userService = require('../services/userService');

router.get('/', async (req, res) => {
    const publicationsResult = await publicationService.getAll().lean();

    const publications = publicationsResult.map(x => ({ ...x, shareCount: x.usersShared.length }));

    res.render('home', { publications }); //by default folder home with index finding it 
});

router.get('/profile', async (req, res) => {
    const user = await userService.getOne(req.user._id).populate('publications').populate('shares').lean();

    const publicationTitles = user.publications.map(x=> x.title).join(', ');
    const sharedTitles = user.shares.map(x => x.title).join(', ');

    // const userPublication = Publication.find({author: user._id}); //slow version, to do from create

    res.render('home/profile', { ...user, publicationTitles, sharedTitles });
});


module.exports = router; 