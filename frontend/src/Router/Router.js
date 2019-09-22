import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link , Switch } from "react-router-dom";


import NavbarUpper from '../static/code/navbar.upper';
import NavbarLower from '../static/code/navbar.lower';
import Footer from '../static/code/footer';
import Header from '../static/code/Header';
import Carousel from '../carousel/code/carousel';
import Login from '../userauth/code/login';
import Signup from '../userauth/code/signup';
import verifyEmail from '../userauth/code/verifyEmail';

import DetailBlog from '../blog/code/detail.blog';
import ListBlog from '../blog/code/list.blog';
import DetailEvent from '../event/code/detail.event';
import ListEvent from '../event/code/list.event';
import DetailCareer from '../career/code/detail.career';
import ListCareer from '../career/code/list.career';
import SiteHome from '../home/code/site.home';
import MenuDetail from '../menu/code/detail.menu';
import Reservation from '../reservation/code/detail.reservation';
import pagenotfound from '../pagenotfound/code/pagenotfound';
import MedicalPerson from '../medicalperson/code/medical.add';
import MedicalProblem from '../PatientWork/code/medical.problem';
import CreateMedication from '../DoctorWork/code/create.medication';
import CreatePatientIssue from '../DoctorWork/code/create.PatientIssue';
import PrescribeMedication from '../DoctorWork/code/prescribe.medication';
import ShareMedication from '../DoctorWork/code/share.Medication';
import Patient from '../reservation/code/patient.home';
import PatientShowList from '../PatientWork/code/show.list';
import ViewMedicationList from '../DoctorWork/code/viewMedicationList';
import SearchMedication from '../DoctorWork/code/medicationSearch';

class Routero extends Component{
  render(){
    return(
      <Router>
        <Switch>
          {/* <Header /> */}
          {/* <Route  exact path='/' component={Footer,NavbarLower, Carousel} /> */}
          <Route  path='/login' component={Login}/>
          <Route  path='/signup' component={Signup}/>
          <Route  path ='/person' component={MedicalPerson} />
          <Route  path = '/createmedication' component={CreateMedication}/>
          <Route  path = '/createpatientissue' component={CreatePatientIssue}/>
          <Route  path ='/addproblem' component={MedicalProblem} />
          <Route  path ='/prescribemedication' component={PrescribeMedication} />
          <Route  path ='/sharemedication' component={ShareMedication} />
          <Route  path ='/blog/detail' component={DetailBlog}/>
          <Route  path ='/blog/list' component={ListBlog}/>
          <Route  path ='/event/detail' component={DetailEvent}/>
          <Route  path ='/event/list' component={ListEvent}/>
          <Route  path ='/career/detail' component={DetailCareer}/>
          <Route  path ='/career/list' component={ListCareer}/>
          <Route  path ='/home' component={SiteHome}/>
          <Route  path ='/menu/detail' component={MenuDetail}/>
          <Route  path ='/doctor' component={Reservation}/>
          <Route  path ='/patient' component={Patient} />
          <Route  path ='/showlist' component={PatientShowList} />
          <Route  path ='/viewMedication' component={ViewMedicationList} />
          <Route  path ='/searchMedication' component={SearchMedication} />
          <Route  path ='/verifyemail' component={verifyEmail}/>
          <Route  path ='/' exact component={SiteHome}/>
          <Route  path ='*' component={pagenotfound} />
          

          
          {/* <Footer/> */}
        </Switch>
      </Router>
    );
  }
}

export default Routero;
