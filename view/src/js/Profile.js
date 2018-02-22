import React, { Component } from 'react';
import { Navbar, NavItem, Nav, Grid, Col, Row, ProgressBar, Glyphicon, Label } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from './Loading';

const Navigation = () => {
	return (
    	<div>
    		<Navbar fixedTop collapseOnSelect>
	        	<Navbar.Header>
		            <Navbar.Brand>
		            	<Link  to="/">
		            	<Glyphicon glyph="chevron-left" />Tokens
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
            const lastReviewHTML = () => {return {__html: lastReview.review}};
            if (this.state.loading) {
                return <Loading />
            } else {
                 return (
                    <div>
                        <Navigation />
                        <Grid>
            				<Row>
            					<Col sm={10} style={{ fontWeight: 'bold' }}><h1>{token.name}</h1></Col>
            				</Row>
            				<Row>
            					<Col sm={10}><p style={{ color: '#b19cd9', fontSize: "16px",textTransform: "capitalize" }}>Category: {token.category}</p>
                                            <p style={{ color: '#b19cd9', marginTop: "-10px", fontSize: "16px" }}>Age: {token.age}</p>
                                </Col>
            				</Row>
            				<Row>
            					<Col sm={10}><p>{token.description}</p></Col>
            				</Row>
            				<hr></hr>
            				<Row>
            					<Col sm={10} className="inline">
									<div className="space-between">
            							<span><h2 className='inline' style={{ fontWeight: 'bold' }}>{token.score_overall} </h2>
            							<p className='inline' style={{ color: 'grey', fontWeight:"bold" }}>/100 overall score</p></span>
										
										{(token.score_overall > 50) ?
        	                    		<p style={{ fontSize: "16px", display: "inline", textAlign: "right" }}><Label className="trusted">
                                                <Glyphicon glyph="ok-circle" /> Trusted
                                            </Label></p> : 
                                        <p style={{ fontSize: "16px", display: "inline", textAlign: "right" }}><Label className="not-trusted">
                                                <Glyphicon glyph="remove-circle" /> Not Trusted
                                            </Label></p>
										}
									</div>
            					</Col>
            				</Row>
            				<Row>
            					<Col sm={12}>
            						<p style={{ fontWeight: "bold" }}>From {reviews.length} User Reviews</p>
            					</Col>
            				</Row>
            				<Row>
            					<Col sm={7}>
            						<ProgressBar bsStyle="warning" now={token.score_transparency} />
            					</Col>
            					<Col sm={5}>
            						<span className="text-nowrap inline"><p style={{ color: '#FFCC11' }}> Transparency: <b>{token.score_transparency}%</b></p></span>
            					</Col>
            				</Row>
            				<Row>
            					<Col sm={7}>
            						<ProgressBar bsStyle="warning" now={token.score_legal} />
            					</Col>
            					<Col sm={5}>
            						<span className="text-nowrap inline"><p style={{ color: '#FFCC11' }}> Legal Status: <b>{token.score_legal}%</b></p></span>
            					</Col>
            				</Row>
            				<Row>
            					<Col sm={7}>
            						<ProgressBar bsStyle="warning" now={token.score_functionality} />
            					</Col>
            					<Col sm={5}>
            						<span className="text-nowrap inline"><p style={{ color: '#FFCC11' }}> Functionality: <b>{token.score_functionality}%</b></p></span>
            					</Col>
            				</Row>
            				<Row>
            					<Col sm={7}>
            						<ProgressBar bsStyle="warning" now={token.score_governance} />
            					</Col>
            					<Col sm={5}>
            						<span className="text-nowrap inline"><p style={{ color: '#FFCC11' }}> Governance: <b>{token.score_governance}%</b></p></span>
            					</Col>
            				</Row>
            				<div className='review-div'>
            					<Row>
            						<Col sm={7}>
            							<p style={{ fontSize: '30px' }}>{lastReview.score_overall}</p>
            							<p style={{ color: 'grey' }}>Overall Score</p>
            						</Col>
            						<Col sm={5}>
            							<h4>{lastReview.name}</h4>
            							<p>{months[date.getMonth()]} {date.getDate()}, {date.getFullYear()}</p>
            						</Col>
            					</Row>
            					<Row>
            						<Col sm={3}>
            							<p>{lastReview.score_transparency}</p>
            							<p style={{ color: 'grey' }}>Transparency</p>
            						</Col>
            						<Col sm={3}>
            							<p>{lastReview.score_legal}</p>
            							<span className="text-nowrap"><p style={{ color: 'grey' }}>Legal Status</p></span>
            						</Col>
            						<Col sm={3}>
            							<p>{lastReview.score_functionality}</p>
            							<p style={{ color: 'grey' }}>Functionality</p>
            						</Col>
            						<Col sm={3}>
            							<p>{lastReview.score_governance}</p>
            							<p style={{ color: 'grey' }}>Governance</p>
            						</Col>
            					</Row>
            					<Row>
            						<Col sm={12}>
                                            {(lastReview.review.length > 250) ?
                                                <p style={{ color: 'grey' }}>{lastReview.review.substr(0,250) + "..."}</p> :
                                                <p style={{ color: 'grey' }}> {lastReview.review}</p>
                                            }   
            						</Col>
            					</Row>
            				</div>
        					<Row>
        						<Col sm={4} xsOffset={8}>
        							<Link 
        								style={{ color: 'grey', fontWeight: 'bold' }}
        								to={'/' + token.name + '/reviews'}>
        								See all {reviews.length} reviews
        							</Link>
        						</Col>
        					</Row>
        					<hr></hr>
        					<Row>
        						<Col sm={10}>
        							<h3 style={{ paddingBottom: '20px' }}>General Information</h3>
        						</Col>
        					</Row>
        					<Row>
        						<Col sm={6}>
        							<p style={{ color: 'grey' }}>Founder</p>
        						</Col>
        						<Col sm={6}>
        							<p>{token.founders}</p>
        						</Col>
        					</Row>
        					<hr></hr>
        					<Row>
        						<Col sm={6}>
        							<p style={{ color: 'grey' }}>Symbol</p>
        						</Col>
        						<Col sm={6}>
        							<p>{token.symbol}</p>
        						</Col>
        					</Row>
        					<hr></hr>
        					<Row>
        						<Col sm={6}>
        							<p style={{ color: 'grey' }}>Website</p>
        						</Col>
        						<Col sm={6}>
        							<a style={{ fontWeight: 'bold', color: 'gray' }} href={ "http://" + token.website }>{token.website}</a>
        						</Col>
        					</Row>
        				<hr></hr>
        			</Grid>	
            	</div>
            	)
  		}
   }
}

export default Profile