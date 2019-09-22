import React,{ Component } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import '../style/medical.add.css';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'rc-time-picker/assets/index.css';
import Web3 from 'web3';
import contracts from 'truffle-contract';

var provider    = new Web3.providers.HttpProvider("http://localhost:7545");
var Medical    = require('../../Ajson/MedicalRecord.json');


class Reservation extends Component{
  state = {
    index: 0,
    direction: null,
    isError: false,
    errorMessage: 'Error SomeWhere',
    time: '10:00',
    account: '',
    title: '',
    startDate: new Date(),
    endDate: new Date(),
    isAllergy: false,
    occurrence: '',
    referredBy: '',
    severity: '',
    doctorAddress: '',
  };

  componentDidMount() {
    this.loadBlockChain();
  }

  async loadBlockChain() {
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545')
    const network = await web3.eth.net.getNetworkType();
    console.log(network) // should give you main if you're connected to the main network via metamask...
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    console.log("this is"+accounts[0]);
    web3.eth.defaultAccount = web3.eth.accounts[0]
    web3.eth.getBalance(this.state.account)
.then(console.log);
  }

  async addchain(e){
    const {
      title,
      startDate,
      endDate,
      occurrence,
      referredBy,
      severity,
      doctorAddress,
      isAllergy,
    } = this.state;
    e.preventDefault();
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:8080')
    await web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log("from this" + error);
      }

      let proposalInstance;
      let MetaCoinContract = contracts(Medical);
      MetaCoinContract.setProvider(provider);
      MetaCoinContract.deployed().then(function(instance){
        proposalInstance = instance;
          return proposalInstance.submitIssue(title, startDate, endDate, occurrence, severity, referredBy, isAllergy, accounts[0], doctorAddress, {
            from: accounts[0]
          });
      }).then(function(result) {
        console.log(result);
        Swal.fire({
          title: `Issue submitted!`,
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

  onChange = time => this.setState({ time })

  // handleChange(date) {
  //   this.setState({ startDate:date });
  // }

  handleChange = date => this.setState({ startDate: Date.parse(date) });
  endHandleChange = date => this.setState({ endDate: Date.parse(date) });
  handleAllergyOnChange = event => {
    const isAllergy = event.target.value === 'yes' ? true : false;
    this.setState({ isAllergy, isError: false });
  };

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
    return(
      <div className='container-fluid bg  dev'>
        <div className='bcc dev'>
          <div className='row ro dev'>
            <div className='col-md-6 col-sm-12 dev'>
              <div className='bc dev'>
                <div className='intro dev'>
                  <h1 id='name'>SUBMIT MEDICAL ISSUE</h1>
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
                <Form.Label>Occurrence</Form.Label>
                <Form.Control type="text" placeholder="1 time, 2 time..." onChange={(event)=> {
                  this.setState({occurrence: event.target.value,isError:false});
                }} />

              </Form.Group>

              <Form.Group controlId="formGridState">
                <Form.Label>Is Allergy</Form.Label>
                <Form.Control as="select" onChange={this.handleAllergyOnChange}>
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
                      onChange={this.endHandleChange}
                    />
                  </Form.Group>
                </Col>
              </div>    

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Referred By </Form.Label>
                <Form.Control type="text" placeholder="refer by .." onChange={(event)=> {
                  this.setState({referredBy: event.target.value,isError:false});
                }} />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Doctor Address </Form.Label>
                <Form.Control type="text" defaultValue={this.state.doctorAddress} placeholder="doctor address" onChange={(event)=> {
                  this.setState({doctorAddress: event.target.value,isError:false});
                }} />
              </Form.Group>

              {this.getStat()}

                {/* <Form.Group controlId="formBasicChecbox">
                  <Form.Check type="checkbox" label="Remember me" />
                </Form.Group> */}
              <Button className='submitbotton' variant="primary" type="submit" onClick={(e)=>this.addchain(e)}>
                Add Data
              </Button>

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
