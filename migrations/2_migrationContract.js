var StepanToken2 = artifacts.require("./StepanToken2.sol");
var myToken = artifacts.require("./MyToken.sol");

module.exports = function(deployer) {
  deployer.deploy(StepanToken2);
  deployer.deploy(myToken);
};
