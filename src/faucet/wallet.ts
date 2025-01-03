import { ethers } from 'ethers';

import { RPC_URL, PRIVATE_KEY } from './constants';

/*
 * connects to a wallet to provide funds
 */
const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY as string, provider);
export default wallet;
