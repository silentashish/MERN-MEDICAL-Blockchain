import Carousel from 'react-bootstrap/Carousel';
import React from 'react'
import '../style/carousel.css'
import Web3 from 'web3';
import contracts from 'truffle-contract';
import path from 'path';
var provider    = new Web3.providers.HttpProvider("http://localhost:7545");
var Medical    = require('./Medical.json');


class ControlledCarousel extends React.Component {
  state = {account: ''}
  Account = '';

  async loadBlockChain() {
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:8080')
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

  async showchain(){
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

  async addchain(){
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:8080')
    await web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      var account = accounts[0];

      var proposalInstance;
      var value1 = "var";
      var value2 = "var";
      var value3 = "var";
      var value4 = "var";
      var value5 = "var";
      var MetaCoinContract = contracts(Medical);
      MetaCoinContract.setProvider(provider);
      MetaCoinContract.deployed().then(function(instance){
        proposalInstance = instance;
          return proposalInstance.addPatient(value1, value2, value3, value4, value5,{from: account});
      }).then(function(result) {
        console.log(result);
        var event = proposalInstance.CreatedPatientEvent();
      }).catch(function(err) {
        console.log(err.message);
      });
    }
    )}

  async adchain() {
    console.log("clicked");
    var proposalInstance;
    var value1 = "var";
    var value2 = "var";
    var value3 = "var";
    var value4 = "var";
    var value5 = "var";

    Web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      var account = accounts[0];
      contracts.Medical.deployed().then(function(instance) {
        proposalInstance = instance;
        return proposalInstance.addPatient(value1, value2, value3, value4, value5);
      }).then(function(result) {
        console.log("Result is"+result);
        var event = proposalInstance.CreatedPatientEvent();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  }

  constructor(props, context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      index: 0,
      direction: null,
    };
  }

  handleSelect(selectedIndex, e) {
    this.setState({
      index: selectedIndex,
      direction: e.direction,
    });
  }

  componentDidMount() {
    this.loadBlockChain()
  }

  render() {
    const { index, direction } = this.state;

    return (
      <div>
      <Carousel className='carousel'
        height ={50}
        activeIndex={index}
        direction={direction}
        onSelect={this.handleSelect}
      >
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={require('../../Img/1.png')}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={require('../../Img/2.png')}
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={require('../../Img/3.png')}
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <button onClick={()=>this.addchain()}>Click Me Hoss</button>
      <button onClick={()=>this.showchain()}>Click Me Hoss</button>
      <span>{this.state.data}</span>
      </div>
    );
  }
}

export default ControlledCarousel;
