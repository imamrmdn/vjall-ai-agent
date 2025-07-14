export enum ChatStage {
  START = 1,
  SOCIALS = 2,
  MIX = 3,
  WELCOME_VIDEO = 4,
  EXIT = 5,
}

export enum CallbackInfo {
  MIX = 1,
  ABOUT = 2,
  SOCIALS = 3,
  FROM_TOKEN = 4,
  TO_TOKEN = 5,
  AMOUNT = 6,
  RECEIVER = 7,
  ESTIMATE_EXCHANGE = 8,
  CREATE_ORDER = 9,
  REFRESH_ORDER = 10,
  BACK = 11,
  EXIT = 12,
  ANALYZE = 13,
  CONTRACT_ADDRESS = 14,
  CLAIM_FAUCET = 15,
  STAKING = 16,
  CMMD = 17,
  ATM = 18,
  DII = 19
}

export const zeroAddress = '0x0000000000000000000000000000000000000000';
export const deadAddress = '0x000000000000000000000000000000000000dead';

export function shortenAddress(address: string, chars = 4): string {
  // const parsed = isAddress(address);
  // if (!parsed) {
  //   throw Error(`Invalid 'address' parameter '${address}'.`);
  // }
  return `${address.substring(0, chars + 2)}...${address.substring(
    42 - chars,
  )}`;
}

export const adminId = 6019985262;

const welcome = `
*Zeal AI: Igniting Intelligence in Every Blockchain Interaction*

Groundbreaking Layer 2 enhancement infused with the power of Artificial Intelligence
`;

const mixing = `*Fill all the details below to start bridging*`;
const analyze = `*Choose from which network you want to analyze the token*`;

// const about = `
// *Zeal AI powered crypto bridging tools*

// Using Telegram to bridge and transfer cryptocurrency while maintaining privacy, security and anonymity.

// Zeal AI offers solution that enable transactional privacy and security by breaking on-chain link between sender and recipient address.

// *To use the Zeal AI bridge:*
// 1. First choose the cryptocurrency you want to deposit (from currency)
// 2. Select the cryptocurrency to withdraw (to currency)
// 3. Enter the amount of the transaction.
// 4. Enter the recipient wallet's (receiver wallet) address.
// Our system completes transactions in less than 30 minutes.
// `;
const about = `

*To use the Tele Swap:*
1. First choose the cryptocurrency you want to deposit (from currency) 
2. Select the cryptocurrency to withdraw (to currency) 
3. Enter the amount of the transaction. 
4. Enter the recipient wallet's (receiver wallet) address.
Our system completes transactions in less than 30 minutes.
`;

const instructions = `
💫 Start typing and let NexaFlow AI Code Assistant help you analyze your code.
`;

const fiturlock1 = `
Automation Solutions is currently in development and will be available soon.
`
const fiturlock2 = `
AI Decentralized Infrastructure is under development and will be launching soon.
`


export const textInfo = {
  welcome,
  mixing,
  analyze,
  about,
  instructions,
  fiturlock1,
  fiturlock2
};

export const isAdmin = (userId: number) => {
  return adminId === userId;
};
