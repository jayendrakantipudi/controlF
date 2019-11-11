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
  Alert
} from 'reactstrap'
import {createProfessional} from '../actions/profActions'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {clearErrors} from '../actions/errorActions'
import {isProf} from '../actions/profActions'

class CreateProfessional extends Component{

  state={
    profession:null,
    phonenumber:null,
    msg:null
  }
  static propTypes ={
    isAuthenticated:PropTypes.bool,
    isProfessional:PropTypes.bool,
    isProf:PropTypes.func.isRequired,
    error:PropTypes.object.isRequired,
    createProfessional:PropTypes.func.isRequired,
    clearErrors:PropTypes.func.isRequired
  }

  componentDidMount(){
    this.props.isProf();
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

  onSubmit=(e)=>{
      e.preventDefault()

      const{profession,phonenumber}=this.state
      const user=this.props.user
      const professional={user,profession,phonenumber}

      this.props.createProfessional(professional)
  }
  render(){
    return(
      <div>
      <NavLink onClick={this.toggle} href="#" >
      Become Professional
      </NavLink>
        <Modal
        isOpen={this.state.modal}
        toggle={this.toggle}
        >
        <ModalHeader toggle={this.toggle}>Enter your professional details</ModalHeader>
        <ModalBody>
        {this.state.msg?<Alert color="danger">{this.state.msg}</Alert> : null}
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Label for="profession">Profession</Label>
            <Input
              type="text"
              name="profession"
              id="profession"
              placeholder ="profession"
              onChange={this.onChange}
            />
            <Label for="phonenumber">phonenumber</Label>
            <Input
              type="string"
              name="phonenumber"
              id="phonenumber"
              placeholder ="phonenumber"
              onChange={this.onChange}
            />
            <br/>
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
  })

  export default connect(mapStateToProps,{ createProfessional, clearErrors,isProf})(CreateProfessional)
