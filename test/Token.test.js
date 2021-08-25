const { assert } = require('chai');
const unit = require('ethjs-unit');

const MyToken = artifacts.require('MyToken')

require('chai')
    .use(require('chai-as-promised'))
    .should()

const tokens = (n) => unit.toWei(n, 'ether')

contract('MyToken', ([owner, user]) => {
    let myToken

    before(async () => {
        console.log("testing")
        myToken = await MyToken.new()
    })

    describe('MyToken deployment', () => {
        it('has a name', async () => {
            const name = await myToken.name()
            assert.equal(name, 'MyToken')
        })

        it('has ERC20 standard methods', async () => {
            const name = await myToken.name()
            assert.exists(name)
            assert.typeOf(name, 'string')

            const symbol = await myToken.symbol()
            assert.exists(symbol)
            assert.typeOf(symbol, 'string')

            const decimals = await myToken.decimals()
            assert.exists(decimals)
            assert.typeOf(decimals, 'object') // object because ethjs returns a BN for uint256

            const totalSupply = await myToken.totalSupply()
            assert.exists(totalSupply)
            assert.typeOf(totalSupply, 'object')

            const balanceOf = await myToken.balanceOf(owner)
            assert.exists(balanceOf)
            assert.typeOf(balanceOf, 'object')

            const transfer = await myToken.transfer(owner, tokens('2'))
            assert.exists(transfer)

            const allowance = await myToken.allowance(owner, user)
            assert.exists(allowance)

            const approve = await myToken.approve(user, tokens('1'))
            assert.exists(approve)

            const transferFrom = await myToken.transferFrom(owner, user, tokens('0.1'))
            assert.exists(transferFrom)
        })
    })
})