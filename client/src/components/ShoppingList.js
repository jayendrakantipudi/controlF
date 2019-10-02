import React,{Component} from 'react'
import uuid from 'uuid'
import {Container, ListGroup, ListGroupItem, Button} from 'reactstrap'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import {connect} from 'react-redux'
import {getItems,deleteItem} from '../actions/itemActions'
import {loadUser} from '../actions/authActions';
import store from '../store'
import PropTypes from 'prop-types'


class ShoppingList extends Component{

  componentDidMount(){
    this.props.loadUser()
    this.props.getItems()
  }


  render(){

    // const {items}=this.props.item
    // console.log(this.props.item)
    const username=this.props.user.name
    return(

      <div style={{paddingLeft:'10%',marginLeft:"-80%"}}>
      <ListGroup>
      <ListGroupItem>
      NAME:
          {username?username:null}
      </ListGroupItem>
      </ListGroup>
      </div>

    )
  }

}

ShoppingList.propTypes={
  getItems:PropTypes.func.isRequired,
  item:PropTypes.object.isRequired,
  loadUser:PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  item:state.item,
  user:state.auth.user
})

export default connect(mapStateToProps,{ getItems, deleteItem ,loadUser})(ShoppingList)
