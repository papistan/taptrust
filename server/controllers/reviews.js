const { Review } = require('../models');

// calculates Review's overall_score from other score values
const Overall = data => {
  const sum =
    parseInt(data.score_transparency, 10) +
    parseInt(data.score_governance, 10) +
    parseInt(data.score_legal, 10) +
    parseInt(data.score_functionality, 10);
  const avg = sum / 4;
  return Math.round(avg);
};

const fullReview = data => data.review.replace(/(?:\r\n|\r|\n)/g, '<br />');

module.exports = {
  // create new review
  create(req, res, next) {
    return (
      Review.create({
        name: req.body.name,
        review: fullReview(req.body),
        url: req.body.url,
        score_overall: Overall(req.body),
        score_transparency: req.body.score_transparency,
        score_governance: req.body.score_governance,
        score_legal: req.body.score_legal,
        score_functionality: req.body.score_functionality,
        tokenId: req.params.tokenId
      })
        // then move to updateAgg in token controller
        .then(reviews => next())
        .catch(error => res.status(400).send(error))
    );
  },

  list(req, res) {
    return Review.findAll({
      where: {
        tokenId: req.params.tokenId
      }
    })
      .then(review => res.status(200).send(review))
      .catch(error => res.status(400).send(error));
  },

  retrieve(req, res) {
    return Review.findById(req.params.reviewId)
      .then(review => res.status(200).send(review))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return Review.findById(req.params.reviewId)
      .then(review => {
        if (!review) {
          return res.status(404).send({
            message: 'Review Not Found'
          });
        }

        return (
          review
            // update only changed values to db, keep others the same
            .update(req.body, { fields: Object.keys(req.body) })
            .then(updatedReview =>
              updatedReview
                // update overall_score based on new values
                .update({ score_overall: Overall(review) })
                // send updated db with new overall_score
                .then(sendUpdate => res.status(200).send(sendUpdate))
                .catch(error => res.status(401).send(error))
            )
            .catch(error => res.status(402).send(error))
        );
      })
      .catch(error => res.status(403).send(error));
  },

  destroy(req, res) {
    return Review.find({
      where: {
        id: req.params.reviewId,
        tokenId: req.params.tokenId
      }
    })
      .then(review => {
        if (!review) {
          return res.status(404).send({
            message: 'Review Not Found'
          });
        }

        return review
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
};
