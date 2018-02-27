import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {

  constructor(props) {
    super(props);

    this.state = {
      disclaimerLink: 'https://raw.githubusercontent.com/taptrust/taptrust/master/disclaimer.md',
      disclaimerLinkText: 'full disclaimer',
    };
  }


//  <img src={require('./images/logo.png')} />

  render() {

    var headerOuterStyle = {
      margin: '-25px 0 25px',
    };

    var headerInnerStyle = {
      textAlign: 'center',
      fontSize: '12px',
      borderBottom: '1px solid',
      paddingBottom: '13px'
    };

    return (
      <div style={headerOuterStyle}>
      <div style={headerInnerStyle}>
        This site is purely informational and does not constitute financial advice of any kind. By using the site, you agree to the <Link to={this.state.disclaimerLink}>{this.state.disclaimerLinkText}</Link>.
      </div>
      <a href="https://github.com/taptrust/taptrust" target="_blank">
        <img style={{zIndex: 1000, position: 'absolute', top: 0, left: 0, border: 0}} src="https://camo.githubusercontent.com/c6625ac1f3ee0a12250227cf83ce904423abf351/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f6c6566745f677261795f3664366436642e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_left_gray_6d6d6d.png" />
      </a>
      </div>
    );
  }
}

export default Header;
