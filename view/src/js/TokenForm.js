import React, { Component } from 'react';
import { Grid, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TokenForm = () => {
		return (
			<div>
			<Grid>
				<h2>Post Token</h2>
				<form action={"http://localhost:8000/api/tokens"} method="POST">
					<div>
				        <label htmlFor="name">Name:</label>
				        <input type="text" id="name" name="name" required />
				    </div>
				    <div>
				        <label htmlFor="category">Category:</label>
				        <input type="text" id="category" name="category" required />
				    </div>
				     <div>
				        <label htmlFor="age">Age:</label>
				        <input type="text" id="age" name="age" required />
				    </div>
				    <div>
				        <label htmlFor="symbol">Symbol:</label>
				        <input type="text" id="symbol" name="symbol" required/>
				    </div>
				    <div>
				        <label htmlFor="website">Website:</label>
				        <p className="inline">http://</p><input className="inline" type="text" id="website" name="website" required />
				    </div>

				    <div>
				        <label htmlFor="founders">Founder(s):</label>
				        <input type="text" id="founders" name="founders" required />
				    </div>

				    <div>
				        <label htmlFor="description">Description</label>
				        <textarea rows="3" cols="60" id="description" name="description" minLength="25" required></textarea>
				    </div>
    				<Button className="btn btn-primary centerButton" type="submit">Send</Button>
  				</form>
  			</Grid>
			</div>
		)
	}

export default TokenForm;