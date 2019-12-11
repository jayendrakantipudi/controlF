import {getserviceType,addServiceType} from '../../actions/adminActions'
import React,{Component} from 'react'
import {connect} from 'react-redux'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  } from 'reactstrap'

  

import {Container,  Row, Col, Table, TabContent, TabPane} from 'reactstrap'
import '../../index.css'
import {
  Redirect
} from "react-router-dom";


import PropTypes from 'prop-types'



class Adminservicetype extends Component{

   state= {
     flag:null,
     modal:false,
     service_type:null,
     cost:null,
     msg:null,
     
   }

  componentDidMount(){
      const { name } = this.props.match.params;
     this.props.getserviceType(name)
  }

  toggle=()=>{
    
    this.setState({
      modal: !this.state.modal,
      msg:null,
      msg2:null
    })
  }

  onChange=(e)=>{
    this.setState({[e.target.name]:e.target.value})
    // console.log(e.target.value)
    if (e.target.name==='service_type'){
      var k =null;
      var service_types = this.props.service_types
      for (k in service_types)
        {
          if (service_types[k]["service_type"]===e.target.value)
          {
            this.setState({msg:'service type already exists'})
            
            break
          }
          else{
            this.setState({msg:null})
          }
        }      
    }
    
    else{
      this.setState({msg:null})
    }
  }

  onSubmit= async(e)=>{
    // e.preventDefault()
     const {name} = this.props.match.params
     const {cost,service_type}=this.state
     const service_added={name,service_type,cost}
     if (service_added!=null){
       const value =  await this.props.addServiceType(service_added)
       this.setState({flag:1})
     }
 }

  
  render(){
      const service_types = this.props.service_types?this.props.service_types:null;
      
      return(
        <div>
          <br/>
            <Button onClick={this.toggle}>Add Service Type</Button>
            <Modal
        isOpen={this.state.modal}
        toggle={this.toggle}
        >
        <ModalHeader toggle={this.toggle}>Enter the service type details</ModalHeader>
        <ModalBody>
        {this.state.msg?<Alert color="danger">{this.state.msg}</Alert> : null}
       
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
         
            <Label for="service_type">Service Type</Label>
            <Input
              type="string"
              name="service_type"
              id="name"
              placeholder ="service type"
              onChange={this.onChange}
            />
            <br/>
            <Label for="service_type">Cost</Label>
            <Input
              type="number"
              name="cost"
              id="cost"
              placeholder ="cost"
              onChange={this.onChange}
            />
            <br/>
            
            {(this.state.msg)?' ':
            <Button color="dark" block>
            Add Service Type
            </Button>
            }
          </FormGroup>
        </Form>
        </ModalBody>
        </Modal>

            <Container>
<br/><br/>
  <Row>
    <Col md="12">
      <h1>Available Service Types</h1>
    </Col>
  </Row>
  <br/>
  <Row>
  <Col md="12">
    <Col md="8" style={{marginLeft:'20%'}}>

        <Container>
          <Row>

          {
              service_types?

              service_types.map((item) => (
            <Col md="3" className="slot_select" >

                <span>{item.service_type}</span>
                
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

Adminservicetype.propTypes={
service_types:PropTypes.object.isRequired,
getserviceType:PropTypes.func.isRequired,
addServiceType:PropTypes.func.isRequired
}

const mapStateToProps=state=>({
service_types:state.admin.service_types
})
    

export default connect(mapStateToProps,{getserviceType,addServiceType})(Adminservicetype)