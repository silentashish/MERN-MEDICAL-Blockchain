const Medical = artifacts.require("MedicalRecord");

module.exports = function(deployer) {
  deployer.deploy(Medical);
};
