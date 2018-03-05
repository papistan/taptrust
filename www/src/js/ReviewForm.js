import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Grid from 'react-bootstrap/lib/Grid';
import Alert from 'react-bootstrap/lib/Alert';
import Button from 'react-bootstrap/lib/Button';

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
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { match: { params: { tokenId } } } = this.props;

    createReviewOfToken(tokenId, this.state)
      .then(() => {
        this.setState({ redirectToNewPage: true });
      })
      .catch(() => {
        this.setState({ error: 'Error, try again' });
      });
  };

  render() {
    const { match: { params: { tokenId } } } = this.props;
    const {
      redirectToNewPage,
      error,
      name,
      url,
      review,
      score_transparency,
      score_governance,
      score_legal,
      score_functionality
    } = this.state;

    if (redirectToNewPage) {
      return <Redirect to="/" />;
    }

    return (
      <Grid>
        {error && <Alert bsStyle="danger">{error}</Alert>}

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
              value={name}
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
              value={url}
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
              value={review}
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
              value={score_transparency}
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
              value={score_governance}
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
              value={score_legal}
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
              value={score_functionality}
              onChange={this.handleChange}
            />
          </div>

          <Button className="btn btn-primary centerButton" type="submit">
            Send
          </Button>
        </form>
      </Grid>
    );
  }
}

export default ReviewForm;
