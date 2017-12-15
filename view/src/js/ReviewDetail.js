import React, { Component } from 'react';
import { Navbar, NavItem, Nav, Grid, Col, Row, ProgressBar, Glyphicon } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ReviewDetail extends Component {
	constructor(props) {
		super(props);

		this.state = {
			api: [],
		};
	}

	componentDidMount(){
		const reviewId = this.props.match.params.reviewId;
		const API = "http://localhost:8000/api/reviews/" + reviewId;
        axios.get(API)
	        .then(res => {
	        	const api = res.data;
	        	this.setState({ 
	        		api: api,
	        	});
	        });
	       
    	}

    render() {
    		const reviews = this.state.api;
    		const currentToken = this.props.match.params.name;
    		const date = new Date(reviews.createdAt);
    		const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  			return (
	    		<div>
	    			<div>
                        <Navbar fixedTop collapseOnSelect>
	                        <Navbar.Header>
                                <Navbar.Brand>
                                    <Link  to={'/' + currentToken + '/reviews'}>
			            		       <Glyphicon glyph="arrow-left" /> All {currentToken} Reviews
			            	        </Link>
			       		        </Navbar.Brand>          	
		                  	</Navbar.Header>
                        </Navbar>
	    			</div>
	    			
                    <div>
	    				<Grid>
	    					<Row>
	    						<Col xs={10}>
	    							<h2>{reviews.name}</h2>
	    						</Col>
	    					</Row>
	    					<Row>
	    						<Col xs={10}>
	    							<h4 style={{ color: 'gray' }}>{months[date.getMonth()]} {date.getDate()}, {date.getFullYear()}</h4>
	    						</Col>
	    					</Row>
	    					<hr></hr>
	    					<Row >
            					<Col xs={10}>
            						<div style={{ marginBottom: '20px' }}>
            							<h2 className='inline' style={{ fontWeight: 'bold' }}>{reviews.score_overall} </h2>
            							<p className='inline' style={{ color: '#d3d3d3' }}>/100 overall score</p>
            						</div>
            					</Col>
        					</Row>
	    					<Row>
            					<Col xs={6}>
            						<ProgressBar bsStyle="warning" now={reviews.score_transparency} />
            					</Col>
            					<Col xs={6}>
            						<p style={{ color: '#F89406' }}> Transparency: <b>{reviews.score_transparency}%</b></p>
            					</Col>
            				</Row>
            				<Row>
            					<Col xs={6}>
            						<ProgressBar bsStyle="warning" now={reviews.score_legal} />
            					</Col>
            					<Col xs={6}>
            						<p style={{ color: '#F89406' }}> Legal: <b>{reviews.score_legal}%</b></p>
            					</Col>
            				</Row>
            				<Row>
            					<Col xs={6}>
            						<ProgressBar bsStyle="warning" now={reviews.score_functionality} />
            					</Col>
            					<Col xs={6}>
            						<p style={{ color: '#F89406' }}> Functionality: <b>{reviews.score_functionality}%</b></p>
            					</Col>
            				</Row>
            				<Row>
            					<Col xs={6}>
            						<ProgressBar bsStyle="warning" now={reviews.score_governance} />
            					</Col>
            					<Col xs={6}>
            						<p style={{ color: '#F89406' }}> Governance: <b>{reviews.score_governance}%</b></p>
            					</Col>
            				</Row>
    				        <hr></hr>
            				<Row>
            					<Col xs={12}>
            						<p>{reviews.review}</p>
            					</Col>
            				</Row>
                        </Grid>
	 				</div> 		
        		</div>
        	)
  		
   }
}

export default ReviewDetail