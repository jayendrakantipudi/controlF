import React,{Component} from 'react';
import AppNavbar from'./components/AppNavbar';
import ShowProfile from './components/ShowProfile';
import ShowProfessional from './components/ShowProfessional';
import Service from './components/Service';
import ServiceTypes from './components/serviceTypes';
import admin from './components/admin';
import ItemModal from './components/ItemModal'
import {Provider} from 'react-redux'
import store from './store'
import {loadUser} from './actions/authActions'
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import './App.css';
import Footer from './components/Footer'
import Dashboard from './Dashboard';
import HomePage from  './components/HomePage'
import ServicesDisplay from './components/ServicesDisplay'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Home from './components/Home';
import Currentloco from './components/Currentloco'
import Getmarker from './components/Getmarker'
import Slot from './components/Slot'
import Location from './components/Location'
import States from './components/States'
import ProfLocation from './components/profLocation/Location'
import ProfStates from './components/profLocation/States'
import ProfCurrentloco from './components/profLocation/Currentloco'
import ProfGetmarker from './components/profLocation/Getmarker'
import DisplayBooking from './components/Displaybooking'

class App extends Component{

  componentDidMount(){
    store.dispatch(loadUser())
  }

  render(){
    return (
      <Provider store={store}>
          <Router>
        <div className="App">
          <AppNavbar/>
          <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route exact path='/servicesdisplay' component={ServicesDisplay}/>
        <Route exact path='/chat' component={Dashboard}/>
          <Route exact path='/admin' component={admin}/>
		    <Route exact path='/service/:name' component={Service}/>
        <Route exact path='/service/:name/services' component={ServiceTypes}/>
				<Route exact path='/profile' component={ShowProfile}/>
        <Route exact path='/showprofessional' component={ShowProfessional}/>
        <Route exact path='/currentloco' component={Currentloco}/>
        <Route exact path='/marker' component={Getmarker}/>
        <Route exact path='/slots' component={Slot}/>
        <Route exact path='/location' component={Location}/>
        <Route exact path='/states' component={States}/>
        <Route exact path='/professional/location' component={ProfLocation}/>
        <Route exact path='/professional/states' component={ProfStates}/>
        <Route exact path='/professional/currentloco' component={ProfCurrentloco}/>
        <Route exact path='/professional/marker' component={ProfGetmarker}/>
        <Route exact path='/displaybooking' component={DisplayBooking}/>
          </Switch>
          <br/><br/>
          <Footer>
          <Footer/>
          </Footer>
        </div>
            </Router>
      </Provider>
    )
}
}

export default App;
