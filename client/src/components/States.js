import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Container, ListGroup, ListGroupItem, Button, Row, Col, Table, TabContent, TabPane} from 'reactstrap'
import {getCities,setLocation} from '../actions/locationAction'
import '../index.css'
import AppNavbar from'./AppNavbar';
import Footer from './Footer'

import {
  Redirect
} from "react-router-dom";
import PropTypes from 'prop-types'


class States extends Component{

   state= {
     flag:null

   }

  componentDidMount(){
     this.props.getCities()
  }

  bookslot =  (city,lat,lng) => {
    this.props.setLocation(city,lat,lng);
    this.setState({flag:true})
  }

render(){
 const cities_available = this.props.cities?this.props.cities:null;
if (!this.props.token) {
      return <Redirect to="/" />;
    }

if (this.state.flag){
  return <Redirect to="/marker" />;
}
return(

<div >
<AppNavbar />
<br/><br/><br/>

<Container>
<Row>
  <Col md="12">
    <h3  style={{marginRight:'10%'}}>Select City</h3>
  </Col>
</Row>
<Row>
<Col md="6" style={{marginLeft:'20%'}}>
  <Container>
    <Row>

    {

        cities_available?
        cities_available.map((item) => (
          item?
          <Col md="3" style={{marginTop:'5%'}}>
        <Button variant="light" className="sc_btn"  onClick={()=>{this.bookslot(item.city,item.lat,item.lng)}} >{item.city}
            </Button>
            </Col>

         :
         null

        ))
      :
      null

    }
    </Row>
  </Container>
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

States.propTypes={
  token:PropTypes.string,
  getCities:PropTypes.func.isRequired,
  all_cities:PropTypes.string.isRequired,
  setLocation:PropTypes.func.isRequired
}

const mapStateToProps=state=>({
token:state.auth.token,
cities:state.booking.all_cities
})
export default connect(mapStateToProps,{getCities, setLocation})(States)
