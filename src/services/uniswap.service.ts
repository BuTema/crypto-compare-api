import { ExchangeInterface } from '../models/exchange.model';
import tokens from '../models/tokens.model';
import { Contract, providers, utils } from 'ethers';

class UniswapService implements ExchangeInterface {
  name: string;
  quoterContract: any;
  provider: providers.JsonRpcProvider;

  constructor() {
    this.name = 'Uniswap';
    this.provider = new providers.JsonRpcProvider('https://arb1.arbitrum.io/rpc');
    this.quoterContract = new Contract(
      '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6',
      [
        {
          inputs: [
            {
              internalType: 'address',
              name: 'tokenIn',
              type: 'address',
            },
            {
              internalType: 'address',
              name: 'tokenOut',
              type: 'address',
            },
            {
              internalType: 'uint24',
              name: 'fee',
              type: 'uint24',
            },
            {
              internalType: 'uint256',
              name: 'amountIn',
              type: 'uint256',
            },
            {
              internalType: 'uint160',
              name: 'sqrtPriceLimitX96',
              type: 'uint160',
            },
          ],
          name: 'quoteExactInputSingle',
          outputs: [
            {
              internalType: 'uint256',
              name: 'amountOut',
              type: 'uint256',
            },
          ],
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ],
      this.provider,
    );
  }

  async GetAmountOut(tokenAddress0: string, tokenAddress1: string, amountInToken0: string) {
    if (tokenAddress0 === tokenAddress1 || amountInToken0 === '0') {
      return amountInToken0;
    }

    const amountOutToken1 = await this.quoterContract.callStatic.quoteExactInputSingle(
      tokenAddress0,
      tokenAddress1,
      '500',
      amountInToken0,
      0,
    );
    return amountOutToken1;
  }

  async getRate(base: string, quote: string): Promise<number> {
    try {
      const token1 = tokens.find(token => token.symbol === base);
      const token2 = tokens.find(token => token.symbol === quote);

      if (!token1 || !token2) {
        throw new Error('Token not found');
      }

      const amountOutToken1 = await this.GetAmountOut(
        token1.address,
        token2.address,
        utils.parseUnits('1', token1.decimals).toString(),
      );

      const amountOutFixed = parseFloat(utils.formatUnits(amountOutToken1, token2.decimals));
      console.log('🚀 ~ Token output UniswapService :', amountOutFixed);
      return amountOutFixed;
    } catch (error) {
      console.error('Error fetching rate:', error);
      throw error;
    }
  }
}
export default UniswapService;
