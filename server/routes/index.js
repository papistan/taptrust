const tokensController = require('../controllers').Tokens;
const reviewsController = require('../controllers').Reviews;
const authReviewersController = require('../controllers').AuthReviewers;

module.exports = (app, passport) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Taptrust API',
  }));

  //Token
  app.post('/api/tokens', tokensController.create);
  app.get('/api/tokens', tokensController.list);
  app.get('/api/tokens/:name', tokensController.retrieve);
  //app.get('/api/tokens/:tokenId', tokensController.retrieve);
  app.put('/api/tokens/:tokenId', tokensController.update);
  app.delete('/api/tokens/:tokenId', tokensController.destroy);

  //Review
  app.post('/api/tokens/:tokenId/reviews', reviewsController.create, tokensController.updateAgg);
  app.get('/api/tokens/:tokenId/reviews', reviewsController.list);
  app.put('/api/reviews/:reviewId', reviewsController.update);
  app.get('/api/reviews/:reviewId', reviewsController.retrieve);
  app.delete('/api/tokens/:tokenId/reviews/:reviewId', reviewsController.destroy);

// Auth 
  app.get('api/signup', authReviewersController.signup);
  app.post('api/signup', passport.authenticate('local-signup', { 
    successRedirect: 'api/dashboard', 
    failureRedirect: 'api/signup' 
  }));
  
  app.get('api/signin', authReviewersController.signin);
  app.post('api/signin', passport.authenticate('local-signin', {
    successRedirect: 'api/dashboard',
    failureRedirect: 'api/signin'
  }));

  app.get('api/dashboard', isLoggedIn, authReviewersController.dashboard);

  app.get('api/logout', authReviewersController.logout);

// custom middleware for login 
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('api/signin');
  }
}