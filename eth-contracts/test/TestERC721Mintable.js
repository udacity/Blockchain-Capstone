var ERC721MintableComplete = artifacts.require('ERC721MintableComplete');

contract('TestERC721Mintable', accounts => {

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: accounts[0]});

            // mint mulitple tokens
        })

        it('should return contract owner', async function () { 
            
        })

        it('should return total supply', async function () { 
            
        })

        it('should get token balance', async function () { 
            
        })

        // token uri should be complete i.e: 'https://api.cryptokitties.co/kitties/1'
        it('should return token uri', async function () { 
           
        })
    });
})