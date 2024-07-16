import { assert } from 'chai';
import { ethers } from 'ethers';
import { Contract, Provider } from '../src';

const rpcUrl = 'https://base-sepolia-rpc.publicnode.com';
const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
const ethcallProvider = new Provider(provider, 84532);

describe('base sepolia network', () => {
    const addresses = [
        '0x4200000000000000000000000000000000000006',
        '0xD4fA4dE9D8F8DB39EAf4de9A19bF6910F6B5bD60'
    ];

    it('should returns symbol and decimals', async () => {
        const abi = [
            'function symbol() public view returns (string)',
            'function decimals() public view returns (uint8)',
        ];
        const wethContract = new Contract(addresses[0], abi);
        const usdgContract = new Contract(addresses[1], abi);

        const calls = [wethContract.symbol(), usdgContract.symbol(), wethContract.decimals(), usdgContract.decimals()];
        const [
            wethSymbol,
            usdgSymbol,
            wethDecimals,
            usdgDecimals
        ] = await ethcallProvider.all(calls);

        assert.equal(wethSymbol, 'WETH');
        assert.equal(usdgSymbol, 'USDG');
        assert.equal(wethDecimals.toString(), '18');
        assert.equal(usdgDecimals.toString(), '18');
    });
});
