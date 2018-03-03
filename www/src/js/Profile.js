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
  Label,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { getToken } from './api';
import Loading from './Loading';

const Navigation = () => {
  return (
    <div>
      <Navbar fixedTop collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">
              <Glyphicon glyph="chevron-left" />Tokens
            </Link>
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
    </div>
  );
};
class Profile extends Component {
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
    const lastReview = reviews[reviews.length - 1] || [];
    const date = new Date(lastReview.createdAt);
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
    const lastReviewHTML = () => {
      return { __html: lastReview.review };
    };
    if (this.state.loading) {
      return <Loading />;
    } else {
      return (
        <div>
          <Navigation />
          <Grid>
            <Row>
              <Col sm={10} style={{ fontWeight: 'bold' }}>
                <h1>{token.name}</h1>
              </Col>
            </Row>
            <Row>
              <Col sm={10}>
                <p
                  style={{
                    color: '#b19cd9',
                    fontSize: '16px',
                    textTransform: 'capitalize',
                  }}
                >
                  Category: {token.category}
                </p>
                <p
                  style={{
                    color: '#b19cd9',
                    marginTop: '-10px',
                    fontSize: '16px',
                  }}
                >
                  Age: {token.age}
                </p>
              </Col>
            </Row>
            <Row>
              <Col sm={10}>
                <p>{token.description}</p>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm={10} className="inline">
                <div className="space-between">
                  <span>
                    <h2 className="inline" style={{ fontWeight: 'bold' }}>
                      {token.score_overall}{' '}
                    </h2>
                    <p
                      className="inline"
                      style={{ color: 'grey', fontWeight: 'bold' }}
                    >
                      /100 overall score
                    </p>
                  </span>



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

                  if (token.score_overall <= 80){
                  trustedBadge = (
                  <p style={{ fontSize: '16px' }}>
                    <Label className="inline mid-trusted">
                      <Glyphicon glyph="question-sign" /> Moderate Risk
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


                </div>
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <p style={{ fontWeight: 'bold' }}>
                  From {reviews.length || 0} User Reviews
                </p>
              </Col>
            </Row>
            <Row className="flex-no-wrap ">
              <Col sm={7}>
                <ProgressBar bsStyle="warning" now={token.score_transparency} />
              </Col>
              <Col sm={5}>
                <span className="text-nowrap inline">
                  <p style={{ color: '#FFCC11' }}>
                    {' '}
                    Transparency: <b>{token.score_transparency}%</b>
                  </p>
                </span>
              </Col>
            </Row>
            <Row className="flex-no-wrap ">
              <Col sm={7}>
                <ProgressBar bsStyle="warning" now={token.score_legal} />
              </Col>
              <Col sm={5}>
                <span className="text-nowrap inline">
                  <p style={{ color: '#FFCC11' }}>
                    {' '}
                    Legal Status: <b>{token.score_legal}%</b>
                  </p>
                </span>
              </Col>
            </Row>
            <Row className="flex-no-wrap ">
              <Col sm={7}>
                <ProgressBar
                  bsStyle="warning"
                  now={token.score_functionality}
                />
              </Col>
              <Col sm={5}>
                <span className="text-nowrap inline">
                  <p style={{ color: '#FFCC11' }}>
                    {' '}
                    Functionality: <b>{token.score_functionality}%</b>
                  </p>
                </span>
              </Col>
            </Row>
            <Row className="flex-no-wrap">
              <Col sm={7}>
                <ProgressBar bsStyle="warning" now={token.score_governance} />
              </Col>
              <Col sm={5}>
                <span className="text-nowrap inline">
                  <p style={{ color: '#FFCC11' }}>
                    {' '}
                    Governance: <b>{token.score_governance}%</b>
                  </p>
                </span>
              </Col>
            </Row>
            <div className="review-div">
              <Row className="flex-no-wrap ">
                <Col sm={7}>
                  <p style={{ fontSize: '30px', fontWeight: 'bold' }}>
                    {lastReview.score_overall}
                  </p>
                  <p style={{ color: 'grey' }}>Overall Score</p>
                </Col>
                <Col className="flex-no-wrap" sm={5}>
                  <h4>{lastReview.name}</h4>
                  <p>
                    {months[date.getMonth()]} {date.getDate()},{' '}
                    {date.getFullYear()}
                  </p>
                </Col>
              </Row>
              <Row className="flex-no-wrap review-box-words">
                <Col className="darkgrey-line" sm={3}>
                  <p style={{ fontWeight: 'bold' }}>
                    {lastReview.score_transparency}
                  </p>
                  <p>Transparency</p>
                </Col>
                <Col className="darkgrey-line" sm={3}>
                  <p style={{ fontWeight: 'bold' }}>{lastReview.score_legal}</p>
                  <p>Legal Status</p>
                </Col>
                <Col className="darkgrey-line" sm={3}>
                  <p style={{ fontWeight: 'bold' }}>
                    {lastReview.score_functionality}
                  </p>
                  <p>Functionality</p>
                </Col>
                <Col sm={3}>
                  <p style={{ fontWeight: 'bold' }}>
                    {lastReview.score_governance}
                  </p>
                  <p>Governance</p>
                </Col>
              </Row>
              <Row className="flex-no-wrap">
                <Col sm={12}>
                  { lastReview.review !== undefined ?
                    lastReview.review.length > 250 ? (
                    <p style={{ color: 'grey' }}>
                      {lastReview.review.substr(0, 250) + '...'}
                    </p>
                  ) : (
                    <p style={{ color: 'grey' }}> {lastReview.review}</p>
                  ) : (<p style={{ color: 'grey' }}>No reviews</p>)}
                </Col>
              </Row>
            </div>
            <Row>
              <Col style={{ textAlign: 'right' }} sm={4} xsOffset={8}>
                <Link
                  style={{ color: 'grey', fontWeight: 'bold' }}
                  to={'/' + token.name + '/reviews'}
                >
                  See all {reviews.length || 0} reviews
                </Link>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm={10}>
                <h3 style={{ paddingBottom: '20px' }}>General Information</h3>
              </Col>
            </Row>
            <Row>
              <Col sm={6}>
                <p style={{ color: 'grey' }}>Founder</p>
              </Col>
              <Col sm={6}>
                <p>{token.founders}</p>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm={6}>
                <p style={{ color: 'grey' }}>Symbol</p>
              </Col>
              <Col sm={6}>
                <p>{token.symbol}</p>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col sm={6}>
                <p style={{ color: 'grey' }}>Website</p>
              </Col>
              <Col sm={6}>
                <a
                  style={{ fontWeight: 'bold', color: 'gray' }}
                  href={'http://' + token.website}
                >
                  {token.website}
                </a>
              </Col>
            </Row>
            <hr />
          </Grid>
        </div>
      );
    }
  }
}

export default Profile;
