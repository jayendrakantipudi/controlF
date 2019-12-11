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
 import { Table } from 'reactstrap';
 import AppNavbar from'./AppNavbar';
 import Footer from './Footer'



import PropTypes from 'prop-types'



class ShowProfile extends Component{
  componentDidMount(){
    console.log('mounted');
     this.props.loadUser()
  }





  constructor(props){
      super(props);

      this.state={
        content1: true,
        content2 : false,
        content3 : false,
        content4 : false
      }


      this.myfun1=this.myfun1.bind(this);
      this.myfun2=this.myfun2.bind(this);
      this.myfun3=this.myfun3.bind(this);
      this.myfun4=this.myfun4.bind(this);
  }

  myfun1(){
     this.setState(
       {content1: true,
       content2:false,
       content3:false,
       content4:false}

     );

       }


    myfun2(){
        this.setState(
          {
          content1:false,
          content2:true,
          content3:false,
          content4:false,
        });

    }


      myfun3(){
          this.setState({
            content1:false,
            content2:false,
            content3: true,
            content4:false
          });

      }


      myfun4(){
            this.setState({
              content1:false,
              content2:false,
              content3:false,
              content4: true
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
<AppNavbar />
<br/>

<Container>
  <Row>
    <Col md="12">
      <h1>Your Profile</h1>
    </Col>
  </Row>
  <Row>
    <Col md="3" className="imag">
      <img src={image} className="imag"/>
    </Col>
    <Col md="6" className="name">
    <h1>
      {name?name:null}
    </h1>
      {email?email:null}
    </Col>
  </Row>
  <br/><br/>
  <Row>
    <Col md="3">
    <div className="prof_btn">
 <Button  className="button_prof" onClick= {this.myfun1}>About</Button><br/><br/>
 <Button  className="button_prof" onClick={this.myfun2}>My Reviews</Button><br/><br/>
 <Button  className="button_prof" onClick={this.myfun3}>Bookings</Button><br/><br/>
 <Button  className="button_prof" onClick={this.myfun4}>Personal Information</Button>
 </div>
    </Col>
    <Col md="8" className="prof_data">

        <span>
          {this.state.content1 ? <div>

            <h3>About</h3>


          <p>I have began an illustrious career in hair styling more than a decade ago and today I'm one of the most sought-after stylists in Hyderabad. Get a trendy, chic hairstyle at B Blunt, Dev’s hangout! A warm personality, reassuring manner and skillful hands will take you from Plain Jane to Hot Diva in a few minutes. Ask any well-groomed lady in the city where she gets her hair and nails done, and you can bet your locks it’s at Dev More’s salon! Dev believes that women should experiment more with their face and hair for a modern, chic, smart look suited to any occasion.

</p>

         </div> : null}
       </span>


        <span>
          {this.state.content2 ? <div>
            <h3>My Reviews:</h3>
            <div className='rev1'>
              <h6>Jayendra Kantipudi</h6>
              <p>I'm very much satisfied with your work.</p>
            </div>
              <br/>
            <div className='rev1'>
              <h6>Yashwanth Bhogadi</h6>
              <p>Oh My God! You are absolutely fabulous</p>
            </div>
          </div> : null}
        </span>


        <span>
          {this.state.content3 ? <div>
            <h3>My Bookings:</h3>

            <Table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Customer Name</th>
                  <th>Order-Id</th>
                  <th>Total Cost(INR)</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Jayendra</td>
                  <td>CF14564</td>
                  <td>170</td>
                  <td style={{color:'green'}}>Done</td>
                  <td>13 Oct 2019</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Madhukar</td>
                  <td>CF67804</td>
                  <td>567</td>
                  <td style={{color:'orange'}}>Not Done</td>
                  <td>20 Nov 2019</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Srinivasa</td>
                  <td>CF89456</td>
                  <td>400</td>
                  <td style={{color:'green'}}>Done</td>
                  <td>13 Nov 2019</td>
                </tr>
              </tbody>
            </Table>

          </div> : null}
        </span>


        <span>
        {this.state.content4 ? <div>
            <Table borderless>

              <tbody>
                <tr>

                  <td><b>Contact</b></td>
                  <td>+91 7731066610</td>

                </tr>
                <tr>

                  <td><b>Email</b></td>
                  <td>madhukar.vangala12@gmail.com</td>

                </tr>
                <tr>

                  <td><b>Address</b></td>
                  <td>Room no.310,Bh1,IIIT Sricity</td>

                </tr>
              </tbody>
            </Table>
              </div> : null}
        </span>




    </Col>
  </Row>
</Container>


<Footer>
<Footer/>
</Footer>
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
