import {allServices} from '../actions/adminActions'
import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Container, ListGroup, ListGroupItem, Button, Row, Col, Table, TabContent, TabPane} from 'reactstrap'

import {
  Redirect
} from "react-router-dom";


import PropTypes from 'prop-types'



class Services extends Component{

   state= {
     flag:null
   }

  componentDidMount(){
     this.props.allServices()
  }
  render(){
      const services = this.props.services?this.props.services:null;
      return(
        <div>
            <Button>Add Service</Button>
            <Container>
<br/><br/>
  <Row>
    <Col md="12">
      <h1>Available Services</h1>
    </Col>
  </Row>
  <br/>
  <Row>
  <Col md="12">
    <Col md="8" style={{marginLeft:'20%'}}>

        <Container>
          <Row>

          {
              services?

              services.map((item) => (
            <Col md="3" className="service_select"  onClick={()=>{this.selectService()}}>

                <span>{item.name}</span>
                
            </Col>

          ))

        :null
      }

          </Row>
        </Container>

    </Col>
    </Col>
  </Row>
</Container>

            </div>
      )
  }

}

Services.PropTypes={
services:PropTypes.object.isRequired,
allServices:PropTypes.func.isRequired
}

const mapStateToProps=state=>({
services:state.admin.allServices
})
    

export default connect(mapStateToProps,{allServices})(Services)