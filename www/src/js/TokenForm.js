import React, { Component } from 'react';
import { Grid, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

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
      redirectToNewPage: false,
      error: ''
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    createToken(this.state)
      .then(res => {
        this.setState({ redirectToNewPage: true });
      })
      .catch(err => {
        this.setState({ error: 'Error, try again' });
      });
  };

  render() {
    if (this.state.redirectToNewPage) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <Grid>
          <p style={{ color: 'red' }}>{this.state.error}</p>
          <h2>Post Token</h2>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={this.state.name}
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
                value={this.state.category}
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
                value={this.state.age}
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
                value={this.state.symbol}
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
                value={this.state.website}
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
                value={this.state.founders}
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
                value={this.state.description}
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

export default TokenForm;
