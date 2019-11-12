import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Container, Button, Row, Col, Table, TabContent, TabPane, Card} from 'reactstrap'
import {
  Redirect
} from "react-router-dom";

import { FaCrosshairs } from 'react-icons/fa';
class Location extends Component{
    state={
        flag:null
    }
    getCurrentloco(){
        this.setState({flag:1})
        // var url = '/currentloco'
        // window.location.href=url;
    }

    getOtherloco(){
        this.setState({flag:2})
        // var url = '/marker'
        // window.location.href=url;
    }
    render(){
        if(this.state.flag===1){
            return <Redirect to="/currentloco" />;
        }
        if(this.state.flag===2){
            return <Redirect to="/states" />;
        }
        return(
            <Card style={{width:"30%",size:"70px",alignItems:"center",justifyContent:"center"}}>
            <Button onClick = {()=>{this.getCurrentloco()}}>
            <FaCrosshairs/>Current Location
            </Button>
            <Button onClick = {()=>{this.getOtherloco()}}>
            Other Location
            </Button>
            </Card>
        )
    }

}

export default Location