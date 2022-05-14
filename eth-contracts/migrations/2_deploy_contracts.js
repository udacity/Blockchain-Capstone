// migrating the appropriate contracts
var ERC721Mintable = artifacts.require("CustomERC721Token");
// var SquareVerifier = artifacts.require("./SquareVerifier.sol");
// var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");

module.exports = function (deployer) {
  deployer.deploy(ERC721Mintable);
  // deployer.deploy(SquareVerifier);
  // deployer.deploy(SolnSquareVerifier);
};
