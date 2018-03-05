import React from 'react';
import PropTypes from 'prop-types';
import Label from 'react-bootstrap/lib/Label';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

const Badge = ({ score }) => {
  let label;

  if (score >= 80) {
    label = (
      <Label className="trusted">
        <Glyphicon glyph="ok-sign" /> Trusted
      </Label>
    );
  } else if (score >= 50) {
    label = (
      <Label className="mid-trusted">
        <Glyphicon glyph="question-sign" /> Moderate Risk
      </Label>
    );
  } else {
    label = (
      <Label className="not-trusted">
        <Glyphicon glyph="remove-sign" /> Not Trusted
      </Label>
    );
  }

  return label;
};

Badge.propTypes = {
  score: PropTypes.number.isRequired
};

export default Badge;
