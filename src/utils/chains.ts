export enum SupportedChainId {
  None = '',
  ETH = '1',
  BSC = '56',
  OPTIMISM = '10',
  CRONOS = '25',
  OKC = '66',
  GNOSIS = '100',
  HECO = '128',
  POLYGON = '137',
  FANTOM = '250',
  KCC = '321',
  ZKSYNC = '324',
  AVALANCHE = '43114',
  LINEA = '59144',
  TRON = 'tron',
  OPBNB = '204',
  ARBITRUM = '42161',
  BASE = '8453',
}

export const chain_eth_bsc = [
  {
    chainId: SupportedChainId.ETH,
    label: 'Ethereum',
    code: 'ETH',
  },
  {
    chainId: SupportedChainId.BSC,
    label: 'Binance Smart Chain',
    code: 'BSC',
  },
];

export const chain_arb_base = [
  {
    chainId: SupportedChainId.ARBITRUM,
    label: 'Arbitrum',
    code: 'ARB',
  },
  {
    chainId: SupportedChainId.BASE,
    label: 'Base',
    code: 'BASE',
  },
];

export const chain_avax_polygon = [
  {
    chainId: SupportedChainId.AVALANCHE,
    label: 'Avalanche',
    code: 'AVAX',
  },
  {
    chainId: SupportedChainId.POLYGON,
    label: 'Polygon',
    code: 'MATIC',
  },
];

export const chain_ftm_op = [
  {
    chainId: SupportedChainId.FANTOM,
    label: 'Fantom',
    code: 'FTM',
  },
  {
    chainId: SupportedChainId.OPTIMISM,
    label: 'Optimism',
    code: 'OPTIMISM',
  },
];

export const list_chain = {
  chain_eth_bsc,
  chain_arb_base,
  chain_avax_polygon,
  chain_ftm_op,
};

export const list_network = [
  ...chain_eth_bsc,
  ...chain_arb_base,
  ...chain_avax_polygon,
  ...chain_ftm_op,
];

export const ChainInfo = {
  [SupportedChainId.ETH]: {
    label: 'Ethereum',
    code: 'ETH',
    explorer: 'https://etherscan.io',
    dexs: 'ethereum',
    dexv: 'eth',
    dext: 'ether',
    dexapi: 'ether',
  },
  [SupportedChainId.ARBITRUM]: {
    label: 'Arbitrum',
    code: 'ARB',
    explorer: 'https://arbiscan.io',
    dexs: 'arbitrum',
    dexv: 'arbitrum',
    dext: 'arbitrum',
    dexapi: 'arbitrum',
  },
  [SupportedChainId.BASE]: {
    label: 'Base',
    code: 'BASE',
    explorer: 'https://basescan.org',
    dexs: 'base',
    dexv: '',
    dext: 'base',
    dexapi: 'base',
  },
  [SupportedChainId.BSC]: {
    label: 'Binance Smart Chain',
    code: 'BSC',
    explorer: 'https://bscscan.io',
    dexs: 'bsc',
    dexv: 'bsc',
    dext: 'bnb',
    dexapi: 'bsc',
  },
  [SupportedChainId.AVALANCHE]: {
    label: 'Avalanche',
    code: 'AVAX',
    explorer: 'https://avascan.info',
    dexs: 'avalanche',
    dexv: '',
    dext: 'avalanche',
    dexapi: 'avalanche',
  },
  [SupportedChainId.POLYGON]: {
    label: 'Polygon',
    code: 'MATIC',
    explorer: 'https://polygonscan.com',
    dexs: 'polygon',
    dexv: '',
    dext: 'polygon',
    dexapi: 'polygon',
  },
  [SupportedChainId.FANTOM]: {
    label: 'Fantom',
    code: 'FTM',
    explorer: 'https://ftmscan.com',
    dexs: 'fantom',
    dexv: '',
    dext: 'fantom',
    dexapi: 'fantom',
  },
  [SupportedChainId.OPTIMISM]: {
    label: 'Optimism',
    code: 'OPTIMISM',
    explorer: 'https://optimistic.etherscan.io',
    dexs: 'optimism',
    dexv: '',
    dext: 'optimism',
    dexapi: 'optimism',
  },
};
