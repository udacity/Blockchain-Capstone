var ERC721MintableComplete = artifacts.require('ERC721MintableComplete');

contract('TestERC721Mintable', accounts => {

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: accounts[0]});

            for(var i = 0; i < 11; i++) {
                await this.contract.mintWithTokenURI(accounts[i], i, i.toString());
            }
        })

        it('should return contract owner', async function () { 
            let owner = await this.contract.owner(); 
            assert.equal(owner, accounts[0]);
        })

        it('should return total supply', async function () { 
            let totalSupply = await this.contract.totalSupply().toNumber(); 
            assert.equal(totalSupply, 10);
        })

        it('should get token balance', async function () { 
            let tokenBalance = await this.contract.balanceOf(accounts[0]).toNumber(); 
            assert.equal(tokenBalance, 1);
        })

        // token uri should be complete i.e: 
        it('should return token uri', async function () { 
            let uri = await this.contract.tokenURI(1); 
            assert.equal(uri, 'https://api.cryptokitties.co/kitties/1');
        })
    });
})