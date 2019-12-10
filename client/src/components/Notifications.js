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
import {sendMessage} from '../actions/mainchatActions'
class Notifications extends Component{
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

sendhello=(user_id,professional_id)=>{
  const message="hello"
  this.props.sendMessage(professional_id,user_id,message)
}

static propTypes ={
  auth: PropTypes.object.isRequired,
  isProfessional:PropTypes.bool,
  isProf:PropTypes.func.isRequired,
  loadUser:PropTypes.func.isRequired,
  getNotification:PropTypes.func.isRequired,
  notifications:PropTypes.array.isRequired
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
    if(!this.props.auth.token){
      return <Redirect to="/"/>
    }
    return(
      <div>
      {
        this.props.notifications?this.props.notifications.map(notification=><Link to={{
          pathname: notification.url?notification.url:"/",
          state: { order_id: notification.order_id?notification.order_id:null }
      }} onClick={notification.url?()=>this.sendhello(notification.from,this.props.auth.user._id):null}><div>{notification.notification?notification.notification:null}</div></Link>):null
      }
      </div>
    )
  }
}
const mapStateToProps = state => ({
  auth:state.auth,
  isProfessional:state.prof.isProfessional,
  notifications:state.notification.notifications
})


export default ReactTimeout(connect(mapStateToProps,{loadUser,getNotification,sendMessage})(Notifications))
