import React, { Component } from 'react';
import { Grid, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { createToken } from './api';

class TokenForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      category: '',
      age: '',
      symbol: '',
      website: '',
      founders: '',
      description: '',
    };
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { match: { params: { tokenId } } } = this.props;

    createToken(this.state).then(() => {
      // TODO: Add callback after success
    });
  };

  render() {
    return (
      <div>
        <Grid>
          <h2>Post Token</h2>
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
              <label htmlFor="category">Category:</label>
              <input
                type="text"
                id="category"
                name="category"
                required
                onChange={this.handleChange}
              />
            </div>

            <div>
              <label htmlFor="age">Age:</label>
              <input
                type="text"
                id="age"
                name="age"
                required
                onChange={this.handleChange}
              />
            </div>

            <div>
              <label htmlFor="symbol">Symbol:</label>
              <input
                type="text"
                id="symbol"
                name="symbol"
                required
                onChange={this.handleChange}
              />
            </div>

            <div>
              <label htmlFor="website">Website:</label>
              <p className="inline">http://</p>
              <input
                className="inline"
                type="text"
                id="website"
                name="website"
                required
                onChange={this.handleChange}
              />
            </div>

            <div>
              <label htmlFor="founders">Founder(s):</label>
              <input
                type="text"
                id="founders"
                name="founders"
                required
                onChange={this.handleChange}
              />
            </div>

            <div>
              <label htmlFor="description">Description</label>
              <textarea
                rows="3"
                cols="60"
                id="description"
                name="description"
                minLength="25"
                required
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

export default TokenForm;
