import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Label from 'react-bootstrap/lib/Label';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

const Token = ({ token }) => {
  let trustedBadge = '';

  if (token.score_overall > 80) {
    trustedBadge = (
      <p style={{ fontSize: '16px' }}>
        <Label className="inline trusted">
          <Glyphicon glyph="ok-sign" /> Trusted
        </Label>
      </p>
    );
  }

  if (token.score_overall <= 80) {
    trustedBadge = (
      <p style={{ fontSize: '16px' }}>
        <Label className="inline mid-trusted">
          <Glyphicon glyph="question-sign" /> Moderate Risk
        </Label>
      </p>
    );
  }

  if (token.score_overall < 50) {
    trustedBadge = (
      <p style={{ fontSize: '16px' }}>
        <Label className="inline not-trusted">
          <Glyphicon glyph="remove-sign" /> Not Trusted
        </Label>
      </p>
    );
  }

  return (
    <div>
      <Link to={`/${token.name}`} style={{ textDecoration: 'none' }}>
        <Grid>
          <Row>
            <Col xs={12} md={10}>
              <h3>{token.name}</h3>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={10}>
              {token.description.length > 250 ? (
                <p>{`${token.description.substr(0, 250)}...`}</p>
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
                  textTransform: 'capitalize'
                }}
              >
                {token.category}
              </p>
            </Col>
          </Row>
        </Grid>
      </Link>

      <hr />
    </div>
  );
};

Token.propTypes = {
  token: PropTypes.object.isRequired
};

export default Token;
