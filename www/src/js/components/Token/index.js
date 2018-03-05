import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import { truncate } from '../../utils/string';
import Badge from './Badge';

const Token = ({ token }) => (
  <div>
    <Link to={`/${token.name}`} style={{ textDecoration: 'none' }}>
      <Grid>
        <Row>
          <Col xs={12} md={10}>
            <h3>{token.name}</h3>

            <p>{truncate(token.description)}</p>
          </Col>
        </Row>

        <Row className="review-data-row">
          <Col className="review-data-item1" sm={1} md={3}>
            <p style={{ fontWeight: 'bold', fontSize: '18px' }}>
              {token.score_overall}%
            </p>
          </Col>

          <Col className="review-data-item2" sm={3} md={3}>
            <span className="text-nowrap">
              <p style={{ color: '#d3d3d3', fontSize: '16px' }}>
                ({token.reviews.length} Reviews)
              </p>
            </span>
          </Col>

          <Col className="review-data-item5" sm={4} md={3}>
            <p style={{ fontSize: '16px' }}>
              <Badge score={token.score_overall} />
            </p>
          </Col>

          <Col className="review-data-item2 grey-line" sm={1} md={3}>
            <p
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

Token.propTypes = {
  token: PropTypes.object.isRequired
};

export default Token;
