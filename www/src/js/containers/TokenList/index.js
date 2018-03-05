import React, { Component } from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import Label from 'react-bootstrap/lib/Label';
import orderBy from 'lodash/orderBy';

import { getAllTokens } from '../../api';
import NavBar from '../../components/NavBar';
import Token from '../../components/Token';
import Loading from '../../Loading';

import './style.css';

class TokenList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tokens: [],
      loading: true
    };
  }

  componentWillMount() {
    getAllTokens().then(res => {
      this.setState({
        sortBy: 'score_overall',
        order: 'desc',
        tokens: res.data,
        loading: false
      });
    });
  }

  handleSortChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { sortBy, order, tokens, loading } = this.state;

    return loading ? (
      <Loading />
    ) : (
      <Grid>
        <NavBar />

        <div className="header">
          <h1 tyle={{ color: 'black', fontSize: '35px', fontWeight: 'bolder' }}>
            Tokens
          </h1>

          <Form inline className="sort-form">
            <Label>Sort:</Label>
            &nbsp;
            <FormControl
              componentClass="select"
              name="sortBy"
              placeholder="Sort By"
              value={sortBy}
              onChange={this.handleSortChange}
            >
              <option value="score_overall">Score</option>
              <option value="updatedAt">Updated</option>
            </FormControl>
            &nbsp;
            <FormControl
              componentClass="select"
              placeholder="Order"
              name="order"
              value={order}
              onChange={this.handleSortChange}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </FormControl>
          </Form>
        </div>

        {orderBy(tokens, sortBy, order).map(token => (
          <Token key={token.id} token={token} />
        ))}
      </Grid>
    );
  }
}

export default TokenList;
