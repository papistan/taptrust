import React, { Component } from 'react';
import { Grid, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ReviewForm extends Component {
	constructor(props) {
		super(props);
}

render() {
	const tokenId = this.props.match.params.tokenId;
	const postUrl = "http://localhost:8000/api/tokens/" + tokenId + "/reviews";
		return (
			<div>
				<Grid>
					<h2>Post Review</h2>
					<p>for token with tokenId: { tokenId }</p>
					<form action={ postUrl } method="POST">
						<div>
					        <label for="name">Name:</label>
					        <input type="text" id="name" name="name" />
					    </div>
					    <div>
					        <label for="url">Personal Website/Blog:</label>
					        <p className="inline">http://</p>
					        <input className="inline" type="text" id="url" name="url" />
					    </div>
					    <div>
					    	<label for="review">Review:</label>
					    	<textarea rows="3" cols="60" minLength="100" id="review" name="review"></textarea>
					    </div>

					    <p style={{ paddingTop: '20px' }}>Scores (0-100):</p>
					    <div>
					        <label for="score_transparency">Transparency:</label>
					        <input type="number" id="score_transparency" name="score_transparency" min="0" max="100" />
					    </div>

					    <div>
					        <label for="score_governance">Governance:</label>
					        <input type="number" id="score_governance" name="score_governance" min="0" max="100" />
					    </div>

					    <div>
					        <label for="score_legal">Legal:</label>
					        <input type="number" id="score_legal" name="score_legal" min="0" max="100" />
					    </div>

					    <div>
					        <label for="score_functionality">Functionality:</label>
					        <input type="number" id="score_functionality" name="score_functionality" min="0" max="100" />
					    </div>
	    				<Button className="btn btn-primary centerButton" type="submit">Send</Button>
	  				</form>
	  			</Grid>
			</div>
		)

	}
}

export default ReviewForm;