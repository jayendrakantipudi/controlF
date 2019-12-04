import React,{Component} from 'react';
import {Link} from 'react-router-dom'
import {Button, Container, Row, Col, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText} from 'reactstrap'
import '../styles/serviceDisplay.css'
import ScrollUpButton from "react-scroll-up-button";

class ServicesDisplay extends Component{
  state = {
		all_services:[]
	}
  componentDidMount(){
    this.getAllServices();
  }

  getAllServices = () => {
		fetch('http://localhost:3000/api/service/all')
		 .then(response => response.json())
		 .then(data => this.setState({ all_services: data }))
  }

  render(){
    var mybutton = document.getElementById("myBtn");
    return(
      <div>
      <br/>
      <br/>
      <input placeholder="Search for a service..." className="search"></input>
      <button className="search_btn">Search</button>
      <Container >
        <br/><br/><br/><br/>
        <Row style={{textAlign:'center'}}>
          <Col md="12">
          <h3>Our Services</h3>
          </Col>
        </Row><br/>
        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            <ListGroup style={{textAlign:"left"}}>
            {this.state.all_services.map((item, index) => (
              <ListGroupItem className="listgrp_serdisp">
                <Link className="link_sd" to={'/service/'+item.name} style={{textDecoration:'none'}}>
                  <ListGroupItemHeading>
                      
                        {item.name}
                    
                  </ListGroupItemHeading>
                  <ListGroupItemText>
                    {item.about}
                  </ListGroupItemText>
                </Link>
              </ListGroupItem>
            ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
      <br/><br/><br/><br/>
      </div>


    )
  }

}

export default ServicesDisplay
