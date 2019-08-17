import React,{Component} from 'react';
import {Form,Button,Row, Card,Col} from 'react-bootstrap';
import '../style/signup.css';

class Signup extends Component{
  constructor(props){
    super(props);
    this.state = {
      email:'',
      username:'',
      password: '',
      isError:false,
      fullname:'',
      confirmpassword:'',
      branch:'',
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
    console.log("from Here");
    console.log(this.state.username+"   and    "+this.state.password);
    let formData = new FormData();    //formdata object

    formData.append('email', this.state.username);   //append the values with key, value pair
    formData.append('password', this.state.password);
    const URL = 'http://192.168.10.5:3000/users/login';
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
            if(responseJson.verify == 'no'){
              this.props.navigation.navigate('verifyuser',{
                userId:responseJson.userid,
                token:responseJson.verificationtoken,
                jwtToken:responseJson.jwttoken,
                email:this.state.email,
                password:this.state.password
              });
            }

            if(responseJson.verify == 'yes'){
              alert(responseJson.success);
              // (async()=>{
              //   try {
              //     await AsyncStorage.setItem('userid', responseJson.userid);
              //     await AsyncStorage.setItem('jwttoken', responseJson.jwttoken);
              //   } catch (e) {
              //     // saving error
              //     console.log(e);
              //   }
              // })();

              this.props.navigation.navigate('HomeTabNavigator',{
                userId:responseJson.userid,
                token:responseJson.verificationtoken
              });
            }
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
              <h3 > Welcome, Signin and get Started </h3>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="text" placeholder="Full Name" onChange={(event)=> {
                  this.setState({fullname: event.target.value,isError:false});
                }} />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={(event)=> {
                  this.setState({email: event.target.value,isError:false});
                }} />

              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={(event)=> {
                  this.setState({password: event.target.value,isError:false});
                }} />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm Password" onChange={(event)=> {
                  this.setState({confirmpassword: event.target.value,isError:false});
                }} />
              </Form.Group>

              <Form.Group controlId="formGridState">
                <Form.Label>Select Role</Form.Label>
                <Form.Control as="select" onChange={(event)=> {
                  console.log(event.target.value);
                  this.setState({branch: event.target.value,isError:false});
                }}>
                  <option>Role...</option>
                  <option>Doctor</option>
                  <option>Patient</option>
                </Form.Control>
              </Form.Group>

              {this.getStat()}

              {/* <Form.Group controlId="formBasicChecbox">
                <Form.Check type="checkbox" label="Remember me" />
              </Form.Group> */}
              <Button className='submitbotton' variant="primary" type="submit" onClick={this.handlelogin}>
                Sign In
              </Button>
              <h6 className='nextbutton'>Already a member? Login</h6>
          </Form>
        </div>
      </div>       
    )
  }
}

export default Signup;
