const MyToken = artifacts.require('MyToken')

module.exports = async function(deployer, network, accounts) {
  // deploy the smart contracts to the blockchain
  await deployer.deploy(MyToken)
};