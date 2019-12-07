import React,{Component} from 'react'
import {connect} from 'react-redux'
import { Container, Button, Row, Col,} from 'reactstrap'
import {
  Redirect
} from "react-router-dom";



class Admin extends Component{
  state = {
    flag:null
  }
  

  goto(value){
    this.setState({flag:value})
  }

render(){
  if (this.state.flag===1){
    return <Redirect to="/adminservices" />
  }
  if (this.state.flag===2){
    return <Redirect to="/adminslots" />
  }
  if (this.state.flag===3){
    return <Redirect to="/admincities" />
  }
return(
<div>
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
</div>
)
}
}

export default Admin
