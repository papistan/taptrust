import React,{ Component } from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Alert from 'react-bootstrap/lib/Alert';
import { logout } from '../api';

class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {
          error: ''
          }
       };

    componentDidMount(){
        const { history } = this.props;
        logout( this.state )
        .then(() => {
            // Redirect to home page
            history.push('signin');
        })
        .catch(() => {
        this.setState({ error: 'Unable to logout: try again' });
    });
    }

  render(){
    return(
      <Grid>
        {this.state.error && <Alert bsStyle="danger">{this.state.error}</Alert>}
        <h1>
             Logging out...
        </h1>
      </Grid>
    );
  }

};

export default Logout;