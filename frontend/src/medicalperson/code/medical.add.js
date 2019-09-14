import React,{Component} from 'react';
import {Form,Button,Row, Card,Col} from 'react-bootstrap';
import '../style/medical.add.css';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'rc-time-picker/assets/index.css';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import Web3 from 'web3';
import contracts from 'truffle-contract';
import path from 'path';

const format = 'h:mm a';

const now = moment().hour(0).minute(0);


var provider    = new Web3.providers.HttpProvider("http://localhost:7545");
var Medical    = require('../../Ajson/MedicalRecord.json');


class MedicalPerson extends Component{
  state = {account: ''}
  Account = '';

  async loadBlockChain() {
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545')
    const network = await web3.eth.net.getNetworkType();
    console.log(network) // should give you main if you're connected to the main network via metamask...
    const accounts = await web3.eth.getAccounts();
    this.setState({account: accounts[0]});
    console.log(accounts[0]);
    this.Account=accounts[0];
    web3.eth.defaultAccount = web3.eth.accounts[0]
    web3.eth.getBalance(this.state.account)
.then(console.log);
  }

  async addchain(e){
    var value;
    var location;
    e.preventDefault();
    
    if (this.state.branch =='Doctor'){
        value = '0';
    }

    if (this.state.branch =='Patient'){
        value = '1';
    }
    location=this.state.location;
    // console.log("value are"+this.state.location+" "+value);
    
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:8080')
    await web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log("from this" + error);
        console.log("from this" + accounts);
      }
      var account = accounts[0];

      var proposalInstance;
      var MetaCoinContract = contracts(Medical);
      MetaCoinContract.setProvider(provider);
      MetaCoinContract.deployed().then(function(instance){
        proposalInstance = instance;
          return proposalInstance.registerCandidate(location,value,{from: accounts[0]});
      }).then(function(result) {
        Swal.fire({
            title: 'User is Added!',
            text: 'Do you want to continue',
            type: 'success',
            confirmButtonText: 'Yes'
          })
        console.log(result);
      }).catch(function(err) {
        console.log("from this"+err.message);
      });
    }
    )}

  handleSelect(selectedIndex, e) {
    this.setState({
      index: selectedIndex,
      direction: e.direction,
    });
  }

  componentDidMount() {
    this.loadBlockChain()
  }

  constructor(props, context){
    // super(props);
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      index: 0,
      direction: null,
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
    this.handleChange = this.handleChange.bind(this);
  }


  onChange = time => this.setState({ time })

  handleChange(date) {
    this.setState({date:date});
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

  render(){

    const { index, direction } = this.state;

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
                <Form.Label>Enter Address</Form.Label>
                <Form.Control type="text" placeholder="Enter your address" onChange={(event)=> {
                  this.setState({location: event.target.value,isError:false});
                }} />
              </Form.Group>


              <Form.Group controlId="formGridState">
                <Form.Label>Select Branch</Form.Label>
                <Form.Control as="select" onChange={(event)=> {
                  console.log(event.target.value);
                  this.setState({branch: event.target.value,isError:false});
                }}>
                  <option>Role</option>
                  <option>Doctor</option>
                  <option>Patient </option>
                </Form.Control>
              </Form.Group>

              <Button className='submitbotton' variant="primary" type="/submit" onClick={(e)=>this.addchain(e)}>
                ADD NEW USER
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

export default MedicalPerson;
