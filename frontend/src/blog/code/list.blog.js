import React, {Component} from 'react';
import '../style/list222.blog.css';
import 'bootstrap/dist/css/bootstrap.min.css';


class GridView extends Component{
  constructor(props){
    super(props);
    this.state = {
      image : '',
      title : '',
      description :'',
    }
  }

  onClick = () => {
    this.props.history.push("/blog/item");
  };

  render(){
    return(
      <div className="card">
        <img src={require('../../Img/food.jpg')} alt="Avatar" style={{width:"100%"}}/>
        <div className="containe">
          <p className='date'>Ashish Gautam</p>
          <p className='name'>14 june 2019</p>
          <br></br>
          <h4 className='header'><b>{this.props.children}</b></h4> 
          <text className='contain'>" Brace yourself your dream girl and supermodel sunny is now in the town make yourself brown ...</text> 
          <text className='readmore'> Read More </text>
        </div>
      </div>
     
    );
  }

}

export default class ListBlog extends Component{

  

  render(){
    return(
      <div className='container'>
        <div className='row'>
        {/* <button onClick={this.onClick}>
          Go back to Blog Detail
        </button> */}
        <div class='sth col-lg-4 col-sm-12 col-md-6'>
        <GridView  dirphoto='right' day='12' month='Jan' year='2019' dirtext='left' name="I am Saying Hello"> Night </GridView>
        </div>
        <div class='sth col-lg-4 col-sm-12 col-md-6'>
        <GridView  dirphoto='left' day='12' month='Jan' year='2019' dirtext='right' name="I am Saying Hello"> Night With Jhonny</GridView>
        </div>
        <div class='sth col-lg-4 col-sm-12 col-md-6'>
        <GridView  dirphoto='right' day='12' month='Jan' year='2019' dirtext='left' name="I am Saying Hello"> Night With Sunny and make you funny</GridView>
        </div>
      </div>
      </div>
    );
  }

}
