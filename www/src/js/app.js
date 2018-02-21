import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { render } from 'react-dom';
import Gallery from './Gallery';
import ScrollToTop from './ScrollToTop';
import ErrorPage from './ErrorPage';
import Profile from './Profile';
import AllReviews from './AllReviews';
import ReviewDetail from './ReviewDetail';
import TokenForm from './TokenForm';
import ReviewForm from './ReviewForm';

import '../css/style.css';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <ScrollToTop>
          <div>
            <div>
              <Switch>
                <Route exact path="/" component={Gallery} />
                <Route exact path="/tokenform" component={TokenForm} />
                <Route
                  exact
                  path="/reviewform/:tokenId"
                  component={ReviewForm}
                />
                <Route exact path="/:name" component={Profile} />
                <Route exact path="/:name/reviews" component={AllReviews} />
                <Route
                  exact
                  path="/:name/reviews/:reviewId"
                  component={ReviewDetail}
                />

                <Route component={ErrorPage} />
              </Switch>
            </div>
          </div>
        </ScrollToTop>
      </BrowserRouter>
    );
  }
}

render(<App />, document.getElementById('app'));
