import React, { Component } from 'react';
import { Grid, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import { createReviewOfToken } from './api';

class ReviewForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      url: '',
      review: '',
      score_transparency: 0,
      score_governance: 0,
      score_legal: 0,
      score_functionality: 0,
      redirectToNewPage: false,
      error: ''
    };
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { match: { params: { tokenId } } } = this.props;

    createReviewOfToken(tokenId, this.state).then((res) => {
      res.status === 200 ? this.setState({ redirectToNewPage: true}) : this.setState({ error: 'Error, try again' })
    });
  };

  render() {
    const { match: { params: { tokenId } } } = this.props;

    if (this.state.redirectToNewPage) {
      return (
      <Redirect to="/"/>
      )
    }
    return (
      <div>
        <Grid>
          <p style={{ color: 'red' }}>{this.state.error}</p>
          <h2>Post Review</h2>
          <p>for token with tokenId: {tokenId}</p>

          <form onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                onChange={this.handleChange}
              />
            </div>

            <div>
              <label htmlFor="url">Personal Website/Blog:</label>
              <p className="inline">http://</p>
              <input
                className="inline"
                type="text"
                id="url"
                name="url"
                required
                onChange={this.handleChange}
              />
            </div>

            <div>
              <label htmlFor="review">Review:</label>
              <textarea
                rows="3"
                cols="60"
                minLength="100"
                id="review"
                name="review"
                required
                onChange={this.handleChange}
              />
            </div>

            <p style={{ paddingTop: '20px' }}>Scores (0-100):</p>
            <div>
              <label htmlFor="score_transparency">Transparency:</label>
              <input
                type="number"
                id="score_transparency"
                name="score_transparency"
                min="0"
                max="100"
                required
                onChange={this.handleChange}
              />
            </div>

            <div>
              <label htmlFor="score_governance">Governance:</label>
              <input
                type="number"
                id="score_governance"
                name="score_governance"
                min="0"
                max="100"
                required
                onChange={this.handleChange}
              />
            </div>

            <div>
              <label htmlFor="score_legal">Legal:</label>
              <input
                type="number"
                id="score_legal"
                name="score_legal"
                min="0"
                max="100"
                required
                onChange={this.handleChange}
              />
            </div>

            <div>
              <label htmlFor="score_functionality">Functionality:</label>
              <input
                type="number"
                id="score_functionality"
                name="score_functionality"
                min="0"
                max="100"
                required
                onChange={this.handleChange}
              />
            </div>

            <Button className="btn btn-primary centerButton" type="submit">
              Send
            </Button>
          </form>
        </Grid>
      </div>
    );
  }
}

export default ReviewForm;
