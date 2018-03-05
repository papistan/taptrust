import React, { Component } from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Alert from 'react-bootstrap/lib/Alert';
import Button from 'react-bootstrap/lib/Button';

import { getTokenByName, createReview } from './api';
import Loading from './Loading';

class ReviewForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: null,
      review: {
        name: '',
        url: '',
        review: '',
        score_transparency: 0,
        score_governance: 0,
        score_legal: 0,
        score_functionality: 0
      },
      loading: false,
      error: ''
    };
  }

  componentWillMount() {
    const { match: { params: { tokenName } } } = this.props;

    // Load token
    this.setState({ loading: true });
    getTokenByName(tokenName).then(response => {
      const token = response.data;

      this.setState({
        token,
        loading: false
      });
    });
  }

  handleChange = event => {
    this.setState({
      review: { ...this.state.review, [event.target.name]: event.target.value }
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { history } = this.props;
    const { token, review } = this.state;

    createReview(token.id, review)
      .then(() => {
        // Redirect to home page
        history.push('/');
      })
      .catch(() => {
        this.setState({ error: 'Error, try again' });
      });
  };

  render() {
    const {
      token,
      error,
      loading,
      review: {
        name,
        url,
        review,
        score_transparency,
        score_governance,
        score_legal,
        score_functionality
      }
    } = this.state;

    return loading ? (
      <Loading />
    ) : (
      <Grid>
        {error && <Alert bsStyle="danger">{error}</Alert>}

        <h2>Post Review for token: {token.name}</h2>

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

          <Button bsStyle="primary" className="centerButton" type="submit">
            Send
          </Button>
        </form>
      </Grid>
    );
  }
}

export default ReviewForm;
