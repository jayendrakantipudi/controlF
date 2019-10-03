import React,{Component,Fragment} from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from 'reactstrap'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import RegisterModal from './auth/RegisterModal'
import Logout from './auth/Logout'
import LoginModal from './auth/LoginModal'
import {Link} from 'react-router-dom'
import CreateProfessional from './CreateProfessional'
import {isProf} from '../actions/profActions'
class AppNavbar extends Component{
// componentDidUpdate(){
//   this.props.isProf()
// }
constructor(props){
  super(props)
  this.state={
    isOpen:false
  }
  // this.toggle=this.toggle.bind(this)
}

static propTypes ={
  auth: PropTypes.object.isRequired,
  isProfessional:PropTypes.bool,
  // isProf:PropTypes.func.isRequired
}

toggle=()=>{
  this.setState({
    isOpen: !this.state.isOpen
  });
}
  render(){
    const{isAuthenticated,user}= this.props.auth

    const authLinks =(
      <Fragment>
        <NavItem>
          <span className="navbar-text mr-3">
            <strong>{user? `Welcome ${user.name}`:null}</strong>
          </span>
        </NavItem>
        <NavItem>
          <Logout/>
        </NavItem>
        <NavItem>
        {this.props.isProfessional?null:<CreateProfessional/>}
        </NavItem>
        <NavItem>
          <NavLink  >
          <Link to="/profile">Profile</Link>
          </NavLink>
        </NavItem>
      </Fragment>
    )

    const guestLinks=(
      <Fragment>
        <NavItem>
          <RegisterModal/>
        </NavItem>
        <NavItem>
          <LoginModal/>
        </NavItem>
      </Fragment>
    )

    return(
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            <NavbarBrand href="/">CtrlF </NavbarBrand>
            <NavbarToggler onClick={this.toggle}/>
            {this.state.isOpen}
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {isAuthenticated? authLinks : guestLinks}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>

    )

  }
}
const mapStateToProps = state => ({
  auth:state.auth,
  isProfessional:state.prof.isProfessional
})


export default connect(mapStateToProps,)(AppNavbar)
