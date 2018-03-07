
import React,{ Component } from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Alert from 'react-bootstrap/lib/Alert';
import Button from 'react-bootstrap/lib/Button';
import { Link } from 'react-router-dom';
import { signin } from '../api';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: ''
      }
   };

  handleChange = event => {
    this.setState({
       [event.target.name]: event.target.value 
          });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { history } = this.props;
    signin( this.state )
      .then((res) => {
        //  for later use in persistant id state and showing username
        const { userID } = res.data;
        const { username } = res.data;
        
      // Redirect to home page
      history.push('/');
    })
    .catch(() => {
      this.setState({ error: 'Unable to signin: check email or password' });
       });
  };

  render(){
    return(
      <Grid>
      {this.state.error && <Alert bsStyle="danger">{this.state.error}</Alert>}
      <div>
        <form onSubmit={this.handleSubmit}>
          <h2 className="form-signin-heading"> Please sign in </h2>
          <label htmlFor="email" className="sr-only">Email Address</label>
          <input className="form-control" placeholder="Email address" name="email" type="email" value={this.state.email}
          onChange={this.handleChange} required />
          <label htmlFor="password" className="sr-only">Password</label>
          <input name="password" type="password" className="form-control" placeholder="Password" value={this.state.password}
          onChange={this.handleChange} required/>
          <Button bsStyle="primary" className="btn btn-primary centerButton" type="submit" value="Sign In">Submit</Button>
        </form>
      </div>
      <div>
        <Link to="/signup">Signup</Link>
      </div>
      </Grid>
    );
  }
};

export default Signin;