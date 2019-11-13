import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Container, ListGroup, ListGroupItem, Button} from 'reactstrap'
import store from '../store'
import {loadUser} from '../actions/authActions'
import {
  Redirect
} from "react-router-dom";


import PropTypes from 'prop-types'



class ShowProfile extends Component{
  componentDidMount(){
    console.log('mounted');
     this.props.loadUser()
  }


render(){
const name=this.props.user?this.props.user.name:null;
const email=this.props.user?this.props.user.email:null;

if (!this.props.token) {
    // Logout
      return <Redirect to="/" />;
    }
return(
<div>
<div style={{fontSize:'200%'}}>
  YOUR PROFILE<br/><br/>
</div>
<ListGroup>
  <ListGroupItem>
    NAME:{name?name:null}
  </ListGroupItem>
  <ListGroupItem>
    EMAIL:{email?email:null}
  </ListGroupItem>
</ListGroup>
</div>
)
}
}

ShowProfile.propTypes={
  user:PropTypes.object.isRequired,
  loadUser:PropTypes.func.isRequired,
  token:PropTypes.string
}

const mapStateToProps=state=>({
user:state.auth.user,
token:state.auth.token
})
export default connect(mapStateToProps,{loadUser})(ShowProfile)
