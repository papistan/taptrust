import React, { Component } from 'react';
import {
  Navbar,
  NavItem,
  Nav,
  Grid,
  Col,
  Row,
  ProgressBar,
  Glyphicon,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { getToken } from './api';
import Loading from './Loading';

class AllReviews extends Component {
  constructor(props) {
    super(props);

    this.state = {
      api: [],
      loading: true,
    };
  }

  componentDidMount() {
    const { match: { params: { name: tokenId } } } = this.props;

    getToken(tokenId).then(res => {
      this.setState({
        api: res.data,
        loading: false,
      });
    });
  }

  render() {
    const token = this.state.api;
    const reviews = token.Reviews || [];
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    let mappedReviews = reviews.map(reviews => {
      const date = new Date(reviews.createdAt);
      return (
        <div key={reviews.id}>
          <div>
            <Navbar fixedTop collapseOnSelect>
              <Navbar.Header>
                <Navbar.Brand>
                  <Link to={'/' + token.name}>
                    <Glyphicon glyph="chevron-left" />
                    {token.name}
                  </Link>
                </Navbar.Brand>
              </Navbar.Header>
            </Navbar>
          </div>

          <Grid>
            <Link
              to={'/' + token.name + '/reviews' + '/' + reviews.id}
              style={{ color: 'black' }}
            >
              <div className="review-div">
                <Row className="flex-no-wrap ">
                  <Col sm={8}>
                    <p style={{ fontSize: '30px', fontWeight: 'bold' }}>{reviews.score_overall}</p>
                    <p style={{ color: 'grey' }}>Overall Score</p>
                  </Col>
                  <Col style={{ float: 'right' }} sm={4}>
                    <h4>{reviews.name}</h4>
                    <p style={{ color: 'grey'}}>
                      {months[date.getMonth()]} {date.getDate()},{' '}
                      {date.getFullYear()}
                    </p>
                  </Col>
                </Row>
                <Row className="flex-no-wrap review-box-words">
                  <Col className="darkgrey-line" sm={3}>
                    <p style={{ fontSize: '20px',fontWeight: "bold" }}>{reviews.score_transparency}</p>
                    <p style={{ color: 'grey'}}>Transparency</p>
                  </Col>
                  <Col className="darkgrey-line" sm={3}>
                    <p style={{ fontSize: '20px', fontWeight: "bold" }}>{reviews.score_legal}</p>
                    <p style={{ color: 'grey'}}>Legal Status</p>
                  </Col>
                  <Col className="darkgrey-line" sm={3}>
                    <p style={{ fontSize: '20px', fontWeight: "bold" }}>{reviews.score_functionality}</p>
                    <p style={{ color: 'grey'}}>Functionality</p>
                  </Col>
                  <Col sm={3}>
                    <p style={{ fontSize: '20px', fontWeight: "bold" }}>{reviews.score_governance}</p>
                    <p style={{ color: 'grey'}}>Governance</p>
                  </Col>
                </Row>
                <Row>
                  <Col style={{ marginTop: '2%'}} sm={12}>
                    {reviews.review.length > 250 ? (
                      <p style={{ color: 'gray' }}>
                        {reviews.review.substr(0, 250) + '...'}
                      </p>
                    ) : (
                      <p style={{ color: 'gray' }}> {reviews.review}</p>
                    )}
                  </Col>
                </Row>
              </div>
            </Link>
          </Grid>
        </div>
      );
    });

    if (this.state.loading) {
      return <Loading />;
    } else {
      return (
        <div>
          <Grid>
            <Row>
              <Col sm={10}>
                <h2 style={{ fontSize: '30px' }}>All Reviews</h2>
              </Col>
            </Row>
            <Row>
              <Col sm={10}>
                <p style={{ color: 'lightgrey', fontWeight: 'bold' }}>{reviews.length} total reviews</p>
              </Col>
            </Row>
          </Grid>
          {mappedReviews};
        </div>
      );
    }
  }
}

export default AllReviews;
