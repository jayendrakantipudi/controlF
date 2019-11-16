import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Container, ListGroup, ListGroupItem, Button, Jumbotron} from 'reactstrap';
import { Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink } from 'reactstrap';
import { Card, CardTitle, CardText, Row, Col } from 'reactstrap';
import { Table, TabContent, TabPane} from 'reactstrap';
import classnames from 'classnames';
import store from '../store'
import {loadUser} from '../actions/authActions'
import {loadProf} from '../actions/showprofActions'
import {get_service} from '../actions/serviceActions'
import {Redirect, Link} from "react-router-dom"
import PropTypes from 'prop-types'
import '../index.css'
//import Example from '../components/minNav.js'


class Service extends React.Component{


	state = {
		service:[],
		services: [],
		activeTab: '1',
		serviceWorkers:[]
	}

	componentDidMount(){
		this.props.loadUser();
		const {name} = this.props.match.params;
		console.log(this.props)
		console.log(name)
		this.props.get_service(name);
		this.getServices(name);
		this.getServiceWorkers(name);
	}

	getServiceWorkers = (temp) => {
		var service_clicked = temp;
		var url = 'http://localhost:3000/api/professional/';
		const ser = url.concat(service_clicked)
		fetch(ser)
		 .then(response => response.json())
		 .then(data => this.setState({ serviceWorkers: data }))
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

	onClickProf = (id) => {
		console.log(`wassup ${id}`)
		this.props.loadProf(id);
	}

	render(){
		const service=this.props.service.ser?this.props.service.ser.name:null;
		const use_service=this.props.service.ser;
		const {services} = this.state;
		const br = '\n'
		const worker=this.props.service.ser?this.props.service.ser.service_worker:null;
		// console.log(`checking the serviceWorkers ${this.state.serviceWorkers}`)
		for (var i = this.state.serviceWorkers.length - 1; i >= 0; i--) {
			console.log(this.state.serviceWorkers[i])
		}
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
				<Jumbotron fluid className="jumb2">
					<Container fluid>
						<h1 className="display-3 display-32">{service?service:null}</h1>
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
          {worker?worker:null}s
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
            <Col sm="6" style={Style}>
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

				{this.state.serviceWorkers.map((item, index) => (
					<Col sm="6">
	              <Card body className='card_service'>
	                <CardTitle>
	                	{item.user.name[0].toUpperCase() +  item.user.name.slice(1)}
	                </CardTitle>
	                <CardText>A hardworking and efficient {service?service:null}</CardText>
	                <Link to='/showprofessional'><Button onClick={()=>this.onClickProf(item.user._id)}>View Profile</Button></Link>
	              </Card>
	              <br/>
	              </Col>

				))}



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
								<Button onClick={() => {this.onClickbutton()}}>Choose Services</Button>
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
	loadProf:PropTypes.func.isRequired
}



const mapStateToProps=state=>({
token:state.auth.token,
service:state.service,
})
export default connect(mapStateToProps,{loadUser, loadProf, get_service})(Service)
