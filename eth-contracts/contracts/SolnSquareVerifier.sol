// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./SquareVerifier.sol";
import "./ERC721Mintable.sol";

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>

contract SolnSquareVerifier is ERC721Mintable, Verifier {
    struct Solution {
        uint256 index;
        address addr;
    }

    mapping(bytes32 => Solution) private solutions;

    event SolutionAdded(bytes32 indexed solutionKey);

    function getSolutionKey(Solution memory solution)
        public
        pure
        returns (bytes32)
    {
        return keccak256(abi.encodePacked(solution.index, solution.addr));
    }

    function addSolution(Solution memory solution) public {
        bytes32 solutionKey = getSolutionKey(solution);
        solutions[solutionKey] = solution;
        emit SolutionAdded(solutionKey);
    }

    //  - make sure you handle metadata as well as tokenSuplly
    function mint(address to, uint256 index, uint[2] memory a, uint[2][2] memory b, uint[2] memory c, uint[2] memory input) public {

        require(index > 0, "Index must be greater than 0");

        Pairing.G1Point memory p_a = Pairing.G1Point(a[0], a[1]);
        Pairing.G2Point memory p_b = Pairing.G2Point(b[0], b[1]);
        Pairing.G1Point memory p_c = Pairing.G1Point(c[0], c[1]);

        Proof memory proof = Proof(p_a, p_b, p_c);

        require(verifyTx(proof, input), "Proof does not verify");

        Solution memory solution = Solution(index, to);
        bytes32 solutionKey = getSolutionKey(solution);
        
        // make sure the solution is unique (has not been used before)
        require(solutions[solutionKey].index == 0, "Solution already used");
        addSolution(solution);

        super.mint(to, index);
    }
}
