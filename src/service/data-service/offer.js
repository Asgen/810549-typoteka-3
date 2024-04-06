'use strict';

const Aliase = require(`../models/aliase`);

class OfferService {
  constructor(sequelize) {
    this._Offer = sequelize.models.Offer;
    this._Comment = sequelize.models.Comment;
    this._Category = sequelize.models.Category;
  }

  async create(offerData) {
    const offer = await this._Offer.create(offerData);
    await offer.addCategories(offerData.categories);
    return offer.get();
  }

  async drop(id) {
    const deletedRows = await this._Offer.destroy({
      where: {id}
    });
    return !!deletedRows;
  }

  findOne(id) {
    return this._Offer.findByPk(id, {include: [Aliase.CATEGORIES]});
  }

  async findAll(needComments) {
    const include = [Aliase.CATEGORIES];

    if (needComments) {
      include.push(Aliase.COMMENTS);
    }

    const offers = await this._Offer.findAll({
      include,
      order: [
        [`createdAt`, `DESC`]
      ]
    });

    return offers.map((item) => item.get());
  }

  async update(id, offer) {
    const [affectedRows] = await this._Offer.update(offer, {
      where: {id}
    });
    return !!affectedRows;
  }

  async findLimit({limit, withComments}) {
    if (!withComments) {
      const options = {
        limit,
        include: [
          Aliase.CATEGORIES
        ],
        order: [
          [`createdAt`, `DESC`]
        ]
      };

      return await this._Offer.findAll(options);
    }

    const options = {
      subQuery: false,
      attributes: {
        include: [
          [this._sequelize.fn(`COUNT`, this._sequelize.col(`comments.id`)), `commentsCount`]
        ]
      },
      include: [
        {
          model: this._Comment,
          as: Aliase.COMMENTS,
          attributes: [],
        },
        {
          model: this._Category,
          as: Aliase.CATEGORIES,
          attributes: [`id`, `name`]
        }
      ],
      group: [
        `Offer.id`,
        `categories.id`,
        `categories->OfferCategory.OfferId`,
        `categories->OfferCategory.CategoryId`
      ],
      order: [
        [this._sequelize.fn(`COUNT`, this._sequelize.col(`comments.id`)), `DESC`]
      ]
    };

    let offers = await this._Offer.findAll(options);

    offers = offers
      .map((offer) => offer.get())
      .filter((offer) => offer.commentsCount > 0);

    return offers.slice(0, limit);
  }
}

module.exports = OfferService;
