const Tokens = require('../models').Tokens;
const Reviews = require('../models').Reviews;

module.exports = {
  create(req, res) {
    return Tokens
      .create({
        name: req.body.name,
        category: req.body.category,
        description: req.body.description,
        symbol: req.body.symbol,
        website: req.body.website,
        founders: req.body.founders,
      })
      .then(token => res.status(201).send(token))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
  return Tokens
    .findAll({
      include: [{
        model: Reviews,
      }],
    })
    .then(token => res.status(200).send(token))
    .catch(error => res.status(400).send(error));
  },

  retrieve(req, res) {
  return Token
    .findById(req.params.tokenId, {
      include: [{
        model: Reviews,
      }],
    })
    .then(token => {
      if (!token) {
        return res.status(404).send({
          message: 'Token Not Found',
        });
      }
      return res.status(200).send(token);
    })
    .catch(error => res.status(400).send(error));
  },

  update(req, res) {
  return Tokens
    .findById(req.params.tokenId, {
      include: [{
        model: Reviews,
      }],
    })
    .then(token => {
      if (!token) {
        return res.status(404).send({
          message: 'Token Not Found',
        });
      }
      return token
        .update(req.body, { 
          fields: Object.keys(req.body),
        })
        .then(() => res.status(200).send(token))  // Send back the updated values.
        .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
  },

  destroy(req, res) {
  return Tokens
    .findById(req.params.tokenId)
    .then(token => {
      if (!token) {
        return res.status(400).send({
          message: 'Token Not Found',
        });
      }
      return token
        .destroy()
        .then(() => res.status(204).send())
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
  },

};