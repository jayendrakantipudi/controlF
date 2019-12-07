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
import '../styles/homepage.css'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import RegisterModal from './auth/RegisterModal'
import Logout from './auth/Logout'
import LoginModal from './auth/LoginModal'
import {Redirect,Link} from 'react-router-dom'
import CreateProfessional from './CreateProfessional'
import {isProf} from '../actions/profActions'
import {loadUser} from '../actions/authActions'
import {getNotification} from '../actions/notificationActions'
import ReactTimeout from 'react-timeout'
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



async componentDidMount()
{
  await this.props.loadUser();
  this.props.setTimeout(this.getNotifi,100)

}

getNotifi=()=>{
  this.props.getNotification(this.props.auth.user._id)
}


static propTypes ={
  auth: PropTypes.object.isRequired,
  isProfessional:PropTypes.bool,
  isProf:PropTypes.func.isRequired,
  loadUser:PropTypes.func.isRequired,
  getNotification:PropTypes.func.isRequired
  // isProf:PropTypes.func.isRequired
}

toggle=()=>{
  this.setState({
    isOpen: !this.state.isOpen
  });
}

getNoti=(id)=>{
  this.props.getNotification(id)
}
  render(){
    const{isAuthenticated,user}= this.props.auth
    const extraNavbarstyles={color:'black'}
    const authLinks =(
      <Fragment >
        <NavItem>
          <span className="navbar-text mr-3">
            <strong>{user? `Welcome ${user.name}`:null}</strong>
          </span>
        </NavItem>
        <NavItem>
          <Logout/>
        </NavItem>
        <NavItem >
        {this.props.isProfessional?null:<CreateProfessional/>}
        </NavItem>
        <NavItem>
          <NavLink  >
          <Link to="/profile" style={{color:'rgba(255,255,255,.5)'}}>Profile</Link>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink  >
          <Link to="/notifications" onClick={()=>this.getNoti(user._id)} style={{color:'rgba(255,255,255,.5)'}}>Notifications</Link>
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

    const extraNavbar=(
    <Navbar style={{marginTop:'-2%'}}>
    <Container>
    <table style={{marginLeft:'30%'}}>
    <tr style={{cellspacing:'30%'}}>
      <td><Link to="/"><NavbarBrand className="cool-link" style={extraNavbarstyles}>Home </NavbarBrand></Link></td>

      <td><Link to="/servicesdisplay"><NavbarBrand className="cool-link" style={extraNavbarstyles}>Service </NavbarBrand></Link></td>
      <td><Link to="/"><NavbarBrand className="cool-link" style={extraNavbarstyles}>ServiceArea </NavbarBrand></Link></td>
      <td><Link to="/contact"><NavbarBrand className="cool-link" style={extraNavbarstyles}>Contact </NavbarBrand></Link></td>

      <td><Link to="/chat"><NavbarBrand  className="cool-link" style={extraNavbarstyles}>Chatroom </NavbarBrand></Link></td>
    </tr>
    </table>
    </Container>
    </Navbar>
  )
  // if(!this.props.auth.token){
  //   return <Redirect to="/"/>
  // }
    return(
      <div  className='navBar' style={{backgroundColor:'white',boxShadow:'5px 5px 5px #dddddd'}}>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            <Link to="/"><NavbarBrand><span className="head_nav_name">CtrlF</span> </NavbarBrand></Link>
            <NavbarToggler onClick={this.toggle}/>
            {this.state.isOpen}
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {isAuthenticated? authLinks : guestLinks}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
        {isAuthenticated? extraNavbar : null}
      </div>

    )

  }
}
const mapStateToProps = state => ({
  auth:state.auth,
  isProfessional:state.prof.isProfessional
})


export default ReactTimeout(connect(mapStateToProps,{loadUser,getNotification})(AppNavbar))
