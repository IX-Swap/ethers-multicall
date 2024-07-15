import { ethers } from 'ethers';
import { assert } from 'chai';
import { Contract, Provider } from '../src';

const rpcUrl = 'https://base-pokt.nodies.app'
const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
const ethcallProvider = new Provider(provider, 8453);

describe('base network', () => {
    it('should retrieve totalSupply both of the tokens successfully', async () => {
        const abi = ['function totalSupply() public view returns (uint256)'];
        const addresses = [
            '0xfA980cEd6895AC314E7dE34Ef1bFAE90a5AdD21b',
            '0x1C7a460413dD4e964f96D8dFC56E7223cE88CD85'
        ];

        const primeContract = new Contract(addresses[0], abi);
        const seamContract = new Contract(addresses[1], abi);

        const calls = [primeContract.totalSupply(), seamContract.totalSupply()];
        const [primeSupply, seamSupply] = await ethcallProvider.all(calls);

        assert.equal(primeSupply.toString(), '655283967592417997806328');
        assert.equal(seamSupply.toString(), '100000000000000000000000000');
    })
})