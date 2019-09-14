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


class Reservation extends Component{
  
  address="0xeb80652D6770084fDC4BD37e2c45bdbB9E1AdbaF";
  state = {
    account: '',
    address:this.address
  }
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
    var d = this.state.address;
    e.preventDefault();
    console.log(this.state.title+" "+ this.state.startdate +" "+this.state.enddate+" "+this.state.occurance+" "+this.state.severity+" "+ this.state.referby+" "+this.state.isallergy+" "+this.state.address);
    var title=this.state.title;
    var startdate=Date.parse(this.state.startdate);
    var enddate = Date.parse(this.state.enddate);
    var occurance =this.state.occurance;
    var severity = this.state.severity;
    var referby=this.state.referby;
    var isallergy =this.state.isallergy;
    var address = this.state.address;
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:8080')
    await web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log("from this" + error);
      }
      var account = accounts[0];

      var proposalInstance;
      var MetaCoinContract = contracts(Medical);
      MetaCoinContract.setProvider(provider);
      MetaCoinContract.deployed().then(function(instance){
        proposalInstance = instance;
          return proposalInstance.createMedicalProblem(title,startdate,enddate,occurance,severity,referby,isallergy,address,{from: d});
      }).then(function(result) {
        console.log(result);
        Swal.fire({
          title: 'Reservation Added!',
          text: 'Do you want to continue',
          type: 'success',
          confirmButtonText: 'Yes'
        })
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
    this.loadBlockChain();
  }

  constructor(props, context){
    // super(props);
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      index: 0,
      direction: null,
      isError:false,
      fullname:'',
      confirmpassword:'',
      branch:'',
      errorMessage:'Error SomeWhere',
      startDate: new Date(),
      time: '10:00',
      endDate: new Date()
    }

    //this.getStat = this.getStat.bind(this);
    this.login = this.login.bind(this);
    this.handleReserve = this.handleReserve.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.endhandleChange = this.endhandleChange.bind(this);
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
    this.setState({startdate:date});
  }

  endhandleChange(date) {
    this.setState({enddate:date});
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
                <Form.Label>Title Of Problem</Form.Label>
                <Form.Control type="text" placeholder="Enter Title" onChange={(event)=> {
                  this.setState({title: event.target.value,isError:false});
                }} />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Occurance</Form.Label>
                <Form.Control type="text" placeholder="1 time, 2 time..." onChange={(event)=> {
                  this.setState({occurance: event.target.value,isError:false});
                }} />

              </Form.Group>

              <Form.Group controlId="formGridState">
                <Form.Label>Is Allergy</Form.Label>
                <Form.Control as="select" onChange={(event)=> {
                  console.log(event.target.value);
                  this.setState({isallergy: event.target.value,isError:false});
                }}>
                  <option>Allergy...</option>
                  <option>yes</option>
                  <option>no </option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Severity</Form.Label>
                <Form.Control type="text" placeholder="extreme, general.." onChange={(event)=> {
                  this.setState({severity: event.target.value,isError:false});
                }} />
              </Form.Group>
                
              <div className='row dev'>
                <Col>
                  <Form.Group controlId='heck'>
                    <label for="date">Begin data</label>
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
                    <label for="date">End data</label>
                    <br></br>
                    {/* <input type="email" class="form-control" id="email" placeholder="Enter email" name="email"/>   */}
                    <DatePicker
                      id='date'
                      selected={this.state.endDate}
                      onChange={this.endhandleChange}
                    />
                  </Form.Group>
                </Col>
              </div>    

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Referred By </Form.Label>
                <Form.Control type="text" placeholder="refer by .." onChange={(event)=> {
                  this.setState({referby: event.target.value,isError:false});
                }} />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Patient Address </Form.Label>
                <Form.Control type="text" defaultValue={this.state.address} placeholder="patient address" onChange={(event)=> {
                  this.setState({address: event.target.value,isError:false});
                }} />
              </Form.Group>

              {this.getStat()}

                {/* <Form.Group controlId="formBasicChecbox">
                  <Form.Check type="checkbox" label="Remember me" />
                </Form.Group> */}
              <Button className='submitbotton' variant="primary" type="submit" onClick={(e)=>this.addchain(e)}>
                Add Data
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
