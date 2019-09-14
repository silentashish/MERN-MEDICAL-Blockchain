pragma solidity ^0.4.24;

// /** @title Medical Record. */
// contract MedicalRecord {
// /** @dev Adds a new patient and gets the patient record.
//     * @param admissionNo The admission number of the patient.
//     * @param name The name of the patient.
//     * @param hospital The name of the hospital.
//     * @param doctor The name of the patients doctor.
//     * @param prescription The name of the patients prescription.
//     * @return recordInt Returns the patients record number.
// */

//     /** @dev Custom defined types for the patient record. */
//     struct Record {
//         string admissionNo;
//         string name;
//         string hospital;
//         string doctor;
//         string prescription;
//         address[] patientsAddress;
//     }

//     /** @dev Records array */
//     Record[] public records;

//     mapping(address => bool) public patients;

//     address public owner = msg.sender;
//     event CreatedPatientEvent();

//     /** @dev Restrict read access to contract’s state by other contracts */
//     modifier onlyBy(address _account)
//     {
//         require(
//             msg.sender == _account,
//             "Sender not authorized."
//         );
//         _;
//     }

//     /** @dev Returns the number of patients. */
//     function getNumPatients() public view
//         //onlyBy(owner)
//         returns (uint) {
//             return records.length;
//     }

//     /** @dev Adds a new patient record. */
//      function addPatient(string _admissionNo, string _name, string _hospital, string _doctor, string _prescription)  public
//      //onlyBy(owner)  //restrict access
//      returns (bool) {
//         require(bytes(_admissionNo).length > 0, "Admission Number is required"); //check the admission number is entered
//         require(bytes(_name).length > 0, "Patient Name is required"); //check the patient name is entered
//         require(bytes(_admissionNo).length <= 9, "Admission Length is 9"); //check the admission number length is 9 characters

//         Record memory record;
//         emit CreatedPatientEvent();  //update the event

//         record.admissionNo = _admissionNo;
//         record.name = _name;
//         record.hospital = _hospital;
//         record.doctor = _doctor;
//         record.prescription = _prescription;

//         records.push(record); //add the patient record

//         patients[msg.sender] = true; //update to true
//         return true;
//     }

//     /** @dev Gets the patient record based on the record id. */
//     function getPatient(uint recordInt) public view
//     //onlyBy(owner)  //restrict access
//     returns (uint, string, string, string, string, string, address[]) {
//         if (records.length > 0) {  //check the record length is greater than 0
//             Record storage p = records[recordInt]; // Get the record
//             return (recordInt, p.admissionNo, p.name, p.hospital, p.doctor, p.prescription, p.patientsAddress);  //return the record set based on the id
//         }
//     }
// }

// pragma solidity >=0.4.21 <0.6.0;

// pragma experimental ABIEncoderV2;

/** @title MedicalRecord. */
contract MedicalRecord {
  // State variables
  address public contractOwner;
  address[] public candidateList;
  uint public medicalProblemCount = 0;
  uint public patientIssueCount = 0;
  uint public medicationCount = 0;
  uint public patientMedicationCount = 0;
  address[] doctorAddresses;

  enum Roles { DOCTOR, PATIENT }

  // Store roles of each candidate to their corresponding addresses
  mapping(address => Roles) public candidateRoles;

  // Store accesses that is/are controlled by roles of each candidate to their corresponding addresses
  // mapping(address => bool) public candidateCanAccess;

  struct MedicalProblem {
    uint id;
    string title;
    uint beginDate;
    uint endDate;
    string occurance;
    string severity;
    string referredBy;
    bool isAllergyType;
    address patientAddress;
  }
  MedicalProblem[] public medicalProblems;

  struct patientIssue {
    uint id;
    mapping(uint => uint) medicalProblemIds; // This patient can have multiple medicalProblems
  }

  mapping(address => patientIssue) public patientIssues;

  struct Medication {
    uint id;
    uint beginDate;
    uint endDate;
    string _dosage;
    string referredBy;
    string hospName;
    uint medicalProblemId;
    address[] candidateAddress; // Can share to multiple doctors by single patientMedication
  }

  mapping(uint => Medication) public medications;

  struct patientMedication {
    uint id;
    mapping(uint => uint) medicationIds; // This patient can have multiple medications
  }

  mapping(address => patientMedication) public patientMedications;

  constructor() public {
    contractOwner = msg.sender; // Set the contract owner address
  }

  modifier onlyOwner {
    require(msg.sender == contractOwner, '');
    _;
  }

  modifier onlyDoctor(address _address) {
    require(candidateRoles[_address] == Roles.DOCTOR, '');
    _;
  }

  modifier onlyPatient(address _address) {
    require(candidateRoles[_address] == Roles.PATIENT, '');
    _;
  }

  // All candidates have to go through this registration process
  // And only contract owner can register the candidate
  function registerCandidate(address _candidate, Roles _candidateRoles) public onlyOwner {
    candidateList.push(_candidate);
    candidateRoles[_candidate] = _candidateRoles; // Set role for this candidate
  }

  // Check if this candidate is registered or not before allowing resources access.
  function validateCandidate(address _candidate) public view returns (bool) {
    for(uint i = 0; i < candidateList.length; i++) {
      if(candidateList[i] == _candidate) {
        return true;
      }
    }
    return false;
  }

//   function getMsgSender() public view returns(address _msgSender) {
//     _msgSender = msg.sender;
//   }
//this makes no sense;

//   function getPatientMedicationIds(address _candidateAddress) public view returns(uint[] memory) {
//       return patientMedications[_candidateAddress].medicationId;
//   }

//   function getAllPatientMedications() public view returns(Medication[] memory) {
//       struct[] memory _medications = new struct[](0);
//       for(uint i = 0; i < ) {
          
//       }
//   } 

   /**@dev Creates a medical issue by patient
    * @param _title {string} address of doctor for whom this issue to examine
    * @param _beginDate {uint} begin date of issue
    * @param _endDate {uint} end date of issue
    * @param _occurance {string} how many times this issue occurrs
    * @param _severity {string} severity of this issue
    * @param _referredBy {string} person who refers this issue
    * @param _isAllergyType {bool} is this issue allergy or not
    * @param _patientAddress {address} address of patient for whom this issue belongs
    */
  function createMedicalProblem(
    string memory _title,
    uint _beginDate,
    uint _endDate,
    string memory _occurance,
    string memory _severity,
    string memory _referredBy,
    bool _isAllergyType,
    address _patientAddress) public onlyPatient(msg.sender) {
    // Require a valid doctor to create medication
    //require(_candidateRoles == Roles.PATIENT, 'Only patient can submit medical issue');
    // Increment medicalProblem count
    medicalProblemCount ++;
    patientIssueCount++;
    // Create the medical problem
    medicalProblems.push(MedicalProblem(
      patientIssueCount,
      _title,
      _beginDate,
      _endDate,
      _occurance,
      _severity,
      _referredBy,
      _isAllergyType,
      _patientAddress
    ));
  }

   /**@dev Creates a patient issue submitted by a patient.
    * @param _doctorAddress {address} address of doctor for whom this issue to examine
    * @param _medicalProblemId {uint} medical problem id
    */
  function createPatientIssue(
    address _doctorAddress,
    uint _medicalProblemId) public onlyPatient(msg.sender) {
    // Require a valid doctor address to submit patient issue
    require(_doctorAddress != address(0), 'Please enter doctor address');

     // Medical problem id is must require to create patient issue
    require(_medicalProblemId > 0, 'Please enter medical problem id');

    // Increment medicalProblem count
    patientIssueCount ++;

    patientIssues[_doctorAddress].id = patientIssueCount;
    patientIssues[_doctorAddress].medicalProblemIds[_medicalProblemId] = _medicalProblemId;
  }

  function createMedication(
    uint _beginDate,
    uint _endDate,
    string memory _dosage,
    string memory _referredBy,
    string memory _hospName,
    uint _medicalProblemId) public onlyDoctor(msg.sender) {
    // Increment medication count
    medicationCount ++;
    // Create the medication
    Medication memory _medication = Medication(
        medicationCount,
        _beginDate,
        _endDate,
        _dosage,
        _referredBy,
        _hospName,
        _medicalProblemId,
        new address[](0)
    );
    medications[medicationCount] = _medication;
    medications[medicationCount].candidateAddress.push(msg.sender);
  }

  function prescribeMedication(address _patientAddress, uint _medicationId) public onlyDoctor(msg.sender) {
    // Increment patient count
    patientMedicationCount ++;
    patientMedications[_patientAddress].id = patientMedicationCount;
    patientMedications[_patientAddress].medicationIds[_medicationId] = _medicationId;
  }

  function shareMedicationTo(address _candidateAddress, uint _medicationId) public onlyPatient(msg.sender) {
    // Fetch the medication
    uint _patientMedicationId = patientMedications[msg.sender].medicationIds[_medicationId];
    Medication memory _medication = medications[_patientMedicationId];

    // Make sure this medication has a valid id
    require(_medication.id > 0 && _medication.id == _patientMedicationId, '');
    // Share this patient medication to "_candidateAddress" address
    doctorAddresses = _medication.candidateAddress;
    doctorAddresses.push(_candidateAddress);
    _medication.candidateAddress = doctorAddresses;
  }
}
