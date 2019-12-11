import {allServices,addService} from '../../actions/adminActions'
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



class Services extends Component{

   state= {
     flag:null,
     modal:false,
     name:null,
     service_worker:null,
     about:null,
     msg:null,
     msg2:null,
   }

  componentDidMount(){
     this.props.allServices()
  }

  toggle=()=>{
    
    this.setState({
      flag:null,
      flag2:null,
      modal: !this.state.modal,
      msg:null,
      msg2:null
    })
  }

  onChange=(e)=>{
    this.setState({[e.target.name]:e.target.value})
    // console.log(e.target.value)
    if (e.target.name==='name'){
      var k =null;
      var all_services = this.props.services
      for (k in all_services)
        {
          if (all_services[k]["name"]===e.target.value)
          {
            this.setState({msg:'service already exists'})
            
            break
          }
          else{
            this.setState({msg:null})
          }
        }      
    }
    else if (e.target.name==='service_worker'){
      var k =null;
      var all_services = this.props.services
      for (k in all_services)
        {
          if (all_services[k]["service_worker"]===e.target.value)
          {
            this.setState({msg2:'service worker already exists'})
            break
          }
          else{
            this.setState({msg2:null})
          }
        }   
    }
    else{
      this.setState({msg:null,msg2:null})
    }
  }

  onSubmit= (e)=>{
    // e.preventDefault()

     const {name,about,service_worker}=this.state
     const service_added={name,about,service_worker}
     if (service_added!=null){
       
       this.props.addService(service_added)
       this.setState({flag2:true})
     }
 }

  selectService(service){
    this.setState({flag:service})
  }
  render(){
      const services = this.props.services?this.props.services:null;
    if(this.state.flag){
      const url = "/admin/servicetypes/".concat(this.state.flag)
      return <Redirect  to={url} />
    }
      return(
        <div>
          <br/>
            <Button onClick={this.toggle}>Add Service</Button>
            <Modal
        isOpen={this.state.modal}
        toggle={this.toggle}
        >
        <ModalHeader toggle={this.toggle}>Enter the service details</ModalHeader>
        <ModalBody>
        {this.state.msg?<Alert color="danger">{this.state.msg}</Alert> : null}
       
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
         
            <Label for="Service">Service Name</Label>
            <Input
              type="string"
              name="name"
              id="name"
              placeholder ="service name"
              onChange={this.onChange}
            />
            <br/>
            <Label for="about">About Service</Label>
            <Input
              type="textarea"
              name="about"
              id="about"
              placeholder ="about"
              onChange={this.onChange}
            />
            <br/>
            {this.state.msg2?<Alert color="danger">{this.state.msg2}</Alert> : null}
            <Label for="service_worker">Service Worker</Label>
            <Input
              type="string"
              name="service_worker"
              id="service_worker"
              placeholder ="service worker"
              onChange={this.onChange}
            />
            
            {(this.state.msg || this.state.msg2)?' ':
            <Button color="dark" block>
            Add Service
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
            <Col md="3" className="slot_select"  onClick={()=>{this.selectService(item.name)}}>

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

Services.propTypes={
services:PropTypes.object.isRequired,
allServices:PropTypes.func.isRequired,
addService:PropTypes.func.isRequired
}

const mapStateToProps=state=>({
services:state.admin.services
})
    

export default connect(mapStateToProps,{allServices,addService})(Services)