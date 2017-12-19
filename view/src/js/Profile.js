import React, { Component } from 'react';
import { Navbar, NavItem, Nav, Grid, Col, Row, ProgressBar, Glyphicon } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Navigation = () => {
	return (
    	<div>
    		<Navbar fixedTop collapseOnSelect>
	        	<Navbar.Header>
		            <Navbar.Brand>
		            	<Link  to="/">
		            	<Glyphicon glyph="arrow-left" /> Tokens
		            	</Link>
		       		</Navbar.Brand>    	
	          	</Navbar.Header>
	        </Navbar>
    	</div>
    )
}
class Profile extends Component {
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
    		const lastReview = reviews[reviews.length -1] || [ ];
    		const date = new Date(lastReview.createdAt);
			const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];


  			return (
                <div>
                    <Navigation />
                    <Grid>
        				<Row>
        					<Col xs={10}><h2>{token.name}</h2></Col>
        				</Row>
        				<Row>
        					<Col xs={10}><p style={{ color: '#b19cd9' }}>Category: {token.category}</p></Col>
        				</Row>
                        <Row>
                            <Col xs={10}><p>age: {token.age}</p></Col>
                        </Row>
        				<Row>
        					<Col xs={10}><p>{token.description}</p></Col>
        				</Row>
        				<hr></hr>
        				<Row >
        					<Col xs={6}>
        						<div>
        							<h2 className='inline' style={{ fontWeight: 'bold' }}>{token.score_overall} </h2>
        							<p className='inline' style={{ color: '#d3d3d3' }}>/100 overall score</p>
        						</div>
        					</Col>
        					<Col xs={6}>
        						{(token.score_overall > 50) ?
    	                    		<p style={{ fontWeight: 'bold', color: 'blue' }}>Trusted</p> : 
    	                    		<p style={{ fontWeight: 'bold', color: 'red' }}>Not Trusted</p>
    	                    	}
        					</Col>
        				</Row>
        				<Row>
        					<Col xs={10}>
        						<p>From {reviews.length} User Reviews</p>
        					</Col>
        				</Row>
        				<Row>
        					<Col xs={6}>
        						<ProgressBar bsStyle="warning" now={token.score_transparency} />
        					</Col>
        					<Col xs={6}>
        						<p style={{ color: '#F89406' }}> Transparency: <b>{token.score_transparency}%</b></p>
        					</Col>
        				</Row>
        				<Row>
        					<Col xs={6}>
        						<ProgressBar bsStyle="warning" now={token.score_legal} />
        					</Col>
        					<Col xs={6}>
        						<p style={{ color: '#F89406' }}> Legal: <b>{token.score_legal}%</b></p>
        					</Col>
        				</Row>
        				<Row>
        					<Col xs={6}>
        						<ProgressBar bsStyle="warning" now={token.score_functionality} />
        					</Col>
        					<Col xs={6}>
        						<p style={{ color: '#F89406' }}> Functionality: <b>{token.score_functionality}%</b></p>
        					</Col>
        				</Row>
        				<Row>
        					<Col xs={6}>
        						<ProgressBar bsStyle="warning" now={token.score_governance} />
        					</Col>
        					<Col xs={6}>
        						<p style={{ color: '#F89406' }}> Governance: <b>{token.score_governance}%</b></p>
        					</Col>
        				</Row>
        				<div className='review-div'>
        					<Row>
        						<Col xs={6}>
        							<p style={{ fontSize: '30px' }}>{lastReview.score_overall}</p>
        							<p style={{ color: 'grey' }}>Overall Score</p>
        						</Col>
        						<Col xs={6}>
        							<h4>{lastReview.name}</h4>
        							<p>{months[date.getMonth()]} {date.getDate()}, {date.getFullYear()}</p>
        						</Col>
        					</Row>
        					<Row>
        						<Col xs={3}>
        							<p>{lastReview.score_transparency}</p>
        							<p style={{ color: 'grey' }}>Trans-</p>
        							<p style={{ color: 'grey', marginTop: '-15px' }}>parency</p>
        						</Col>
        						<Col xs={3}>
        							<p>{lastReview.score_legal}</p>
        							<p style={{ color: 'grey' }}>Legal Status</p>
        						</Col>
        						<Col xs={3}>
        							<p>{lastReview.score_functionality}</p>
        							<p style={{ color: 'grey' }}>Function-</p>
        							<p style={{ color: 'grey', marginTop: '-15px' }}>ality</p>
        						</Col>
        						<Col xs={3}>
        							<p>{lastReview.score_governance}</p>
        							<p style={{ color: 'grey' }}>Govern-</p>
        							<p style={{ color: 'grey', marginTop: '-15px' }}>ance</p>
        						</Col>
        					</Row>
        					<Row>
        						<Col xs={10}>
        							<p style={{ color: 'gray' }}>{lastReview.review}</p>
        						</Col>
        					</Row>
        				</div>
    					<Row>
    						<Col xs={4} xsOffset={8}>
    							<Link 
    								style={{ color: 'gray', fontWeight: 'bold' }}
    								to={'/' + token.name + '/reviews'}>
    								See all {reviews.length} reviews
    							</Link>
    						</Col>
    					</Row>
    					<hr></hr>
    					<Row>
    						<Col xs={10}>
    							<h3 style={{ paddingBottom: '20px' }}>General Information</h3>
    						</Col>
    					</Row>
    					<Row>
    						<Col xs={6}>
    							<p style={{ color: 'grey' }}>Founder</p>
    						</Col>
    						<Col xs={6}>
    							<p>{token.founders}</p>
    						</Col>
    					</Row>
    					<hr></hr>
    					<Row>
    						<Col xs={6}>
    							<p style={{ color: 'grey' }}>Symbol</p>
    						</Col>
    						<Col xs={6}>
    							<p>{token.symbol}</p>
    						</Col>
    					</Row>
    					<hr></hr>
    					<Row>
    						<Col xs={6}>
    							<p style={{ color: 'grey' }}>Website</p>
    						</Col>
    						<Col xs={6}>
    							<p>{token.website}</p>
    						</Col>
    					</Row>
    				<hr></hr>
    			</Grid>	
        	</div>
        	)
  		
   }
}

export default Profile