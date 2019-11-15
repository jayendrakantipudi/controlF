import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Container, ListGroup, ListGroupItem, Button} from 'reactstrap'
import store from '../store'
import {loadUser} from '../actions/authActions'
import {
  Redirect
} from "react-router-dom";
import '../index.css';
 import image from '../img.JPG'
 import { Row, Col } from 'reactstrap';



import PropTypes from 'prop-types'



class ShowProfile extends Component{
  componentDidMount(){
    console.log('mounted');
     this.props.loadUser()
  }


  constructor(props){
      super(props);
      this.state={content1:''}
      this.state={content2:''}
      this.state={content3:''}
      this.state={content4:''}
      this.state={con:1}


      this.myfun1=this.myfun1.bind(this);
      this.myfun2=this.myfun2.bind(this);
      this.myfun3=this.myfun3.bind(this);
      this.myfun4=this.myfun4.bind(this);
  }

  myfun1(){
     this.setState(
       {content1:
         <div >

          <h1 className='head1'>About:</h1>


      <p className='head2'>Indian Institutes of Information Technology (IIITs) are a group of institutes of higher education in India, focused on information technology. Five of them are established, funded and managed by the Ministry of Human Resource Development. The rest are set up on the public-private partnership (PPP) model.
      </p></div>
       ,content2:'',
       content3:'',
       content4:'',
       con:1}

     );

       }


    myfun2(){
        this.setState(
          {
            content1:'',
          content3:'',
          content4:'',
          content2:<div class="head">
          <h1 className="head1">Reviews:</h1>
          </div>,
          con:2
        });

    }


      myfun3(){
          this.setState({
            content1:'',
            content2:'',
            content3:<div class="head">
            <h1 className="head1">My Bookings:</h1>
            </div>,
            content4:'',
            con:3
          });

      }


      myfun4(){
            this.setState({
              content1:'',
              content2:'',
              content3:'',
              content4:<div class="head">
              <h2 className="head1">Contact:</h2>
              <h2 className="head1">E-mail:</h2>
              <h2 className="head1">Address:</h2>
              </div>,
              con:4
            });

        }

render(){
const name=this.props.user?this.props.user.name:null;
const email=this.props.user?this.props.user.email:null;

if (!this.props.token) {
    // Logout
      return <Redirect to="/" />;
    }

    // --------------------------------------------------------------------------------------------------------


return(
<div className="row_class">
<br/>
<div className="hello">
  YOUR PROFILE<br/>
</div>


<div>
  <Row >
      <Col sm={{ size: 6, offset: 0 }}>< img src={image} className="imag"/></Col>
      <Col sm={{ size: 0, offset: 0 }}><h1 className="name">{name?name:null}</h1><br/><h1 className="email">{email?email:null}</h1> </Col>
  </Row>
   </div>


   <div>
   <Row >
       <Col sm={{ size: 5, offset: 0 }}>
<Button  className="button_prof" onClick= {this.myfun1}>About</Button><br/><br/>
<Button  className="button_prof" onClick={this.myfun2}>Reviews</Button><br/><br/>
<Button  className="button_prof" onClick={this.myfun3}>Bookings</Button><br/><br/>
<Button  className="button_prof" onClick={this.myfun4}>Personal Information</Button></Col>

<Col sm={{ size: 0, offset: 0 }}  style={{marginLeft:'50%',width:'50%',position:'absolute'}} className="show">

{(this.state.con===1) ?

  <span>{this.state.content1}</span>

  :''}
{(this.state.con===2) ?<span>{this.state.content2}</span>:''}
{(this.state.con===3) ?<span>{this.state.content3}</span>:''}
{(this.state.con===4) ?<span>{this.state.content4}</span>:''}
  </Col>
</Row>


</div>


</div>
)
}
}



// ----------------------------------------------------------------------------------------

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
