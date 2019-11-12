import React,{Component} from 'react'; 
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { Container,Button,Form,FormGroup,Label,Input } from 'reactstrap';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {bookSlot} from '../actions/locationAction'
 

class Getmarker extends React.Component {
  
onChange=(e)=>{
  this.setState({[e.target.name]:e.target.value})
}
  
sendAddress(markers,address){
  var id = this.props.order.order_id
  var city = this.props.initial_center.city;
  console.log(markers)
  this.props.bookSlot(id,markers[0].position.lat,markers[0].position.lng,address,city)
}

 
  state = {
    address:null,
    flag:null,
    initial_center:{
      lat:13.09,
      lng:77.89
    },    
      markers: [
        {
          name: "Current position",
          position: {
            lat: null,
            lng: null
          }
        }
      ]
    };
  
    onMarkerDragEnd = (coord, index) => {
      const { latLng } = coord;
      const lat = latLng.lat();
      const lng = latLng.lng();
  
      this.setState(prevState => {
        const markers = [...this.state.markers];
        markers[index] = { ...markers[index], position: { lat, lng } };
        return { markers };
      });
    };
  
    render() {

      if(!this.state.flag){
        this.setState({
          markers: [
            {
              name: "Current position",
              position: {
                lat: this.props.initial_center.initialCenter.lat,
                lng: this.props.initial_center.initialCenter.lng
              }
            }
          ],
          flag:1
        })
      }
      return (
        <div>
        <div className="maps" style={{position:"relative"}}>
        <Container>
        <Map
              google={this.props.google}
              style={{
                width: "70%",
                height: "350px"
              }}
              initialCenter={this.props.initial_center.initialCenter}
              zoom={14}
              
            >
              {this.state.markers.map((marker, index) => (
                <Marker
                  position={marker.position}
                  draggable={true}
                  onDragend={(t, map, coord) => this.onMarkerDragEnd(coord, index)}
                  name={marker.name}
                  
                />
              ))}
            </Map>
            
        </Container>
        </div>

        <Form style={{marginTop:'400px',height:'100px',position:'fixed'}}>
        <FormGroup>
          <Label for="address">Address</Label>
          <Input
            type="text"
            name="address"
            id="address"
            placeholder ="address"
            onChange={this.onChange}
          />
          </FormGroup>
          </Form>
          
        <Button style={{marginTop:'550px',height:'50px'}} onClick={()=>{this.sendAddress(this.state.markers,this.state.address)}}>Continue to Book</Button>
        </div>
      );
    }
  }


Getmarker.propTypes={
  order:PropTypes.object.isRequired,
  bookSlot:PropTypes.func.isRequired,
  initial_center:PropTypes.object.isRequired
}

const mapStateToProps=state=>({
order:state.order,
initial_center:state.booking.initial_center
})
export default connect(mapStateToProps,{bookSlot})( GoogleApiWrapper({
  apiKey: ('AIzaSyBM9hBBwzMOrDHqOB9harB9AqXS6HZdiX8'),
})(Getmarker))


