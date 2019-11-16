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
import PropTypes from 'prop-types'
import {sendMessage,getMessages} from '../actions/mainchatActions'
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

  return(
    <div>
      <Paper >
          <Typography variant="h4" component="h4">
          Chat App
          </Typography>
          <div >
            <TextField
              label="Send a message"
              name="message"
              onChange={this.changeTextValue}
            />
            {!this.props.message.isLoading?<Button
            onClick={(e)=>this.submitingmessage(e,user_id,professional_id)}
            variant="contained" color="primary">
              Send
            </Button>:null}

          </div>
      </Paper>
    </div>

  )
}
}
ChatPage.propTypes={
sendMessage:PropTypes.func.isRequired,
order:PropTypes.object.isRequired,
getMessages:PropTypes.func.isRequired,
message:PropTypes.object.isRequired
}


const mapStateToProps = state =>({
order:state.booking.order,
message:state.message
})


export default connect(mapStateToProps,{sendMessage,getMessages})(ChatPage)
