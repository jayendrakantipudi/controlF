import React,{Component} from 'react'
import {connect} from 'react-redux'
import { Container, Button, Row, Col,} from 'reactstrap'
import {
  Redirect
} from "react-router-dom";
import AppNavbar from'./AppNavbar';
import Footer from './Footer'



class Admin extends Component{
  state = {
    flag:null,
    details:[]
  }


  goto(value){
    this.setState({flag:value})
  }

  componentDidMount(){
    this.getDetails();
  }

  getDetails = () => {
		fetch('http://localhost:3000/api/users/adetails')
		 .then(response => response.json())
     .then(data => this.setState({ details: data }))
  }

render(){
  console.log(this.state.details)
  if (this.state.flag===1){
    return <Redirect to="/admin/services" />
  }
  if (this.state.flag===2){
    return <Redirect to="/admin/slots" />
  }
  if (this.state.flag===3){
    return <Redirect to="/admin/cities" />
  }
return(
<div>
<AppNavbar />
<Container>
<br/><br/>
  <Row>
    <Col md="12">
      <h1>Admin Page</h1>
    </Col>
  </Row>
  <br/>
  <Row>
  <Col md="12">
    <Col md="8" style={{marginLeft:'20%'}}>

        <Container>
          <Row>
          <Col md="3" className="slot_select" >

          <span>Total Users {this.state.details.no_users?this.state.details.no_users:null}</span>

          </Col>
          <Col md="3" className="slot_select" >

          <span>Total Professionals {this.state.details.no_professionals?this.state.details.no_professionals:null}</span>

          </Col>
          <Col md="3" className="slot_select" >

          <span>Total Orders {this.state.details.no_orders?this.state.details.no_orders:null}</span>

          </Col>
            <Col md="3" className="slot_select"  onClick={()=>{this.goto(1)}}>

                <span>Services</span>

            </Col>

            <Col md="3" className="slot_select"  onClick={()=>{this.goto(2)}}>

                <span>Slots</span>

            </Col>

            <Col md="3" className="slot_select"  onClick={()=>{this.goto(3)}}>

                <span>Cities</span>

            </Col>


          </Row>
        </Container>

    </Col>
    </Col>
  </Row>
</Container>
<Footer>
<Footer/>
</Footer>
</div>
)
}
}

export default Admin
