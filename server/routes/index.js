const coinsController = require('../controllers').coins;
const reviewsController = require('../controllers').reviews;
const path = require('path');

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Taptrust API',
  }));

  //Coins
  app.post('/api/coins', coinsController.create);
  app.get('/api/coins', coinsController.list);
  app.get('/api/coins/:coinsId', coinsController.retrieve);
  app.put('/api/coins/:coinsId', coinsController.update);
  app.delete('/api/coins/:coinsId', coinsController.destroy);

  //Reviews
  app.post('/api/coins/:coinsId/reviews', reviewsController.create);
  app.get('/api/coins/:coinsId/reviews', reviewsController.list);
  app.put('/api/reviews/:reviewsId', reviewsController.update);
  app.get('/api/reviews/:reviewsId', reviewsController.retrieve);
  app.delete('/api/coins/:coinsId/reviews/:reviewsId', reviewsController.destroy);
}