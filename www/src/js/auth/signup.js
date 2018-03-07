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
      username: '',
      email: '',
      firstname: '',
      lastname: '',
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
    signup( this.state )
      .then((res) => {
        // Redirect to home page
      history.push({
        pathname: '/ReviewerDashboard',
        state: { user: res.data }
      });
    })
    .catch((error) => {
        console.log(error);
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
          <label htmlFor="username" className="sr-only">Username</label>
          <input className="form-control" placeholder="Username" name="username" type="text" value={this.state.username}
          onChange={this.handleChange} required />
          
          <label htmlFor="email" className="sr-only">Email Address</label>
          <input className="form-control" placeholder="Email address" name="email" type="email" value={this.state.email}
          onChange={this.handleChange} required />

          <label htmlFor="firstname" className="sr-only">First name</label>
          <input className="form-control" placeholder="First name" name="firstname" type="text" value={this.state.firstname}
          onChange={this.handleChange} />

          <label htmlFor="lastname" className="sr-only">Last Name</label>
          <input className="form-control" placeholder="Last name" name="lastname" type="text" value={this.state.lastname}
          onChange={this.handleChange}  />

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