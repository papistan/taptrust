const Coins = require('../models').Coins;
const Reviews = require('../models').Reviews;

module.exports = {
  create(req, res) {
    return Coins
      .create({
        name: req.body.name,
        category: req.body.category,
        description: req.body.description,
        symbol: req.body.symbol,
        website: req.body.website,
        founders: req.body.founders,
      })
      .then(coins => res.status(201).send(coins))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
  return Coins
    .findAll({
      include: [{
        model: Reviews,
      }],
    })
    .then(coins => res.status(200).send(coins))
    .catch(error => res.status(400).send(error));
  },

  retrieve(req, res) {
  return Coins
    .findById(req.params.coinsId, {
      include: [{
        model: Reviews,
      }],
    })
    .then(coins => {
      if (!coins) {
        return res.status(404).send({
          message: 'Coin Not Found',
        });
      }
      return res.status(200).send(coins);
    })
    .catch(error => res.status(400).send(error));
  },

  update(req, res) {
  return Coins
    .findById(req.params.coinsId, {
      include: [{
        model: Reviews,
      }],
    })
    .then(coins => {
      if (!coins) {
        return res.status(404).send({
          message: 'Coin Not Found',
        });
      }
      return coins
        .update(req.body, { 
          fields: Object.keys(req.body),
        })
        .then(() => res.status(200).send(coins))  // Send back the updated values.
        .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
  },

  destroy(req, res) {
  return Coins
    .findById(req.params.coinsId)
    .then(coins => {
      if (!coins) {
        return res.status(400).send({
          message: 'Coin Not Found',
        });
      }
      return coins
        .destroy()
        .then(() => res.status(204).send())
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
  },

};