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
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const format = 'h:mm a';

const now = moment().hour(0).minute(0);

const styles = {
  tablePanel: {
    'overflow-y': 'scroll',
    height: '200px',
  },
};
var provider    = new Web3.providers.HttpProvider("http://localhost:7545");
var Medical    = require('../../Ajson/MedicalRecord.json');
const products = [
  {
    id: 1,
    name: "Product1",
    price: 120
  }, {
    id: 2,
    name: "Product2",
    price: 80
  }, {
    id: 3,
    name: "Product3",
    price: 80
  }, {
    id: 4,
    name: "Product4",
    price: 80
  }, {
    id: 5,
    name: "Product5",
    price: 80
  }, {
    id: 6,
    name: "Product6",
    price: 80
  }, {
    id: 7,
    name: "Product7",
    price: 80
  }, {
    id: 2,
    name: "Product2",
    price: 80
  }, {
    id: 2,
    name: "Product2",
    price: 80
  }, {
    id: 2,
    name: "Product2",
    price: 80
  }, {
    id: 2,
    name: "Product2",
    price: 80
  }
]

class ShowList extends Component{
  state = { account: '' }
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

  async showMedication() {
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:8080')
    const web3.eth.getAccounts((error, accounts) => {
      if (error) {
        console.log(`Error: ${error} from account ${accounts}`);
      }
      let account = accounts[0];
      let MetaCoinContract = contracts(Medical);
    });
  }
  async addchain(e){
    var value;
    var location;
    e.preventDefault();
    
    location=this.state.location;
    var id =this.state.id;
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
          return proposalInstance.shareMedicationTo(location,id,{from:"0xeb80652D6770084fDC4BD37e2c45bdbB9E1AdbaF" });
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
      <div className='container-fluid bg'>
            <div className='col-md-12 col-sm-12 dev'>
              <div className='bc dev'>
                <div bg className='intro2 dev' >
                  <h2>MEDICATIONS</h2>
                  <div style={styles.tablePanel}>
                    <div>
                      <div class="panel panel-default">
                        <div class="panel-body">
                          <BootstrapTable data={ products } table striped hover>
                            <TableHeaderColumn dataField='id' isKey={ true }>Product ID</TableHeaderColumn>
                            <TableHeaderColumn dataField='name'>Product Name</TableHeaderColumn>
                            <TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn>
                        </BootstrapTable>
                        </div>
                      </div>
                    </div>
                  </div>
                  <br />
                  <h2>ISSUE LIST</h2>
                  <div style={styles.tablePanel}>
                    <div>
                      <div class="panel panel-default">
                        <div class="panel-body">
                          <BootstrapTable data={ products } table striped hover>
                            <TableHeaderColumn dataField='id' isKey={ true }>Product ID</TableHeaderColumn>
                            <TableHeaderColumn dataField='name'>Product Name</TableHeaderColumn>
                            <TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn>
                        </BootstrapTable>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          {/* </div> */}
        {/* </div> */}
      </div>
        
    )
  }
}

export default ShowList;
