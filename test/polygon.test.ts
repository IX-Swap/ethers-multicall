import { ethers } from 'ethers';
import { assert } from 'chai';
import { Contract, Provider } from '../src';

const rpcUrl = 'https://polygon-pokt.nodies.app'
const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
const ethcallProvider = new Provider(provider, 137);

describe('polygon network', () => {
    it('should retrieve totalSupply both of the tokens successfully', async () => {
        const abi = ['function totalSupply() public view returns (uint256)'];
        const addresses = [
            '0x0000000000000000000000000000000000001010',
            '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619'
        ];

        const maticContract = new Contract(addresses[0], abi);
        const wethContract = new Contract(addresses[1], abi);

        const calls = [maticContract.totalSupply(), wethContract.totalSupply()];
        const [maticSupply, wethSupply] = await ethcallProvider.all(calls);

        assert.equal(maticSupply.toString(), '10000000000000000000000000000');
        assert.equal(wethSupply.toString(), '151625134652898175725399');
    })
})