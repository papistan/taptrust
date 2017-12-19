import React, { Component } from 'react';
import { Navbar, NavItem, Nav, Grid, Col, Row, Glyphicon } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API = "http://localhost:8000/api/tokens/";

const Navigation = () => {
	return (
    	<div>
    		<Navbar fixedTop collapseOnSelect>
	        	<Navbar.Header>
		            <Navbar.Brand>
		            	<span className= 'brand' style={{ color: 'black', fontSize: '25px' }}>Tokens</span>
		       		</Navbar.Brand>
	          	</Navbar.Header>
	        </Navbar>
    	</div>
    )
}

class Gallery extends Component {
	constructor(props) {
		super(props);

		this.state = {
			api: [],
		};
	}

	componentDidMount(){
        axios.get(API)
	        .then(res => {
	        	const api = res.data;
	        	this.setState({ 
	        		api: api,
	        	});
	        });
	       
    	}

  	render() {
  		let mappedApi = this.state.api.map(token => {
  			return (
    		<div>
    			<Grid>
    				<Link to={ '/' + token.name} style={{ textDecoration: 'none' }}>
    					<div className='gallery'>
		    				<Row>
		    					<h2>{token.name}</h2>
		    				</Row>
    						<Row>
    							<p>{token.description.substr(0,200) + "..."}</p>
		    				</Row>
		    				<Row>
    							<p>age: {token.age}</p>
		    				</Row>
			                <Row>
			                    <Col xs={3}>
			                    	<p style={{ fontWeight: 'bolder' }}>{token.score_overall}%</p>
			                    </Col>
			                    <Col xs={3}>
			                    	<p style={{ color: '#d3d3d3' }}>({token.Reviews.length} Reviews)</p>
			                    </Col>
			                    <Col xs={3}>
			                    	{(token.score_overall > 60) ?
			                    		<p style={{ fontWeight: 'bold', color: 'blue' }}>Trusted</p> : 
			                    		<p style={{ fontWeight: 'bold', color: 'red' }}>Not Trusted</p>
			                    	}
			                    </Col>
			                    <Col xs={3}>
			                    	<p style={{ color: '#b19cd9' }}>{token.category}</p>
			                    </Col>
	                		</Row>
	                	</div>
	                </Link>
	            </Grid>
	            <hr></hr>
        	</div>
        	)
  		})

  			return (
  				<div>
  				<Navigation />
  				{mappedApi}
  				</div>
  			)
   }
}

export default Gallery;