const publicationService = require('../services/publicationService');


//if we have publicationId, we can use this functions

exports.preloadPublication = async (req, res, next) => {
    const publication = await publicationService.getOne(req.params.publicationId).lean();

    req.publication = publication;

    next();
}

exports.isPublicationAuthor = (req, res, next) => {
    if (req.publication.author != req.user._id) {
        //from errorHadnlerMiddleware to get errorHandler
        return next({ message: 'You are not authorized', status: 401 });
    };

    next();
}