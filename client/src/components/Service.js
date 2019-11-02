import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Container, ListGroup, ListGroupItem, Button, Jumbotron} from 'reactstrap';
import { Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink } from 'reactstrap';
import { Card, CardTitle, CardText, Row, Col } from 'reactstrap';
import { Table, TabContent, TabPane} from 'reactstrap';
import classnames from 'classnames';
import store from '../store'
import {loadUser} from '../actions/authActions'
import {get_service} from '../actions/serviceActions'
import {Redirect} from "react-router-dom"
import PropTypes from 'prop-types'
//import Example from '../components/minNav.js'


class Service extends React.Component{
	

	state = {
		service:[],
		services: [],
		activeTab: '1'	
	}

	componentDidMount(){
		console.log('Mounted');

		this.props.loadUser();
		const {name} = this.props.match.params;
		// this.setState({get_ser: name});
		console.log(this.props)
		console.log(name)
		this.props.get_service(name);
		//this.getService(name);
		this.getServices(name);
	}

	
	



	getService = (temp) => {
		var service_clicked = temp;
		var url = 'http://localhost:3000/api/service/';
		const ser = url.concat(service_clicked)
		fetch(ser)
		 .then(response => response.json())
		 .then(data => this.setState({ service: data }))
	}

	getServices = (temp) => {
		var service_clicked = temp;
		var url = 'http://localhost:3000/api/serviceType/';
		const ser = url.concat(service_clicked)
		fetch(ser)
		 .then(response => response.json())
		 .then(data => this.setState({ services: data }))
	}

	 toggle = tab => {
		if(this.state.activeTab !== tab) this.setState({activeTab:tab});
		}


	onClickbutton = () => {
		const { name } = this.props.match.params;
		const url1 = '/service/';
		const url2 = name;
		const url3 = '/services';
		const ser = url1.concat(url2).concat(url3)
	    window.location.href=ser;
	}
			   		 	  	  	   	
	render(){
		const service=this.props.service.ser?this.props.service.ser.name:null;
		const use_service=this.props.service.ser;
		const {services} = this.state;
		const br = '\n'

		console.log(`checking the activeTab after dooing so much ${this.state.activeTab}`)

		if (!this.props.token) {
			// Logout
			return <Redirect to="/" />;
		}
		const Style = {
			textAlign:'left'
		};
		

		return(
			<div>
			<div className='jumb'>
				<Jumbotron fluid>
					<Container fluid>
						<h1 className="display-3">{service?service:null}</h1>
					</Container>
				</Jumbotron>

				<Row>
					<Col sm="1"></Col>
					<Col sm="6">
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: this.state.activeTab === '1' })}
            onClick={() => { this.toggle('1'); }}
          >
            About
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            className={classnames({ active: this.state.activeTab === '2'})}
            onClick={() => { this.toggle('2') }}
          >
          {service?service:null}
          </NavLink>


        </NavItem>

        <NavItem>
          <NavLink
            className={classnames({ active: this.state.activeTab === '3' })}
            onClick={() => { this.toggle('3'); }}
          >
            Reviews
          </NavLink>


        </NavItem>

        <NavItem>
          <NavLink
            className={classnames({ active: this.state.activeTab === '4'})}
            onClick={() => { this.toggle('4') }}
          >
            Serivces
          </NavLink>


        </NavItem>



      </Nav>
      <TabContent activeTab={this.state.activeTab}>
        <TabPane tabId="1">
		
		<br/>
          <Row>
            <Col sm="4" style={Style}>
              <h2>About {use_service?use_service.service_worker:null}</h2>
            </Col>

            <Col sm="11" style={Style}>
             {use_service?use_service.about:null}
            </Col>			
		  </Row>
        </TabPane>
        <TabPane tabId="2">
		<br />
          <Row>
            <Col sm="6">
              <Card body>
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                <Button>Go somewhere</Button>
              </Card>
            </Col>
            <Col sm="6">
              <Card body>
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                <Button>Go somewhere</Button>
              </Card>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="4">
		
          <Row>
            <Col sm="12">

	<Table>
      <thead>
        <tr>
          <th>Service Type</th>
          <th>Price (INR)</th>
        </tr>
      </thead>
      <tbody>


	  {this.state.services.map((item) => (
		<tr>
			<td>{item.service_type}</td>
			<td>{item.cost}</td>
		</tr>
		))}





      </tbody>
    </Table>

            </Col>

          </Row>
        </TabPane>
      </TabContent>
					</Col>
					<Col sm="3">
						<Card body>
							<CardTitle>Need {service?service:null} for	</CardTitle>
							
								<Button onClick={this.onClickbutton}>Choose Services</Button>
						</Card>
					</Col>
				</Row>
							
			</div>

			</div>
		)
	}
}

Service.propTypes={
	loadUser:PropTypes.func.isRequired,
	token:PropTypes.string.isRequired,
	get_service:PropTypes.func.isRequired,
	service:PropTypes.object.isRequired,
}



const mapStateToProps=state=>({
token:state.auth.token,
service:state.service,
})
export default connect(mapStateToProps,{loadUser, get_service})(Service)