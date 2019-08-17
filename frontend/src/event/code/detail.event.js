import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/detail.event.css';

export default class DetailEvent extends Component{
  constructor(props){
    super(props);
    this.state = {
      post:'',
      title : '',
      description :'',
      image:''
    }
  }

  componentDidMount(){
    // let formData = new FormData();    //formdata object

    // formData.append('email', this.state.username);   //append the values with key, value pair
    // formData.append('password', this.state.password);
    const URL = 'http://www.json-generator.com/api/json/get/cpflxTkeOG?indent=2';
    fetch(URL,
      // {
      //       method: 'POST',
      //       headers: {
      //          Accept: 'application/json',
      //       },
      //       body: formData
      // }
        )
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          if(responseJson.status == 'success'){
            this.setState({
              post:true,
              title:responseJson.title,
              description:responseJson.description,
              image:responseJson.image
            });
          }
          })
        .catch((error) =>{
          console.error(error);
        });
  }

  render(){
    
    return(
      this.state.post?
        <div className='carousel'>
          <h1 className='pos'> {this.state.title}</h1>
          <img className='myimage img-fluid' src={this.state.image} alt={require('../../Img/food.jpg')}/>
          <text className='posi'>{this.state.description}</text>
        </div>:
        <text>Loading...</text>
    )
  }
}
