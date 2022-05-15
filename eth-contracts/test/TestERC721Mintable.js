var ERC721Mintable = artifacts.require('ERC721Mintable');

contract('TestERC721Mintable', accounts => {

  const owner = accounts[0];
  const totalSupply = 3;

  describe('match erc721 spec', function () {
    before(async function () {
      this.contract = await ERC721Mintable.deployed();

      // mint multiple tokens
      for (let i = 1; i <= totalSupply; i++) {
        await this.contract.mint(accounts[i], i);
      }
    })

    it('should return total supply', async function () {
      this.contract.totalSupply.call().then(res => {
        assert.equal(res.toNumber(), totalSupply);
      });
    })

    it('should get token balance', async function () {
      for (let i = 1; i <= totalSupply; i++) {
        this.contract.balanceOf(accounts[i]).then(res => {
          assert.equal(res.toNumber(), 1);
        });
      }
    })

    // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
    it('should return token uri', async function () {

      for (let i = 1; i <= totalSupply; i++) {
        this.contract.tokenURI(i).then(res => {
          assert.equal(res, 'https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/' + i);
        });
      }
    })

    it('should transfer token from one owner to another', async function () {
      let balance1 = await this.contract.balanceOf(accounts[1]);
      let balance2 = await this.contract.balanceOf(accounts[2]);

      this.contract.transferFrom(accounts[1], accounts[2], 1, { from: accounts[1] }).then(() => {
        this.contract.balanceOf(accounts[1]).then(r1 => {
          assert.equal(r1.toNumber(), balance1.toNumber() - 1);
        });
        this.contract.balanceOf(accounts[2]).then(r2 => {
          assert.equal(r2.toNumber(), balance2.toNumber() + 1);
        });
      });
    })
  });

  describe('have ownership properties', function () {
    beforeEach(async function () {
      this.contract = await ERC721Mintable.new({ from: owner });
    })

    it('should fail when minting when address is not contract owner', async function () {

      let failed = false;
      try {
        await this.contract.mint(accounts[1], 1, { from: accounts[1] });
      } catch (error) {
        failed = true;
      }
      assert.equal(failed, true);
    })

    it('should return contract owner', async function () {
      this.contract.owner().then(res => {
        assert.equal(res, owner);
      });
    })

  });
})