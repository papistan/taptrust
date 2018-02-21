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
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from './Loading';

const API = 'http://localhost:8000/api/tokens/';

const Navigation = () => {
  return (
    <div>
      <Navbar fixedTop collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
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
    axios.get(API).then(res => {
      const api = res.data;
      this.setState({
        api: api,
        loading: false,
      });
    });
  }

  render() {
    let mappedApi = this.state.api.map(token => {
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
                    {token.score_overall > 50 ? (
                      <p style={{ fontSize: '16px' }}>
                        <Label className="inline trusted">
                          <Glyphicon glyph="ok-sign" /> Trusted
                        </Label>
                      </p>
                    ) : (
                      <p style={{ fontSize: '16px' }}>
                        <Label className="inline not-trusted">
                          <Glyphicon glyph="remove-sign" /> Not Trusted
                        </Label>
                      </p>
                    )}
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
