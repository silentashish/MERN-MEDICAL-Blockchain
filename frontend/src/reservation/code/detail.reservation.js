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
import Web3 from 'web3';
import contracts from 'truffle-contract';
import path from 'path';

const format = 'h:mm a';

const now = moment().hour(0).minute(0);


var provider    = new Web3.providers.HttpProvider("http://localhost:7545");
var Medical    = require('../../Ajson/MedicalRecord.json');


class Reservation extends Component{
  state = {
    account: '',
    currCandidateAddress: '',
    currCandidateType: ''
  };
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

  async showchain(e){
    e.preventDefault();
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:8080')
    await web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      var account = accounts[0];

      var proposalsInstance;
      var value1 = "var";
      var value2 = "var";
      var value3 = "var";
      var value4 = "var";
      var value5 = "var";
      var MetaCoinContract = contracts(Medical);
      MetaCoinContract.setProvider(provider);
      MetaCoinContract.deployed().then(function(instance){
        proposalsInstance = instance
        proposalsInstance.getNumPatients.call().then(function(numProposals) {
          for (var i=0; i<numProposals; i++) {
            proposalsInstance.getPatient.call(i).then(function(data) {
              console.log(data);
            }).catch(function(err) {
              console.log("from this "+err.message);
            });
          }
        }).catch(function(err) {
          console.log("from this"+err.message);
        });
    })
    
    })
  }

  async setTitle() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }

    const accounts = await window.web3.eth.getAccounts();
    const networkId = await window.web3.eth.net.getId();
    const networkData = Medical.networks[networkId];

    if (networkData) {
      const medical = new window.web3.eth.Contract(Medical.abi, networkData.address);
      const currentCandidate = await medical.methods.getCandidateByAddress(accounts[0]).call();
      this.setState({
        currCandidateAddress: currentCandidate[0],
        currCandidateType: currentCandidate[1]
      });
    }
  }

  async addchain(e){
    e.preventDefault();
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
          return proposalInstance.registerCandidate("0xb1619F11827C4e7234FF54AB5cEa85Fd91329319","0",{from: accounts[0]});
      }).then(function(result) {
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
    this.setTitle()
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
    this.handleReserve = this.handleReserve.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
    const { currCandidateAddress, currCandidateType } = this.state;
    const headerLabel = `You are ${currCandidateType} [${currCandidateAddress}]`;
    return(
      <div className='container-fluid bg  dev'>
        <div className='bcc dev'>
          <div className='row ro dev'>
            <div className='col-md-12 col-sm-12 dev'>
              <div className='bc dev'>
                <div className='intro dev'>
                  <div><h3 style={{ color: '#fff' }}>{currCandidateType !== '' ? headerLabel : ''}</h3></div>
                  <div className='flex-container'>
                      <div onClick={()=>this.props.history.push("/viewMedication")}>
                        <img className='inim' src={require('../../Img/analysis.png')} />
                        <br></br>
                        <br></br>
                        <h5>View Medication</h5>
                      </div>

                      <div onClick={()=>this.props.history.push("/createpatientissue")}> 
                        <img className='inim' src={require('../../Img/healthcare.png')} />
                        <br></br>
                        <br></br>
                        <h5>Create Patient Issue</h5>
                      </div>
                  </div>

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
