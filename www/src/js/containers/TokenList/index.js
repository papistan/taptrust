import React, { Component } from 'react';
import Grid from 'react-bootstrap/lib/Grid';

import { getAllTokens } from '../../api';
import NavBar from '../../components/NavBar';
import Token from '../../components/Token';
import Loading from '../../Loading';

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
        tokens: res.data,
        loading: false
      });
    });
  }

  render() {
    const { tokens, loading } = this.state;

    return loading ? (
      <Loading />
    ) : (
      <Grid>
        <NavBar />

        <h1 tyle={{ color: 'black', fontSize: '35px', fontWeight: 'bolder' }}>
          Tokens
        </h1>

        {tokens.map(token => <Token key={token.id} token={token} />)}
      </Grid>
    );
  }
}

export default TokenList;
