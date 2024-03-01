const Publication = require('../models/Publication');

exports.getAll = () => Publication.find();
exports.getOne = (publicationId) => Publication.findById(publicationId);
exports.getOneDetailed = (publicationId) => Publication.findById(publicationId).populate('author'); //to get the author from model
exports.create = (publicationData) => Publication.create(publicationData);
exports.update = (publicationId, publicationData) => Publication.updateOne({_id: publicationId}, {$set: publicationData}, {runValidators: true});
exports.delete = (publicationId) => Publication.deleteOne({_id: publicationId});

