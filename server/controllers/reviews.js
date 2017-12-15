const Reviews = require('../models').Reviews;
const Tokens = require('../models').Tokens;

//calculates Review's overall_score from other score values
const Overall = (data) => {
  const sum = parseInt(data.score_transparency) + parseInt(data.score_governance) + parseInt(data.score_legal) + parseInt(data.score_functionality);
  const avg = sum / 4;
  return Math.round(avg);
};

//WORKING ON GETTING TOKEN OVERALL SCORES TO BE AVERAGE OF ALL REVIEWS
/*const tokenOverall = (data) => {
  return Reviews
  .sum('score_transparency', { where: { tokenId: data.tokenId }})
  .then(sum => {
  return sum;
  })
}; */
//Then divide sum() by count(). Not getting this to work yet.


module.exports = {
  //create new review
  create(req, res, next) {
    return Reviews
      .create({
        name: req.body.name,
        review: req.body.review,
        url: req.body.url,
        score_overall: Overall(req.body),
        score_transparency: req.body.score_transparency,
        score_governance: req.body.score_governance,
        score_legal: req.body.score_legal,
        score_functionality: req.body.score_functionality,
        tokenId: req.params.tokenId,
      })
      //then update token with new scores
        .then(reviews => {
          return Tokens
          .findById(req.params.tokenId)
          .then(tokens => {
            return tokens
            .update({
              score_overall: reviews.score_overall,
              score_transparency: reviews.score_transparency,
              score_governance: reviews.score_governance,
              score_legal: reviews.score_legal,
              score_functionality: reviews.score_functionality,
            })
            .then(tokens => res.status(200).send(tokens))
            .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
  },

  list(req, res) {
  return Reviews
    .findAll({
      where: {
        tokenId: req.params.tokenId,
      }
    })
    .then(review => res.status(200).send(review))
    .catch(error => res.status(400).send(error));
  },

  retrieve(req, res) {
  return Reviews
    .findById(req.params.reviewId)
    .then(review => res.status(200).send(review))
    .catch(error => res.status(400).send(error));
  },

  update(req, res) {s
  return Reviews
    .findById(req.params.reviewId)
    .then(review => {
      if (!review) {
        return res.status(404).send({
          message: 'Review Not Found',
        });
      }

      return reviews
        //update only changed values to db, keep others the same
        .update(req.body, { fields: Object.keys(req.body) })
        .then(updatedReview => {
            return updatedReview
              //update overall_score based on new values
              .update({ score_overall: Overall(review) })
              //send updated db with new overall_score
              .then(sendUpdate => res.status(200).send(sendUpdate))
              .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
  },

  destroy(req, res) {
    return Reviews
      .find({
          where: {
            id: req.params.reviewId,
            tokenId: req.params.tokenId,
          },
        })
      .then(review => {
        if (!review) {
          return res.status(404).send({
            message: 'Review Not Found',
          });
        }

        return review
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
    },

};