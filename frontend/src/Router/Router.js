import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


import NavbarUpper from '../static/code/navbar.upper';
import NavbarLower from '../static/code/navbar.lower';
import Footer from '../static/code/footer';
import Header from '../static/code/Header';
import Carousel from '../carousel/code/carousel';
import Login from '../userauth/code/login';
import Signup from '../userauth/code/signup';

import DetailBlog from '../blog/code/detail.blog';
import ListBlog from '../blog/code/list.blog';
import DetailEvent from '../event/code/detail.event';
import ListEvent from '../event/code/list.event';
import DetailCareer from '../career/code/detail.career';
import ListCareer from '../career/code/list.career';
import BranchHome from '../home/code/branch.home';
import SiteHome from '../home/code/site.home';
import MenuDetail from '../menu/code/detail.menu';
import Reservation from '../reservation/code/detail.reservation';



class Routero extends Component{
  render(){
    return(
      <Router>
        {/* <Header /> */}
        <Route  exact path='/' component={Footer,NavbarLower, Carousel} />
        <Route  path='/login' component={Login}/>
        <Route  path='/signup' component={Signup}/>
        <Route  path ='/blog/detail' component={DetailBlog}/>
        <Route  path ='/blog/list' component={ListBlog}/>
        <Route  path ='/event/detail' component={DetailEvent}/>
        <Route  path ='/event/list' component={ListEvent}/>
        <Route  path ='/career/detail' component={DetailCareer}/>
        <Route  path ='/career/list' component={ListCareer}/>
        <Route  path ='/home' component={SiteHome}/>
        <Route  path ='/site/branch' component={BranchHome}/>
        <Route  path ='/menu/detail' component={MenuDetail}/>
        <Route  path ='/add' component={Reservation}/>
        {/* <Footer/> */}
      </Router>
    );
  }
}

export default Routero;
