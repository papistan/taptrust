import React, { Component } from 'react';
import { Navbar, NavItem, Nav, Grid, Col, Row, ProgressBar, Glyphicon } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from './Loading';

class AllReviews extends Component {
	constructor(props) {
		super(props);

		this.state = {
			api: [],
			loading: true,
		};
	}

	componentDidMount(){
		const currentToken = this.props.match.params.name;
		const API = "http://localhost:8000/api/tokens/" + currentToken;
        axios.get(API)
	        .then(res => {
	        	const api = res.data;
	        	this.setState({ 
	        		api: api,
	        		loading: false,
	        	});
	        });
	       
    	}

    render() {
    		const token = this.state.api;
    		const reviews = token.Reviews || [ ];
    		const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    		let mappedReviews = reviews.map(reviews => {
    			const date = new Date(reviews.createdAt);
    			return (
    				<div key={reviews.id}>
			    		<div>
				    		<Navbar fixedTop collapseOnSelect>
					        	<Navbar.Header>
						            <Navbar.Brand>
						            	<Link  to={'/' + token.name}>
						            		<Glyphicon glyph="chevron-left" />{token.name}
						            	</Link>
						       		</Navbar.Brand>
					          	</Navbar.Header>  
						    </Navbar>
		    			</div>

		    			<Grid>
		    				<Link to={'/' + token.name + '/reviews' + '/' + reviews.id} style={{ color: 'black' }}>
			    				<div className='review-div'>
			    					<Row>
			    						<Col xs={8}>
			    							<p style={{ fontSize: '30px' }}>{reviews.score_overall}</p>
			    							<p style={{ color: 'grey' }}>Overall Score</p>
			    						</Col>
			    						<Col xs={4}>
			    							<h4>{reviews.name}</h4>
	    									<p>{months[date.getMonth()]} {date.getDate()}, {date.getFullYear()}</p>
			    						</Col>
			    					</Row>
			    					<Row>
			    						<Col xs={3}>
			    							<p>{reviews.score_transparency}</p>
			    							<p style={{ color: 'grey' }}>Transparency</p>
			    						</Col>
			    						<Col xs={3}>
			    							<p>{reviews.score_legal}</p>
			    							<span className="text-nowrap"><p style={{ color: 'grey' }}>Legal Status</p></span>
			    						</Col>
			    						<Col xs={3}>
			    							<p>{reviews.score_functionality}</p>
			    							<p style={{ color: 'grey' }}>Functionality</p>
			    						</Col>
			    						<Col xs={3}>
			    							<p>{reviews.score_governance}</p>
			    							<p style={{ color: 'grey' }}>Governance</p>
			    						</Col>
			    					</Row>
			    					<Row>
			    						<Col xs={12}>
			    							{(reviews.review.length > 250) ?
                                                <p style={{ color: 'gray' }}>{reviews.review.substr(0,250) + "..."}</p> :
                                                <p style={{ color: 'gray' }}> {reviews.review}</p>
                                            }
			    						</Col>
			    					</Row>
		    					</div>
		    				</Link>
	    				</Grid>
    				</div>
    			)
    		})

    		if (this.state.loading) {
                return <Loading />
            } else {
	  			return (
	  				<div>
						<Grid>
							<Row>
								<Col xs={10}>
									<h2>All Reviews</h2>
								</Col>
							</Row>
							<Row>
								<Col xs={10}>
									<p style={{ color: 'grey' }}>{reviews.length} total reviews</p>
								</Col>
							</Row>
						</Grid>
						{mappedReviews};	
					</div>
	  			)
	  		}
   }
}

export default AllReviews