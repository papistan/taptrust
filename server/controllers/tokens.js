const Tokens = require('../models').Tokens;
const Reviews = require('../models').Reviews;
const sequelize = require('sequelize');

module.exports = {
  create(req, res) {
    return Tokens
      .create({
        name: req.body.name,
        category: req.body.category,
        description: req.body.description,
        age: req.body.age,
        symbol: req.body.symbol,
        website: req.body.website,
        founders: req.body.founders,
      })
      .then(token => res.status(201).send("Token successfully posted"))
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

  //CHANGED TO BE FOUND BY NAME INSTEAD. KEEP???
  retrieve(req, res) {
  return Tokens
    .find({
          where: {
            name: req.params.name,
          },
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


  //Updates aggregate token scores for each score parameters each time a new review is posted.
  updateAgg(req, res) {
    return Reviews
    .findAll({
          where: {
            tokenId: req.params.tokenId,
          },
          attributes: [
              [ sequelize.fn('AVG', sequelize.col('score_overall')), 'overall_agg' ],
              [ sequelize.fn('AVG', sequelize.col('score_transparency')), 'transparency_agg' ],
              [ sequelize.fn('AVG', sequelize.col('score_governance')), 'governance_agg' ],
              [ sequelize.fn('AVG', sequelize.col('score_legal')), 'legal_agg' ],
              [ sequelize.fn('AVG', sequelize.col('score_functionality')), 'functionality_agg' ],
          ],
      })
          .then(agg => {
          return Tokens
          .findById(req.params.tokenId)
          .then(tokens => {
            return tokens
            .update({
              score_overall: Math.round(agg[0].dataValues.overall_agg),
              score_transparency: Math.round(agg[0].dataValues.transparency_agg),
              score_governance: Math.round(agg[0].dataValues.governance_agg),
              score_legal: Math.round(agg[0].dataValues.legal_agg),
              score_functionality: Math.round(agg[0].dataValues.functionality_agg),
            })
            .then(token => res.status(200).send(token))
            .catch((error) => res.status(400).send(error));
          })
          .catch((error) => res.status(400).send(error));
        })
        .catch((error) => res.status(400).send(error));
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
        .then((token) => res.status(200).send(token))  // Send back the updated values.
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