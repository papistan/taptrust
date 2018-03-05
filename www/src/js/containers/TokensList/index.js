import React, { Component } from 'react';

import { getAllTokens } from '../../api';
import NavBar from '../../components/NavBar';
import Token from '../../components/Token';
import Loading from '../../Loading';

class Gallery extends Component {
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
      <div>
        <NavBar />

        {tokens.map(token => <Token key={token.id} token={token} />)}
      </div>
    );
  }
}

export default Gallery;
