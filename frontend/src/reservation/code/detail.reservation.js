import React,{Component} from 'react';
import {Form,Button,Row, Card,Col} from 'react-bootstrap';
import '../style/reservation.css';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'rc-time-picker/assets/index.css';
import TimePicker from 'rc-time-picker';
import moment from 'moment';

const format = 'h:mm a';

const now = moment().hour(0).minute(0);


class Reservation extends Component{
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
      errorMessage:'Error SomeWhere',
      startDate: new Date(),
      time: '10:00'
    }

    //this.getStat = this.getStat.bind(this);
    this.login = this.login.bind(this);
    this.handleReserve = this.handleReserve.bind(this);
  }

  handleReserve = (e) => {
    //this.props.history.push("/home");
    e.preventDefault();
    Swal.fire({
          title: 'Reservation Added!',
          text: 'Do you want to continue',
          type: 'success',
          confirmButtonText: 'Yes'
        })
  };

  onChange = time => this.setState({ time })

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  login(){
    console.log('this is login function')
  }

    onClick = () => {
    //this.props.history.push("/home");
    Swal.fire({
          title: 'Reservation Added!',
          text: 'Do you want to continue',
          type: 'success',
          confirmButtonText: 'Yes'
        })
  };

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
      <div className='container-fluid bg  dev'>
        <div className='bcc dev'>
          <div className='row ro dev'>
            <div className='col-md-6 col-sm-12 dev'>
              <div className='bc dev'>
                <div className='intro dev'>
                  <h1 id='name'>ADD MEDICAL RECORD</h1>
                  <span id='quoto'>
                  " With tens of thousands of patients dying every year from preventable medical errors, it is imperative that we embrace available technologies and drastically improve the way medical records are handled and processed. "
                  </span>

                  <br></br>
                  <span id="writer">Jon Porter</span>

                </div>

              </div>

            </div>

            <div className='col-md-6 col-sm-12 dev'>
              <div className='bc dev'>
              <div bg className='boxe dev' >
            <Form className="reserveform">
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

              <Form.Group controlId="formGridState">
                <Form.Label>Select Branch</Form.Label>
                <Form.Control as="select" onChange={(event)=> {
                  console.log(event.target.value);
                  this.setState({branch: event.target.value,isError:false});
                }}>
                  <option>Branch...</option>
                  <option>Dermatologist</option>
                  <option>Neuro </option>
                  <option>Bone and other</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control type="text" placeholder="Contact Number" onChange={(event)=> {
                  this.setState({contactnumber: event.target.value,isError:false});
                }} />
              </Form.Group>
                
              <div className='row dev'>
                <Col>
                  <Form.Group controlId='heck'>
                    <label for="date">Date</label>
                    <br></br>
                    {/* <input type="email" class="form-control" id="email" placeholder="Enter email" name="email"/>   */}
                    <DatePicker
                      id='date'
                      selected={this.state.startDate}
                      onChange={this.handleChange}
                    />
                  </Form.Group> 
                </Col>
                <Col>
                  <Form.Group controlId='heck'>
                      <label for="date">Time</label>
                      <TimePicker
                        showSecond={false}
                        defaultValue={now}
                        className=""
                        id='tp'
                        onChange={value => console.log(value && value.format(format))}
                        format={format}
                        use12Hours
                        inputReadOnly
                      />
                  </Form.Group>
                </Col>
              </div>    

                {/* <Form.Group controlId="formBasicPassword">
                  <Form.Label>Date </Form.Label>
                  <Form.Control type="text" placeholder="Contact Number" onChange={(event)=> {
                    this.setState({contactnumber: event.target.value,isError:false});
                  }} />
                      
                </Form.Group> */}

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Detail of Symptoms </Form.Label>
                <Form.Control type="text" placeholder="headache, fever.." onChange={(event)=> {
                  this.setState({contactnumber: event.target.value,isError:false});
                }} />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Detail of medication </Form.Label>
                <Form.Control type="text" placeholder="Citamol, Aspirin..." onChange={(event)=> {
                  this.setState({contactnumber: event.target.value,isError:false});
                }} />
              </Form.Group>

              {this.getStat()}

                {/* <Form.Group controlId="formBasicChecbox">
                  <Form.Check type="checkbox" label="Remember me" />
                </Form.Group> */}
              <Button className='submitbotton' variant="primary" type="submit" onClick={this.handleReserve}>
                Confirm Reservation
              </Button>
                {/* <h6 className='nextbutton'>Already a member? Login</h6> */}
            </Form>
          </div>

              </div>
            </div>
          </div>
        </div>
      </div>
        
    )
  }
}

export default Reservation;

// import React, {Component} from 'react';
// import Swal from 'sweetalert2';
// import '../style/reservation.css';

// export default class DetailReservation extends Component{
//   onClick = () => {
//     //this.props.history.push("/home");
//     Swal.fire({
//           title: 'Reservation Added!',
//           text: 'Do you want to continue',
//           type: 'success',
//           confirmButtonText: 'Yes'
//         })
//   };
//   render(){
//     return(
//       <div>
//         <h1> This is Detail Reservation</h1>
//         <button onClick={this.onClick}>
//           Go back to Home page
//         </button>
//       </div>
//     );
//   }
// }
