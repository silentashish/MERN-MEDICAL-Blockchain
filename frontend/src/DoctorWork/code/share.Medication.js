import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import '../style/medical.add.css';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import 'rc-time-picker/assets/index.css';
import Web3 from 'web3';
import contracts from 'truffle-contract';

var provider    = new Web3.providers.HttpProvider("http://localhost:7545");
var Medical    = require('../../Ajson/MedicalRecord.json');

export default class ShareMedication extends Component{
  state = {
    account: '',
    doctorAddress: '',
    medicalProblemId: (typeof (this.props.location.state) === 'undefined' ?
      0 : this.props.location.state.id)
  };

  async componentDidMount() {
    this.loadBlockChain()
  }

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
    e.preventDefault();
    const { doctorAddress, medicalProblemId } = this.state;    
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:8080')
    await web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(`Error from this ${accounts[0]}. Details: ${error}`);
      }
      let proposalInstance;
      let MetaCoinContract = contracts(Medical);
      MetaCoinContract.setProvider(provider);
      MetaCoinContract.deployed().then(function(instance){
        proposalInstance = instance;
          return proposalInstance.shareMedicationTo(doctorAddress, medicalProblemId, { from: accounts[0]});
      }).then(function(result) {
        Swal.fire({
            title: 'Prescription shared!',
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

  onChange = time => this.setState({ time })

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
                  <h1 id='name'>Share Medication</h1>
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
              <div className='boxe dev' >
            <Form className="reserveform">
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Enter Address</Form.Label>
                <Form.Control type="text" placeholder="Share address" onChange={(event)=> {
                  this.setState({doctorAddress: event.target.value,isError:false});
                }} />
              </Form.Group>


              <Form.Group controlId="formBasicPassword">
                <Form.Label>Medical Problem ID</Form.Label>
                <Form.Control type="text" placeholder="Medical problem id" value={this.state.medicalProblemId || 0} onChange={(event)=> {
                  this.setState({medicalProblemId: event.target.value,isError:false});
                }} />
              </Form.Group>

              <Button className='submitbotton' variant="primary" type="/submit" onClick={(e)=>this.addchain(e)}>
                Share
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

ShareMedication.defaultProps = {
  state: {}
};

ShareMedication.propTypes = {
  state: PropTypes.shape({
    id: PropTypes.number,
    doctorAddress: PropTypes.string,
  })
};