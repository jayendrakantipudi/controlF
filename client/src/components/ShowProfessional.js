import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Container, Row, Col, ListGroup, ListGroupItem, Button, Table} from 'reactstrap'
import store from '../store'
import {loadUser} from '../actions/authActions'
import {
  Redirect
} from "react-router-dom";
import AppNavbar from'./AppNavbar';
import Footer from './Footer'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle
} from 'reactstrap';
import hair_stylist from '../assets/hair_stylist.jpg';

import PropTypes from 'prop-types'



class ShowProfessional extends Component{

  state = {
    professional:null
  }
  componentDidMount(){
     this.props.loadUser()
  }


render(){
const data=this.props.prof_details?this.props.prof_details:null;
console.log(this.props.prof_details)
if(data){
console.log(this.props.prof_details)
var name=data[0];
var email=data[1];
var locality=data[2][3];
var profession=data[3];
var phonenumber=data[4];
var image=data[5]
}

if (!this.props.token) {
    // Logout
      return <Redirect to="/" />;
    }
return(
<div>
<AppNavbar />

<br/><br/>

<div style={{fontSize:'200%'}}>
  Professional Profile<br/><br/>
</div>
<Container>
  <Row>
    <Col md={{size:4, offset:4}}>
      <Card>
        <img top width="100%" height="200px" src={image} alt="Card image cap" />
        <CardBody>
          <CardTitle><h3>{data?name:null}</h3></CardTitle>
          <CardText>
            <Table borderless>
              <tr>
                <td>Profession</td>
                <td>{profession}</td>
              </tr>
              <tr>
                <td>Contact</td>
                <td>{phonenumber}</td>
              </tr>
              <tr>
                <td>E-Mail</td>
                <td>{email}</td>
              </tr>
              <tr>
                <td>Locality</td>
                <td>{locality}</td>
              </tr>
            </Table>

          </CardText>
        </CardBody>
      </Card>
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

ShowProfessional.propTypes={
  user:PropTypes.object.isRequired,
  loadUser:PropTypes.func.isRequired,
  token:PropTypes.string,
  prof_details:PropTypes.object.isRequired
}

const mapStateToProps=state=>({
user:state.auth.user,
token:state.auth.token,
prof_details:state.showProf.prof_details
})
export default connect(mapStateToProps,{loadUser})(ShowProfessional)
