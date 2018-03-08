import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { render } from 'react-dom';

import TokenList from './containers/TokenList';
import ScrollToTop from './ScrollToTop';
import ErrorPage from './ErrorPage';
import Profile from './Profile';
import AllReviews from './AllReviews';
import ReviewDetail from './ReviewDetail';
import TokenForm from './TokenForm';
import ReviewForm from './ReviewForm';
import Header from './Header';
import Signin from './auth/signin';
import Signup from './auth/signup';
import Logout from './auth/logout';
import ReviewerDashboard from './ReviewerDashboard';
import PrivateRoute from './PrivateRoute';

import '../css/style.css';

const App = () => (
  <BrowserRouter>
    <ScrollToTop>
      <div>
        <Header />
        <div>
          <Switch>
            <Route exact path="/" component={Gallery} />
            <Route exact path="/tokenform" component={TokenForm} />
            <Route exact path="/signin" component={Signin}/>
            <Route exact path="/signup" component={Signup}/>
            <Route exact path="/logout" component={Logout}/>
            <PrivateRoute exact path="/reviewerdashboard" component={ReviewerDashboard}/>
            <Route exact path="/reviewform/:tokenName" component={ReviewForm} />
            <Route exact path="/:name" component={Profile} />
            <Route exact path="/:name/reviews" component={AllReviews} />
            <Route exact path="/:name/reviews/:reviewId" component={ReviewDetail} />
          <Route component={ErrorPage} />
        </Switch>
      </div>
    </ScrollToTop>
  </BrowserRouter>
);

render(<App />, document.getElementById('app'));

export default App;
