'use strict';

class CommentService {
  constructor(sequelize) {
    this._Offer = sequelize.models.Offer;
    this._Comment = sequelize.models.Comment;
  }

  async create(offerId, comment) {
    const offer = await this._Offer.findByPk(offerId);
    return offer.createComment(comment);
  }

  create(offerId, comment) {
    return this._Comment.create({
      offerId,
      ...comment
    });
  }

  async drop(id) {
    const deletedRows = this._Comment.destroy({
      where: {id}
    });
    return !!deletedRows;
  }

  findAll(offerId) {
    return this._Comment.findAll({
      where: {offerId},
      raw: true
    });
  }
}


module.exports = CommentService;
