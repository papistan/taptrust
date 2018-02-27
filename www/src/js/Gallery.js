import React, { Component } from 'react';
import {
  Navbar,
  NavItem,
  Nav,
  Grid,
  Col,
  Row,
  Glyphicon,
  Label,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { getAllTokens } from './api';
import Loading from './Loading';

const Navigation = () => {
  return (
    <div>
      <Navbar fixedTop collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
           <div style={{margin: '0 0 20px'}}>
            <a href="http://www.taptrust.com" target="_blank">
             <img src="http://www.taptrust.com/static/img/logo.png" style={{width: '150px'}} />
             </a>
            </div>
            <span
              className="brand"
              style={{ color: 'black', fontSize: '35px', fontWeight: 'bolder' }}
            >
              Tokens
            </span>
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
    </div>
  );
};

class Gallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      api: [],
      loading: true,
    };
  }

  componentDidMount() {
    getAllTokens().then(res => {
      this.setState({
        api: res.data,
        loading: false,
      });
    });
  }

  render() {

    let mappedApi = this.state.api.map(token => {

      var trustedBadge = '';
      if (token.score_overall > 80){
        trustedBadge = (
        <p style={{ fontSize: '16px' }}>
          <Label className="inline trusted">
            <Glyphicon glyph="ok-sign" /> Trusted
          </Label>
        </p>
      );
    }
      if (token.score_overall < 50){
      trustedBadge = (
        <p style={{ fontSize: '16px' }}>
          <Label className="inline not-trusted">
            <Glyphicon glyph="remove-sign" /> Not Trusted
          </Label>
        </p>
      );
    }

      return (
        <div key={token.id}>
          <Grid>
            <Link to={'/' + token.name} style={{ textDecoration: 'none' }}>
              <div className="gallery">
                <Row>
                  <Col xs={12} md={10}>
                    <h3>{token.name}</h3>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={10}>
                    {token.description.length > 250 ? (
                      <p>{token.description.substr(0, 250) + '...'}</p>
                    ) : (
                      <p>{token.description}</p>
                    )}
                  </Col>
                </Row>
                <Row className="review-data-row">
                  <Col className="review-data-item1" sm={1} md={3}>
                    <p
                      className="inline"
                      style={{ fontWeight: 'bold', fontSize: '18px' }}
                    >
                      {token.score_overall}%
                    </p>
                  </Col>
                  <Col className="review-data-item2" sm={3} md={3}>
                    <span className="text-nowrap inline">
                      <p style={{ color: '#d3d3d3', fontSize: '16px' }}>
                        ({token.Reviews.length} Reviews)
                      </p>
                    </span>
                  </Col>
                  <Col className="review-data-item5" sm={4} md={3}>
                    {trustedBadge}
                  </Col>
                  <Col className="review-data-item2 grey-line" sm={1} md={3}>
                    <p
                      className="inline"
                      style={{
                        color: '#b19cd9',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        paddingLeft: '10%',
                        textTransform: 'capitalize',
                      }}
                    >
                      {token.category}
                    </p>
                  </Col>
                </Row>
              </div>
            </Link>
          </Grid>
          <hr />
        </div>
      );
    });
    if (this.state.loading) {
      return <Loading />;
    } else {
      return (
        <div>
          <Navigation />
          {mappedApi}
        </div>
      );
    }
  }
}

export default Gallery;
