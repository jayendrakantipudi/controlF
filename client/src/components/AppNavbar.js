import React,{Component,Fragment} from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
} from 'reactstrap'
import Container1 from './Container1'
import NotificationAlert from "react-notification-alert";
import '../styles/homepage.css'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import RegisterModal from './auth/RegisterModal'
import Logout from './auth/Logout'
import LoginModal from './auth/LoginModal'
import {Redirect,Link} from 'react-router-dom'
import CreateProfessional from './CreateProfessional'
import {updateAvailable} from '../actions/profActions'
import {isProf} from '../actions/profActions'
import {loadUser} from '../actions/authActions'
import {getNotification,newNotifications} from '../actions/notificationActions'
import ReactTimeout from 'react-timeout'
import Button from 'react-bootstrap/Button';
import { isAvailable } from '../actions/profActions'
class AppNavbar extends Component{
// componentDidUpdate(){
//   this.props.isProf()
// }
constructor(props){
  super(props)
  this.state={
    isOpen:false,
  }
  // this.toggle=this.toggle.bind(this)
}

async componentDidMount()
{
  await this.props.loadUser();
  this.props.isAvailable();
  this.props.isProf()
  if(this.props.auth.user)
  this.props.newNotifications(this.props.auth.user._id)
  this.props.setTimeout(this.getNotifi,100)
  this.timer = setInterval(() =>this.props.auth.user? this.props.newNotifications(this.props.auth.user._id):null, 1000);
}

componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
    }

componentDidUpdate(){
  this.props.isAvailable();
  if(this.props.auth.user)
  {this.props.newNotifications(this.props.auth.user._id)}
}


static propTypes ={
  auth: PropTypes.object.isRequired,
  isProfessional:PropTypes.bool,
  isProf:PropTypes.func.isRequired,
  loadUser:PropTypes.func.isRequired,
  getNotification:PropTypes.func.isRequired,
  count:PropTypes.number.isRequired,
  newNotifications:PropTypes.func.isRequired,
  isAvailable:PropTypes.func.isRequired,
  is_available:PropTypes.object.isRequired,
  updateAvailable:PropTypes.func.isRequired,
  isProf:PropTypes.func.isRequired
}

toggle=()=>{
  this.setState({
    isOpen: !this.state.isOpen
  });
}

Updateavailable = () =>{
  const id = this.props.auth.user._id
  this.props.updateAvailable(id);
}

getNoti=(id)=>{
  this.props.getNotification(id)
}
  render(){
    const{isAuthenticated,user}= this.props.auth
    const extraNavbarstyles={color:'black'}
    const style1 = {backgroundColor:'green'}
    const style2 = {backgroundColor:'red'}
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
        {this.props.isProfessional? this.props.is_available?<Button  style={{marginLeft:'1%',width:'100px'}} variant="success" onClick={this.Updateavailable}>Available</Button>:<Button style={{width:'100px',marginLeft:'1%'}}  variant="danger" onClick={this.Updateavailable}>Busy</Button>
          :<CreateProfessional/>}
        </NavItem>
        <NavItem>
          <NavLink  >
          <Link to="/profile" style={{color:'rgba(255,255,255,.5)'}}>Profile</Link>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink  >
          <Link to="/notifications" className="notification" onClick={()=>this.getNoti(user._id)} style={{color:'rgba(255,255,255,.5)'}}><i className="fas fa-bell"></i> <span className="badge" style={{display:this.props.count?'block':'none'}} onChange={()=>this.notify("tr")}>{this.props.count}</span></Link>
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
    <Navbar style={{marginTop:'-2%',marginLeft:'10%',fontFamily: 'Yanone Kaffeesatz, sans-serif'}}>
    <Container>
    <table style={{marginLeft:'29%'}}>
    <tr style={{cellspacing:'30%'}}>
      <td><Link to="/"><NavbarBrand className="cool-link" style={extraNavbarstyles}>Home </NavbarBrand></Link></td>

      <td><Link to="/servicesdisplay"><NavbarBrand className="cool-link" style={extraNavbarstyles}>Service </NavbarBrand></Link></td>
      <td><Link to="/mybookings"><NavbarBrand className="cool-link" style={extraNavbarstyles}>My Bookings </NavbarBrand></Link></td>
      <td><Link to="/mypendingorders"><NavbarBrand className="cool-link" style={extraNavbarstyles}>Pending Payments </NavbarBrand></Link></td>
      { this.props.isProfessional?<td><Link to="/myorders"><NavbarBrand className="cool-link" style={extraNavbarstyles}>My Orders </NavbarBrand></Link></td>:null}
      { this.props.auth.user? this.props.auth.user.isAdmin?<td><Link to="/admin"><NavbarBrand className="cool-link" style={extraNavbarstyles}>Dashboard</NavbarBrand></Link></td>
        :null
        :null
      }
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
      <NotificationAlert ref={this.notificationAlert} />
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
  isProfessional:state.prof.isProfessional,
  count:state.notification.count,
  is_available:state.prof.is_available
})


export default ReactTimeout(connect(mapStateToProps,{loadUser,getNotification,newNotifications,isAvailable,updateAvailable,isProf})(AppNavbar))
