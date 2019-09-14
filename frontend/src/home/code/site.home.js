import React, {Component} from 'react';
import '../style/site.home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from '../../static/code/navbar.upper.js';

export default class SiteHome extends Component{
  onClick = () => {
    this.props.history.push("/site/branch");
  };
  render(){
    return(
      <div>
        <Menu />
        <div className='color'>
          <div>
            <h4>We Provide quality encryption service with this application and this gonna be awesome. It will deliver you what you exaclty want. You are free from all the risk that may heppen to your system. </h4>
          </div>
          <div>
            <img className='imagehere'src={require('../../Img/neuron.png')} />
            
          </div>
        </div>
        <div className='colornx'></div>
        <div className='colorex'></div>
        <div className='colorlx'></div>
      </div>
    );
  }
}
