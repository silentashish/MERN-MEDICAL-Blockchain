pragma solidity >=0.4.21 <0.6.0;

pragma experimental ABIEncoderV2;

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
  uint[] public patientIssueIndexes;
  mapping(address => patientIssue) public patientIssues;

  struct Medication {
    uint id;
    string name;
    uint beginDate;
    uint endDate;
    string dosage;
    string referredBy;
    string hospName;
    uint medicalProblemId;
    address[] candidateAddress; // Can share to multiple doctors by single patientMedication
  }
  uint[] public medicationIndexes;
  mapping(uint => Medication) public medications;

  struct patientMedication {
    uint id;
    mapping(uint => uint) medicationIds; // This patient can have multiple medications
  }
  uint[] public patientMedicationIndexes;
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

  modifier onlyPatientOrDoctor(address _address) {
    if(candidateRoles[_address] == Roles.PATIENT || candidateRoles[_address] == Roles.DOCTOR) {
      _;
    }
  }

  // All candidates have to go through this registration process
  // And only contract owner can register the candidate
  function registerCandidate(address _candidate, Roles _candidateRoles) public onlyOwner {
    require(!validateCandidate(_candidate), 'Already registered');
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

  function getCandidateByAddress(address _candidate) public view returns(address, string memory) {
    address _candidateAddress = address(0); // empty address
    string memory _candidateRole = "";
    for(uint i = 0; i < candidateList.length; i++) {
      if(candidateRoles[_candidate] == Roles.DOCTOR) {
        _candidateRole = "Doctor";
        _candidateAddress = _candidate;
        break;
      } else if(candidateRoles[_candidate] == Roles.PATIENT) {
          _candidateRole = "Patient";
          _candidateAddress = _candidate;
          break;
      } else{
          _candidateRole = "Medical Assistant";
          _candidateAddress = _candidate;
          break;
      }
    }
    return(_candidateAddress, _candidateRole);
  }

  function getAllCandidates() public view returns(address[] memory, string[] memory) {
    address[] memory _candidateAddresses = new address[](candidateList.length);
    string[] memory _candidateRoles = new string[](candidateList.length);
    for(uint i = 0; i < candidateList.length; i++) {
      if(candidateRoles[candidateList[i]] == Roles.DOCTOR) {
        _candidateRoles[i] = "Doctor";
      } else if(candidateRoles[candidateList[i]] == Roles.PATIENT) {
          _candidateRoles[i] = "Patient";
      } else {
          _candidateRoles[i] = "Medical Assistant";
      }
      _candidateAddresses[i] = candidateList[i];
    }
    return(_candidateAddresses, _candidateRoles);
  }

//   function getMsgSender() public view returns(address _msgSender) {
//     _msgSender = msg.sender;
//   }
//this makes no sense;

    
//   function getAllMedicalProblems() public view returns(
//       uint[] memory, string[] memory, uint[] memory, uint[] memory, string[] memory, string[] memory, string[] memory, bool[] memory, address[] memory) {
//       uint[] memory _id = new uint[](medicalProblems.length);
//       uint[] memory _beginDate = new uint[](medicalProblems.length);
//       uint[] memory _endDate = new uint[](medicalProblems.length);
//       string[] memory _title = new string[](medicalProblems.length);
//       string[] memory _occurance = new string[](medicalProblems.length);
//       string[] memory _severity = new string[](medicalProblems.length);
//       string[] memory _referredBy = new string[](medicalProblems.length);
//       bool[] memory _isAllergyType = new bool[](medicalProblems.length);
//       address[] memory _patientAddress = new address[](medicalProblems.length);
      
//       for(uint i = 0; i < medicalProblems.length; i++) {
//           MedicalProblem storage _medicalProblem = medicalProblems[i];
//           _id[i] = _medicalProblem.id;
//           _beginDate[i] = _medicalProblem.beginDate;
//           _endDate[i] = _medicalProblem.endDate;
//           _title[i] = _medicalProblem.title;
//           _occurance[i] = _medicalProblem.occurance;
//           _severity[i] = _medicalProblem.severity;
//           _referredBy[i] = _medicalProblem.referredBy;
//           _isAllergyType[i] = _medicalProblem.isAllergyType;
//           _patientAddress[i] = _medicalProblem.patientAddress;
//       }
//       return (_id, _title, _beginDate, _endDate, _occurance, _severity, _referredBy, _isAllergyType, _patientAddress);
//   }

  function getMedicalProblemById(uint _medicalProblemId) public view returns(MedicalProblem memory) {
    for(uint i = 0; i < medicalProblems.length; i++) {
      if(medicalProblems[i].id == _medicalProblemId) return medicalProblems[i];
    }
  }

  // Call by patient
  function getMedicalProblemsByAddress(address _patientAddress) public view returns(MedicalProblem[] memory) {
    MedicalProblem[] memory _medicalProblems = new MedicalProblem[](medicalProblems.length);
    for(uint i = 0; i < medicalProblems.length; i++) {
      if(medicalProblems[i].patientAddress == _patientAddress) {
        _medicalProblems[i] = medicalProblems[i];
      }
      else delete _medicalProblems[i]; // Remove empty elements from MedicalProblem array;
    }
    return _medicalProblems;
  }

  function getAllMedicalProblems() public view returns(MedicalProblem[] memory) {
    return medicalProblems;
  }

  function getMedicationById(uint _medicationId) public view returns(Medication memory) {
    for(uint i = 1; i <= medicationIndexes.length; i++) {
      if(medications[i].id == _medicationId) return medications[i];
    }
  }

  // Call by provider
  function getAllMedications() public view returns(Medication[] memory) {
    Medication[] memory _medications = new Medication[](medicationIndexes.length);

    for(uint i = 1; i <= medicationIndexes.length; i++) {
      _medications[i-1] = medications[i];
    }
    return _medications;
  }

  // Call by patient
  function getMedicationsByAddress(address _patientAddress) public view returns(Medication[] memory) {
    Medication[] memory _medications = new Medication[](medicationIndexes.length);
    for(uint i = 1; i <= medicationIndexes.length; i++) {
      _medications[i-1] = getMedicationById(patientMedications[_patientAddress].medicationIds[i]);
      if(_medications[i-1].id < 1 || _medications[i-1].id > medicationIndexes.length) {
        delete _medications[i-1]; // Remove empty elements from Medication array
      }
    }
    return _medications;
  }

  // Call by doctor
  function getPatientMedicationsByAddress(address _candidateAddress) public view returns(Medication[] memory) {
    Medication[] memory _medications = new Medication[](medicationIndexes.length);
    for(uint i = 1; i <= medicationIndexes.length; i++) {
      if(canViewMedicationByCandidate(medications[i].id, _candidateAddress)) {
        _medications[i-1] = medications[i];
      }
      else delete _medications[i-1]; // Remove empty elements from Medication array;
    }
    return _medications;
  }

  // Check if this "_candidateAddress" can view medication "_medicationId" medication
  function canViewMedicationByCandidate(uint _medicationId, address _candidateAddress) public view returns (bool) {
    Medication memory _medication = medications[_medicationId];
    for(uint i = 0; i < _medication.candidateAddress.length; i++) {
      if(_medication.candidateAddress[i] == _candidateAddress) return true;
    }
    return false;
  }

  // Call by doctor
  function getPatientMedicationsByAddress(address _patientAddress, address _candidateAddress) public view returns(Medication[] memory) {
    Medication[] memory _medications = getMedicationsByAddress(_patientAddress);
    Medication[] memory __medications = new Medication[](_medications.length);

    for(uint i = 1; i <= _medications.length; i++) {
      if(canViewMedicationByCandidate(_medications[i].id, _candidateAddress)) {
        __medications[i-1] = _medications[i];
      }
      else delete __medications[i-1]; // Remove empty elements from Medication array;
    }
    return __medications;
  }

  // Call by doctor
  function getPatientMedicalProblemsByAddress(address _candidateAddress) public view returns(MedicalProblem[] memory) {
    MedicalProblem[] memory _medicalProblems = new MedicalProblem[](medicalProblems.length);

    for(uint i = 0; i < medicalProblems.length; i++) {
      _medicalProblems[i] = getMedicalProblemById(patientIssues[_candidateAddress].medicalProblemIds[i+1]);
      if(_medicalProblems[i].id < 1 || _medicalProblems[i].id > medicalProblems.length) {
        delete _medicalProblems[i]; // Remove empty elements from Medication array
      }
    }
    return _medicalProblems;
  }

  // Call by doctor
  function getPatientMedicalProblemsByAddress(address _patientAddress, address _candidateAddress) public view returns(MedicalProblem[] memory) {
    MedicalProblem[] memory _medicalProblems = getPatientMedicalProblemsByAddress(_candidateAddress);
    MedicalProblem[] memory __medicalProblems = new MedicalProblem[](_medicalProblems.length);

    for(uint i = 0; i < _medicalProblems.length; i++) {
      if(_medicalProblems[i].patientAddress == _patientAddress) {
        __medicalProblems[i] = _medicalProblems[i];
      }
      else delete __medicalProblems[i]; // Remove empty elements from MedicalProblem array;
    }
    return __medicalProblems;
  }

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
    address _patientAddress) public onlyPatientOrDoctor(msg.sender) {
    // Require a valid doctor to create medication
    //require(_candidateRoles == Roles.PATIENT, 'Only patient can submit medical issue');
    // Increment medicalProblem count
    medicalProblemCount ++;
    // Create the medical problem
    medicalProblems.push(MedicalProblem(
      medicalProblemCount,
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
    uint _medicalProblemId) public onlyPatientOrDoctor(msg.sender) {
    // Require a valid doctor address to submit patient issue
    require(_doctorAddress != address(0), 'Please enter doctor address');

     // Medical problem id is must require to create patient issue
    require(_medicalProblemId > 0, 'Please enter medical problem id');

    // Increment medicalProblem count
    patientIssueCount ++;

    patientIssues[_doctorAddress].id = patientIssueCount;
    patientIssues[_doctorAddress].medicalProblemIds[_medicalProblemId] = _medicalProblemId;

    // Save index
    patientIssueIndexes.push(patientIssueCount);
  }

  function submitIssue(
    string memory _title,
    uint _beginDate,
    uint _endDate,
    string memory _occurance,
    string memory _severity,
    string memory _referredBy,
    bool _isAllergyType,
    address _patientAddress,
    address _doctorAddress) public onlyPatientOrDoctor(msg.sender) returns(bool) {
      uint lastMedicalProblemCount = medicalProblems.length;
      createMedicalProblem(
        _title,
        _beginDate,
        _endDate,
        _occurance,
        _severity,
        _referredBy,
        _isAllergyType,
        _patientAddress
      );
      if(medicalProblems.length > lastMedicalProblemCount) {
        lastMedicalProblemCount = medicalProblems.length;
        uint _currentMedicalProblemId = medicalProblems[lastMedicalProblemCount-1].id;
        createPatientIssue(_doctorAddress, medicalProblems[lastMedicalProblemCount-1].id);
        if(patientIssues[_doctorAddress].medicalProblemIds[_currentMedicalProblemId] == _currentMedicalProblemId) return true;
        return false;
      }
  }

  function createMedication(
    string memory _name,
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
      _name,
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

    // Save index
    medicationIndexes.push(medicationCount);
  }

  function prescribeMedication(
    string memory _name,
    uint _beginDate,
    uint _endDate,
    string memory _dosage,
    string memory _referredBy,
    string memory _hospName,
    uint _medicalProblemId,
    address _patientAddress) public onlyDoctor(msg.sender) returns(bool _result) {
      _result = false;
      uint lastMedicationCount = medicationIndexes.length;
      createMedication(
        _name,
        _beginDate,
        _endDate,
        _dosage,
        _referredBy,
        _hospName,
        _medicalProblemId
      );
      if(medicationIndexes.length > lastMedicationCount) {
        lastMedicationCount = medicationIndexes.length;
        uint _currentMedicationId = medications[lastMedicationCount].id;
        // Increment patient count
        patientMedicationCount ++;
        patientMedications[_patientAddress].id = patientMedicationCount;
        patientMedications[_patientAddress].medicationIds[_currentMedicationId] = _currentMedicationId;

        // save index
        patientMedicationIndexes.push(patientMedicationCount);
        _result = true;
      }
      return _result;
  }
// onlyPatient(msg.sender)
  function shareMedicationTo(address _candidateAddress, uint _medicationId) public {
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
