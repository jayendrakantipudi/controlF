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
import NotificationAlert from "react-notification-alert";
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
import {getNotification,newNotifications} from '../actions/notificationActions'
import ReactTimeout from 'react-timeout'
class AppNavbar extends Component{
// componentDidUpdate(){
//   this.props.isProf()
// }
constructor(props){
  super(props)
  this.state={
    isOpen:false,
    count:0
  }
  // this.toggle=this.toggle.bind(this)
}
notificationAlert = React.createRef();
  notify(place) {
    var color = Math.floor(Math.random() * 5 + 1);
    var type;
    switch (color) {
      case 1:
        type = "primary";
        break;
      case 2:
        type = "success";
        break;
      case 3:
        type = "danger";
        break;
      case 4:
        type = "warning";
        break;
      case 5:
        type = "info";
        break;
      default:
        break;
    }
    var options = {};
    const notification= this.props.notifications?this.props.notifications[this.props.notifications.length-1]:null
    options = {
      place: place,

      message: (
        <div>
          <div>

          <Link to={{
            pathname: notification?notification.url:"/",
            state: { order_id: notification?notification.order_id:null }
        }} onClick={notification?()=>this.sendhello(notification.from,this.props.auth.user._id):null} className="link_sd" style={{textDecoration:'none'}}>
            <div>{notification?notification.notification:null}</div>
          </Link>
          </div>
        </div>
      ),
      type: type,
      icon: "nc-icon nc-bell-55",
      autoDismiss: 7
    };
    this.notificationAlert.current.notificationAlert(options);
  }


async componentDidMount()
{
  await this.props.loadUser();
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
  if(this.props.auth.user)
  {this.props.newNotifications(this.props.auth.user._id)}
  this.getNotifi()
  if(this.props.count!=this.state.count && this.props.count){
    this.notify("tl")
    this.setState({
      count:this.props.count
    })
}
}
getNotifi=()=>{
  if(this.props.auth.user)
  {this.props.getNotification(this.props.auth.user._id)}
}

static propTypes ={
  auth: PropTypes.object.isRequired,
  isProfessional:PropTypes.bool,
  isProf:PropTypes.func.isRequired,
  loadUser:PropTypes.func.isRequired,
  getNotification:PropTypes.func.isRequired,
  count:PropTypes.number.isRequired,
  newNotifications:PropTypes.func.isRequired,
  notifications:PropTypes.array.isRequired,
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
    <Navbar style={{marginTop:'-2%'}}>
    <Container>
    <table style={{marginLeft:'30%'}}>
    <tr style={{cellspacing:'30%'}}>
      <td><Link to="/"><NavbarBrand className="cool-link" style={extraNavbarstyles}>Home </NavbarBrand></Link></td>

      <td><Link to="/servicesdisplay"><NavbarBrand className="cool-link" style={extraNavbarstyles}>Service </NavbarBrand></Link></td>
      <td><Link to="/"><NavbarBrand className="cool-link" style={extraNavbarstyles}>ServiceArea </NavbarBrand></Link></td>
      <td><Link to="/mybookings"><NavbarBrand className="cool-link" style={extraNavbarstyles}>My Bookings </NavbarBrand></Link></td>
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
  notifications:state.notification.notifications
})


export default ReactTimeout(connect(mapStateToProps,{loadUser,getNotification,newNotifications})(AppNavbar))
