import React,{Component} from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert,
  } from 'reactstrap'
  import {
    Redirect
  } from "react-router-dom";
  
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import {createProfessional} from '../actions/profActions'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {clearErrors} from '../actions/errorActions'
import {isProf,getProfessions} from '../actions/profActions'

class CreateProfessional extends Component{
  componentDidMount()
  {
    console.log('mounted');
    this.props.isProf()
    this.props.getProfessions()
  }
  state={
    profession:'carpenter',
    phonenumber:null,
    msg:null,
    flag:null
  }
  static propTypes ={
    isAuthenticated:PropTypes.bool,
    isProfessional:PropTypes.bool,
    isProf:PropTypes.func.isRequired,
    error:PropTypes.object.isRequired,
    createProfessional:PropTypes.func.isRequired,
    clearErrors:PropTypes.func.isRequired,
    getProfessions:PropTypes.func.isRequired,
    professions:PropTypes.array.isRequired
  }

  componentDidUpdate(prevProps){
    const {error} =this.props
    if(error !==prevProps.error){
      // console.log('HERE');
      if(error.id === 'CREATE_PROFESSIONAL_FAIL'){
        this.setState({msg:error.msg})
      }else{
        this.setState({msg:null})
      }
    }

    if(this.state.modal){
      if(this.props.isProfessional){
        this.toggle()
      }
    }
  }

  toggle=()=>{
    this.props.clearErrors()
    this.setState({
      modal: !this.state.modal
    })
  }

  onChange=(e)=>{
    this.setState({[e.target.name]:e.target.value})
  }

  handleChange = (value) => {
    this.setState({
        profession: value
    });
  }
  onSubmit= async(e)=>{
     // e.preventDefault()

      const{profession,phonenumber}=this.state
      const user=this.props.user
      const professional={user,profession,phonenumber}

      const value = await this.props.createProfessional(professional)
      
      this.setState({flag:1})
  }
  render(){
    if(this.state.flag){
      return <Redirect to="/professional/location" />;
    }
    return(
      <div>
      <NavLink onClick={this.toggle} href="#" >
      Become Professional
      </NavLink>
        <Modal
        isOpen={this.state.modal}
        toggle={this.toggle}
        >
        <ModalHeader toggle={this.toggle}>Login</ModalHeader>
        <ModalBody>
        {this.state.msg?<Alert color="danger">{this.state.msg}</Alert> : null}
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
          <DropdownButton id="dropdown-basic-button" title={this.state.profession}>
           { 
            this.props.professions?
            this.props.professions.map((item) => (
            <Dropdown.Item value={item} onSelect={()=>{this.handleChange(item)}} >{item}</Dropdown.Item>
            )
            )
            : null
          }
          </DropdownButton>
            <Label for="phonenumber">phonenumber</Label>
            <Input
              type="string"
              name="phonenumber"
              id="phonenumber"
              placeholder ="phonenumber"
              onChange={this.onChange}
            />
            <Button color="dark" block>
            Become professional
            </Button>
          </FormGroup>
        </Form>
        </ModalBody>
        </Modal>
      </div>
    )
  }
}

  const mapStateToProps = state =>({
    user:state.auth.user,
    error:state.error,
    isProfessional:state.prof.isProfessional,
    professions:state.prof.professions
  })

  export default connect(mapStateToProps,{ createProfessional, clearErrors,isProf,getProfessions})(CreateProfessional)
