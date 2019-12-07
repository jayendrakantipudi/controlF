import React,{Component} from 'react';
import { Jumbotron } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import '../index.css';
import img1 from '../assets/img1_forHome.jpg';
import img_row2_col1 from '../assets/service.png';
import carpenter from '../assets/carpenter.jpg';
import plumber from '../assets/plumber.jpg';
import electrician from '../assets/electrician.jpg';
import hair_stylist from '../assets/hair_stylist.jpg';
import {Redirect, Link} from "react-router-dom"

import { FaTools, FaWallet, FaClock, FaMapMarkedAlt } from 'react-icons/fa';


class HomePageContent extends Component{
  render(){
    return(
    <div className="hpc">
	  <Jumbotron className="mainSlide">
        <h1 className="display-3 display-31">CtrlF</h1>
        <p className="lead lead1">Find Your Service</p>
        <br/>
        <br/>
      </Jumbotron>
	  <br/><br/>
		<Container>
			<Row>
				<Col md="12">
					<h4>Why Us?</h4>
					<hr className="summary_stype_underline1" />
				</Col>
			</Row>
			<br/><br/>
			<Row className="to_check1">
				<Col md="4">
					<img src={img1} className="img1"/>
				</Col>
				<Col md="8">

					<b>CtrlF</b> is recognized as the fastest-growing startup in India. We are a mobile marketplace for local services. We help customers hire trusted professionals for all their service needs. We are staffed with young, passionate people working tirelessly to make a difference in the lives of people by catering to their service needs at their doorsteps. We provide housekeeping services which consist of Plumbers, Electricians, Carpenters, Cleaning and Pest Control. We also provide personal services like beauty, spa, mobile and other appliance repairs etc. Be it getting a plumbing job done, improving your fitness through yoga, learning to play the guitar, decorating your home or getting candid photos of your wedding clicked, we are a sure shot destination for your service needs.
				</Col>
			</Row>
			<br/><br/><br/><br/><br/><br/><br/><br/>
			<Row>
				<Col md="12">
					<h4>Our Services</h4>
					<hr className="summary_stype_underline1" />
				</Col>
			</Row>
			<br/><br/>
			<Row>

				<Col md="3" className="hpc_row2">
        <Link className="hpc_row2_link" to="/service/Carpentry">
					<br/>
					<img src={carpenter} className="img2"/>	<br/><br/>
          </Link>
          <span className="hpc_img_name">Carpenter</span>

        </Col>


        <Col md="3" className="hpc_row2">
        <Link className="hpc_row2_link" to="/service/Plumbing">
					<br/>
					<img src={plumber} className="img2"/>	<br/><br/>
          </Link>
					<span className="hpc_img_name">Plumber</span>

        </Col>


        <Col md="3" className="hpc_row2">
        <Link className="hpc_row2_link" to="/service/Electrician">
					<br/>
					<img src={electrician} className="img2"/>	<br/><br/>
          </Link>
					<span className="hpc_img_name">Electrician</span>

        </Col>


        <Col md="3" className="hpc_row2">
        <Link className="hpc_row2_link" to="/service/Saloon and Spa">
					<br/>
					<img src={hair_stylist} className="img2"/>	<br/><br/>
          </Link>
					<span className="hpc_img_name">Hair Stylist</span>

        </Col>

			</Row>
			<br/><br/><br/><br/><br/><br/><br/><br/>
			<Row>
				<Col md="12">
					<h4>How to book a Service</h4>
					<hr className="summary_stype_underline1" />
				</Col>
			</Row>
			<br/><br/>
			<Row className="row2">
				<Col md="3">

				<Card className="row2_col h-100">
				<br/><br/>
				<span><FaTools className="icons" /></span>
					<CardBody>
					  <CardTitle>Step 1</CardTitle>
					  <CardSubtitle><b>Select Service</b></CardSubtitle>
					  <CardText>Select your desired service and type of services that you want to book.</CardText>
					</CardBody>
				  </Card>
				</Col>
				<Col md="3">
				<Card className="row2_col  h-100">
				<br/><br/>
				<span><FaMapMarkedAlt className="icons" /></span>
					<CardBody>
					  <CardTitle>Step 2</CardTitle>
					  <CardSubtitle><b>Select City</b></CardSubtitle>
					  <CardText>Select the city you live in to avail our services</CardText>
					</CardBody>
				  </Card>
				</Col>
				<Col md="3">
				<Card className="row2_col  h-100">
				<br/><br/>
				<span><FaClock className="icons" /></span>
					<CardBody>
					  <CardTitle>Step 3</CardTitle>
					  <CardSubtitle><b>Choose a Slot</b></CardSubtitle>
					  <CardText>Make a feasible and undisturbed slot of your choice.</CardText>
					</CardBody>
				  </Card>
				</Col>
				<Col md="3">
				<Card className="row2_col  h-100">
				<br/><br/>
				<span><FaWallet className="icons" /></span>
					<CardBody>
					  <CardTitle>Step 4</CardTitle>
					  <CardSubtitle><b>Make Payment</b></CardSubtitle>
					  <CardText>Go through the payment process and wait for your assigned professional to arrive at your doorbell.</CardText>
					</CardBody>
				  </Card>
				</Col>
			</Row>
			<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
			<Row>
				<Col md="12">
					<h4>Our Customer Reviews</h4>
					<hr className="summary_stype_underline1" />
				</Col>
			</Row>
			<br/>
			<Row>
				<Col>
					<ListGroup>
					  <ListGroupItem>
						<ListGroupItemText>
						<i>" Great service by plumber Lokesh Reddy. Fixed the problems with ease."</i>
						</ListGroupItemText>
						- <b>Mahesh Babu</b>
					  </ListGroupItem>
					  <ListGroupItem>
						<ListGroupItemText>
						<i>" With the help of CtrlF I started getting many opportunities and earn more."</i>
						</ListGroupItemText>
						- <b>Prakash Malhotra</b>
					  </ListGroupItem>
					  <ListGroupItem>
						<ListGroupItemText>
						<i>" Made my job easier to make a slot at my convenient time to avail the service "</i>
						</ListGroupItemText>
						- <b>Yashwanth Bhogadi</b>
					  </ListGroupItem>
					</ListGroup>
				</Col>
			</Row>
		</Container>
	</div>
    )
  }

}

export default HomePageContent
