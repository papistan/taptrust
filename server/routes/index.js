const tokensController = require('../controllers').Tokens;
const reviewsController = require('../controllers').Reviews;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Taptrust API',
  }));

  //Token
  app.post('/api/tokens', tokensController.create);
  app.get('/api/tokens', tokensController.list);
  app.get('/api/tokens/:name', tokensController.retrieve);
  // TOOK OUT IN PLACE OF ABOVE. USE BOTH?
  // app.get('/api/tokens/:tokenId', tokensController.retrieve);
  app.put('/api/tokens/:tokenId', tokensController.update);
  app.delete('/api/tokens/:tokenId', tokensController.destroy);

  //Review
  app.post('/api/tokens/:tokenId/reviews', reviewsController.create, tokensController.updateAgg);
  app.get('/api/tokens/:tokenId/reviews', reviewsController.list);
  app.put('/api/reviews/:reviewId', reviewsController.update);
  app.get('/api/reviews/:reviewId', reviewsController.retrieve);
  app.delete('/api/tokens/:tokenId/reviews/:reviewId', reviewsController.destroy);
}