import React,{ Component } from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Alert from 'react-bootstrap/lib/Alert';
import Button from 'react-bootstrap/lib/Button';
import { Link } from 'react-router-dom';
import { signup } from '../api';

class Signup extends Component {
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
      .then(() => {
      // Redirect to home page
      history.push('/');
    })
    .catch(() => {
      this.setState({ error: 'Unable to register: check inputs and try again' });
       });
  };

  render(){
    return(
      <Grid>
      {this.state.error && <Alert bsStyle="danger">{this.state.error}</Alert>}
      <div>
        <form onSubmit={this.handleSubmit}>
          <h2 className="form-signin-heading"> Register here </h2>
          <label htmlFor="email" className="sr-only">Email Address</label>
          <input className="form-control" placeholder="Email address" name="email" type="email" value={this.state.email}
          onChange={this.handleChange} required />
          <label htmlFor="password" className="sr-only">Password</label>
          <input name="password" type="password" className="form-control" placeholder="Password" value={this.state.password}
          onChange={this.handleChange} required/>
          <Button bsStyle="primary" className="btn btn-primary centerButton" type="submit" value="Sign Up">Submit</Button>
        </form>
      </div>
      <div>
        <Link to="/signin">Signin</Link>
      </div>
      </Grid>
    );
  }
};

export default Signup;