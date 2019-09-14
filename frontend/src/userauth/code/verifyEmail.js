import React,{Component} from 'react';
import {Form,Button,Row, Card} from 'react-bootstrap';
import '../style/login.css';

class Login extends Component{

  constructor(props){
    super(props);
    console.log(props);
    this.state = {
      username:'',
      password: '',
      value:'',
      isError:false,
      errorMessage:'Error SomeWhere'
    }

    //this.getStat = this.getStat.bind(this);
    this.login = this.login.bind(this);
  }
  login(){
    console.log('this is login function')
  }

  getStat=()=>{
    if(this.state.isError){
      return(
        <div class="alert alert-danger" variant='danger' role="alert">
          {this.state.errorMessage}
        </div>
      );
    }
    else{
      return null;
    }
  }

  handlelogin=(e)=>{
    e.preventDefault();
    console.log(this.props.location.state.value);
    console.log(this.state.token);
    console.log(this.state.username+"   and    "+this.state.password);
    let formData = new FormData();    //formdata object

    formData.append('email', this.props.location.state.value);   //append the values with key, value pair
    formData.append('token', this.state.token);
    const URL = 'http://localhost:1038/auth/confirmation';
    fetch(URL,{
            method: 'POST',
            headers: {
               Accept: 'application/json',
            },
            body: formData
        })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          if(responseJson.status == 'error'){
            this.setState({
              isError:true,
              errorMessage:responseJson.message
            });
          }

          if(responseJson.status == 'success')
          {
            this.props.history.push({pathname:'/login',state:{value:this.state.email}})
          }
          })
        .catch((error) =>{
          console.error(error);
        });
    }

  render(){
    return(
      <div className='bg'>
        <div bg className='box' >
            <Form>
                <h1> Verify Email</h1>
              <h3 > We send verification token to email </h3>
              <h1>{this.props.location.state.value}</h1>  
              <h3> Enter code below</h3>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Verification Token</Form.Label>
                <Form.Control placeholder="token" onChange={(event)=> {
                  this.setState({token: event.target.value,isError:false});
                }} />

              </Form.Group>


              {this.getStat()}

              <Form.Group controlId="formBasicChecbox">
                <Form.Check type="checkbox" label="Remember me" />
              </Form.Group>
              <Button className='submitbotton' variant="primary" type="submit" onClick={this.handlelogin}>
                Verify Email
              </Button>
              
          </Form>
        </div>
      </div>       
    )
  }
}

export default Login;
