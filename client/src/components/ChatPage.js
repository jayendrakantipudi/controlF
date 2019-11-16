import React,{Component} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {connect} from 'react-redux'
import {loadUser} from '../actions/authActions'
import PropTypes from 'prop-types'
import {sendMessage,getMessages} from '../actions/mainchatActions'
import {Container } from 'reactstrap'
import {
  Redirect,
  Link
} from "react-router-dom";
const useStyles = makeStyles(theme => ({
    root: {
      margin:'50px',
      padding:theme.spacing(3,2),
    },

    flex:{
        display:'flex',
        alignItems:'center'
    },
    topicsWindow:{
        width:'30%',
        height:'300px',
        borderRight:'1px solid gray'
    },
    chatWindow:{
        width:'70%',
        height:'300px',
        padding:'20px'
    },
    chatBox:{
        width:'85%',
    },
    button:{
        width:'15%',
    },


}));


class ChatPage extends Component{
  state={
    message:null,
    allChats:[]
  }
  componentDidMount(){
    this.props.loadUser();
    if(this.props.order){
    this.props.getMessages(this.props.order.user_id,this.props.order.professional_id)
  }
  }
  componentDidUpdate(){
    if(this.props.order){
    this.props.getMessages(this.props.order.user_id,this.props.order.professional_id)
  }
  }

  changeTextValue=(e)=>{
    this.setState({[e.target.name]:e.target.value})
  }
  submitingmessage=(e,user_id,professional_id)=>{
    e.target.value=''
    this.props.sendMessage(user_id,professional_id,this.state.message)
  }
  render(){
    const user_id = this.props.order?this.props.order.user_id:null;
    const professional_id = this.props.order?this.props.order.professional_id:null;

  const stylesRight={textAlign:'right',marginRight:'10%',marginTop:'3px',marginBottom:'3px'}
  const stylesLeft={textAlign:'left',marginLeft:'10%',marginTop:'3px',marginBottom:'3px'}
  if (!this.props.auth.token) {
      // Logout
        return <Redirect to="/" />;
      }

  return(
    <div>
      <Paper >
          <Typography variant="h5" component="h5">
          {this.props.order?<div>You are talking to {this.props.order.prof_name}</div>:null}
          </Typography>
          <Paper style={{width:"50%",marginLeft:"30%"}}>
          <div style={{borderBottom:'1.5px solid rgba(0,0,0,0.14)'}}>
          {this.props.message?this.props.message.messages.map(mess=><div style={mess.from===this.props.auth.user._id? stylesRight:stylesLeft}><Chip label={mess.message}/></div>):null}
          </div>
          <div>
            <TextField
              label="Send a message"
              name="message"
              onChange={this.changeTextValue}
              style={{width:'90%'}}
            />
            {!this.props.message.isLoading?<Button
            onClick={(e)=>this.submitingmessage(e,user_id,professional_id)}
            variant="contained" color="primary" style={{marginTop:'1%'}}>
              Send
            </Button>:null}

          </div>
          </Paper>
      </Paper>
    </div>

  )
}
}
ChatPage.propTypes={
sendMessage:PropTypes.func.isRequired,
order:PropTypes.object.isRequired,
getMessages:PropTypes.func.isRequired,
message:PropTypes.object.isRequired,
loadUser:PropTypes.func.isRequired,
auth: PropTypes.object.isRequired,
order:PropTypes.object.isRequired,
token:PropTypes.string
}


const mapStateToProps = state =>({
order:state.booking.order,
message:state.message,
auth:state.auth,
order:state.booking.order,
})


export default connect(mapStateToProps,{sendMessage,getMessages,loadUser})(ChatPage)
