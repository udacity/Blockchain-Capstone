// migrating the appropriate contracts
var ERC721Mintable = artifacts.require("ERC721Mintable");
var Verifier = artifacts.require("Verifier");
var SolnSquareVerifier = artifacts.require("SolnSquareVerifier");

module.exports = function (deployer) {
  deployer.deploy(ERC721Mintable);
  deployer.deploy(Verifier);
  deployer.deploy(SolnSquareVerifier);
};
