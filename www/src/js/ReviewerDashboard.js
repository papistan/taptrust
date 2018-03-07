import React,{ Component } from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Alert from 'react-bootstrap/lib/Alert';
import { Link } from 'react-router-dom';
import { logout } from './api';

class ReviewerDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
          user: this.props.location.state.user,
          error: ''
          }
       };

  render(){
    const { user } = this.state
    return(
      <Grid>
        {this.state.error && <Alert bsStyle="danger">{this.state.error}</Alert>}
        <h1>
             Welcome {user.username} !
        </h1>
        <h6> Reviews</h6>
            
        <Link className="btn btn-primary" to="/logout">
            Logout
        </Link>
      </Grid>
    );
  }

};

export default ReviewerDashboard;