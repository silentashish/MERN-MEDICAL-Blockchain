import React,{ Component } from 'react';
import '../style/medical.add.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import 'rc-time-picker/assets/index.css';
import Web3 from 'web3';
import Medical from '../../Ajson/MedicalRecord.json';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const styles = {
  tablePanel: {
    'overflowY': 'scroll',
    height: '200px',
  }
};

class ViewMedicationList extends Component{
  state = {
    medicalIssue: [],
    medications: [],
    selectedRow: {},
    isRowSelected: false
  };
  
  async componentDidMount() {
    this.loadWeb3();
    this.showList();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  }

  async showList() {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    const networkData = Medical.networks[networkId];

    if (networkData) {
      const medical = new web3.eth.Contract(Medical.abi, networkData.address);
      const patientMedicalProblems = await medical.methods.getPatientMedicalProblemsByAddress(accounts[0]).call();
      const patientMedications = await medical.methods.getPatientMedicationsByAddress(accounts[0]).call();
      console.log(patientMedications);
      let medicalIssue = [];
      for(let i = 0; i < patientMedicalProblems.length; i++) {
        medicalIssue.push({
          id: patientMedicalProblems[i].id,
          title: patientMedicalProblems[i].title,
          type: patientMedicalProblems[i].isAllergyType === true ? 'Allergy': '',
          startDate: `${new Date(Number(patientMedicalProblems[i].beginDate)).getMonth()}/${new Date(Number(patientMedicalProblems[i].beginDate)).getDate()}/${new Date(Number(patientMedicalProblems[i].beginDate)).getFullYear()}`,
          endDate: `${new Date(Number(patientMedicalProblems[i].endDate)).getMonth()}/${new Date(Number(patientMedicalProblems[i].endDate)).getDate()}/${new Date(Number(patientMedicalProblems[i].endDate)).getFullYear()}`,
          patientAddress: patientMedicalProblems[i].patientAddress
        });
      }

      let medications = [];
      for(let i = 0; i < patientMedications.length; i++) {
        medications.push({
          id: patientMedications[i].id,
          drug: patientMedications[i].name,
          dosage: patientMedications[i].dosage,
          startDate: `${new Date(Number(patientMedications[i].beginDate)).getMonth()}/${new Date(Number(patientMedications[i].beginDate)).getDate()}/${new Date(Number(patientMedications[i].beginDate)).getFullYear()}`,
          endDate: `${new Date(Number(patientMedications[i].endDate)).getMonth()}/${new Date(Number(patientMedications[i].endDate)).getDate()}/${new Date(Number(patientMedications[i].endDate)).getFullYear()}`,
          referrer: patientMedications[i].referredBy
        });
      }
      this.setState({ medications, medicalIssue });
    }
  }

  onRowSelect = (row, isRowSelected) => this.setState({ selectedRow: row, isRowSelected });

  render(){
    const selectRowProp = {
      mode: 'radio',
      bgColor: '#fff', // you should give a bgcolor, otherwise, you can't regonize which row has been selected
      onSelect: this.onRowSelect
    };
    const { medications, medicalIssue } = this.state;
    return(
      <div className='container-fluid bg'>
            <div className='col-md-12 col-sm-12 dev'>
              <div className='bc dev'>
                <div className='intro2 dev' >
                  <h2>MEDICATIONS</h2>
                  <div style={styles.tablePanel}>
                    <div>
                      <div className="panel panel-default">
                        <div className="panel-body">
                          <BootstrapTable data={ medications } table striped hover>
                            <TableHeaderColumn dataField='id' isKey={ true }>ID</TableHeaderColumn>
                            <TableHeaderColumn dataField='drug'>Drug</TableHeaderColumn>
                            <TableHeaderColumn dataField='dosage'>Dosage</TableHeaderColumn>
                            <TableHeaderColumn dataField='startDate'>Start date</TableHeaderColumn>
                            <TableHeaderColumn dataField='endDate'>End date</TableHeaderColumn>
                            <TableHeaderColumn dataField='referrer'>Referrer</TableHeaderColumn>
                        </BootstrapTable>
                        </div>
                      </div>
                    </div>
                  </div>
                  <br />
                  <h2>ISSUE LIST</h2>
                  <div style={styles.tablePanel}>
                    <div>
                      <div className="panel panel-default">
                        <div className="panel-body">
                          <BootstrapTable data={ medicalIssue } selectRow={ selectRowProp }>
                            <TableHeaderColumn dataField='id' isKey={ true }>ID</TableHeaderColumn>
                            <TableHeaderColumn dataField='title'>Title</TableHeaderColumn>
                            <TableHeaderColumn dataField='type'>Type</TableHeaderColumn>
                            <TableHeaderColumn dataField='startDate'>Start date</TableHeaderColumn>
                            <TableHeaderColumn dataField='endDate'>End date</TableHeaderColumn>
                            <TableHeaderColumn dataField='patientAddress' hidden>Patient</TableHeaderColumn>
                        </BootstrapTable>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{ margin: '40px' }}>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      disabled={!this.state.isRowSelected}
                      onClick={() => {
                        this.props.history.push({ pathname:'/createmedication', state: this.state.selectedRow });
                      }}
                    >Create Medication
                    </button>
                  </div>
                </div>

              </div>
            </div>
      </div>
        
    )
  }
}

export default ViewMedicationList;
