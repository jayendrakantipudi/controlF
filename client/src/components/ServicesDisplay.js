import React,{Component} from 'react';
import {Link} from 'react-router-dom'
import {Button, Container, Row, Col} from 'reactstrap'
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
    console.log('services display this is')
    console.log(this.state.all_services);
    return(
      <div>
      <br/>
      <br/>
      <input placeholder="Search for a service..." className="search"></input>
      <button className="search_btn">Search</button>
      <Container>
        <br/><br/><br/><br/>
        <Row style={{textAlign:'center'}}>
          <Col md="12">
          <h3>Related Services</h3>
          </Col>
        </Row>
        <Row style={{textAlign:'center'}}>
          <Col md="12">
            {this.state.all_services.map((item, index) => (
              <Row  style={{textAlign:'center'}}>
              <Col md="12">
                    <Link className="link_sd" to={'/service/'+item.name} style={{textDecoration: 'none',}}>
                      {item.name}
                    </Link>
              </Col>
              </Row>

            ))}
          </Col>
        </Row>
      </Container>
      </div>


    )
  }

}

export default ServicesDisplay
