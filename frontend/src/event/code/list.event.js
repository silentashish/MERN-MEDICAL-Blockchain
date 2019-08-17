import React, {Component} from 'react';
import '../style/list.event.css';
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
      <div className='listBucket'>
        
        <div style={{float:this.props.dirphoto}} className='bglist col-lg-7 col-sm-12'>
          {/* <text>Hello i am text</text> */}
        </div>

        <div style={{float:this.props.dirtext}} className='mm col-lg-5 col-sm-12'>
          <h5> {this.props.day} . {this.props.month} . {this.props.year}</h5>
            <br></br>
            <h2>{this.props.children}</h2>
            <span>*</span>
            <text>Brace yourself your dream girl and supermodel sunny is now in the town make yourself brown </text>
            <br></br>
            <text onClick={()=>this.onClick()} className='more'>see more</text>
          </div>
      </div>
    );
  }

}

export default class ListEvent extends Component{

  

  render(){
    return(
      <div className='heightmm container'>
        <button onClick={this.onClick}>
          Go back to Blog Detail
        </button>
        <GridView dirphoto='right' day='12' month='Jan' year='2019' dirtext='left' name="I am Saying Hello"> Night With Sunny</GridView>
        <GridView dirphoto='left' day='12' month='Jan' year='2019' dirtext='right' name="I am Saying Hello"> Night With Jhonny</GridView>
        <GridView dirphoto='right' day='12' month='Jan' year='2019' dirtext='left' name="I am Saying Hello"> Night With Sunny</GridView>
      </div>
    );
  }

}
