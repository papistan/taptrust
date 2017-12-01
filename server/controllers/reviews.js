const Reviews = require('../models').Reviews;
const Coins = require('../models').Coins

//calculates Review's overall_score from other score values
const Overall = (data) => {
  const sum = parseInt(data.score_transparency) + parseInt(data.score_quality) + parseInt(data.score_friendly) + parseInt(data.score_legal) + parseInt(data.score_usability);
  const avg = sum / 5;
  return Math.round(avg);
};

//WORKING ON GETTING COINS OVERALL SCORES TO BE AVERAGE OF ALL REVIEWS
/*const coinsOverall = (data) => {
  return Reviews
  .sum('score_transparency', { where: { coinsId: data.coinsId }})
  .then(sum => {
  return sum;
  })
}; */
//Then divide sum() by count(). Not getting this to work yet.

module.exports = {
  //create new review
  create(req, res) {
    return Reviews
      .create({
        name: req.body.name,
        review: req.body.review,
        score_overall: Overall(req.body),
        score_transparency: req.body.score_transparency,
        score_quality: req.body.score_quality,
        score_friendly: req.body.score_friendly,
        score_legal: req.body.score_legal,
        score_usability: req.body.score_usability,
        coinsId: req.params.coinsId,
      })
      //then update coin with new scores
        .then(reviews => {
          return Coins
          .findById(req.params.coinsId)
          .then(coin => {
            return coin
            .update({
              score_overall: reviews.score_overall,
              score_transparency: reviews.score_transparency,
              score_quality: reviews.score_quality,
              score_friendly: reviews.score_friendly,
              score_legal: reviews.score_legal,
              score_usability: reviews.score_usability,
            })
            .then(coin => res.status(200).send(coin))
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
        coinsId: req.params.coinsId,
      }
    })
    .then(reviews => res.status(200).send(reviews))
    .catch(error => res.status(400).send(error));
  },

  retrieve(req, res) {
  return Reviews
    .findById(req.params.reviewsId)
    .then(reviews => res.status(200).send(reviews))
    .catch(error => res.status(400).send(error));
  },

  update(req, res) {
  return Reviews
    .findById(req.params.reviewsId)
    .then(reviews => {
      if (!reviews) {
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
              .update({ score_overall: Overall(reviews) })
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
            id: req.params.reviewsId,
            coinsId: req.params.coinsId,
          },
        })
      .then(reviews => {
        if (!reviews) {
          return res.status(404).send({
            message: 'Review Not Found',
          });
        }

        return reviews
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
    },

};