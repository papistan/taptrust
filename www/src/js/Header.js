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

  render() {

    return (
      <div>
        This site is purely informational and does not constitute financial advice of any kind. By using the site, you agree to waive all liability for TapTrust and its agents. Please see <Link to={this.state.disclaimerLink}>{this.state.disclaimerLinkText}</Link> for more information.
      </div>
    );
  }
}
