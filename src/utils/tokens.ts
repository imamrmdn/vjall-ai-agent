const eth = [
  {
    ticker: 'eth',
    name: 'ETH (ERC20)',
    image: 'https://content-api.changenow.io/uploads/eth_f4ebb54ec0.svg',
    network: 'eth',
    tokenContract: null,
    legacyTicker: 'eth',
  },
  {
    ticker: 'usdt',
    name: 'USDT (ERC20)',
    image: 'https://content-api.changenow.io/uploads/usdterc20_5ae21618aa.svg',
    network: 'eth',
    tokenContract: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    legacyTicker: 'usdterc20',
  },
  // {
  //   ticker: 'usdc',
  //   name: 'USDC (ERC20)',
  //   image: 'https://content-api.changenow.io/uploads/usdcerc20_acd5759c8c.svg',
  //   network: 'eth',
  //   tokenContract: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  //   legacyTicker: 'usdc',
  // },
];

// const bsc = [
//   {
//     ticker: 'bnb',
//     name: 'BNB (BEP20)',
//     image: 'https://content-api.changenow.io/uploads/bnbbsc_331e969a6b.svg',
//     network: 'bsc',
//     tokenContract: null,
//     legacyTicker: 'bnbbsc',
//   },
//   {
//     ticker: 'usdt',
//     name: 'USDT (BEP20)',
//     image: 'https://content-api.changenow.io/uploads/usdtbsc_b8f3d8f316.svg',
//     network: 'bsc',
//     tokenContract: '0x55d398326f99059fF775485246999027B3197955',
//     legacyTicker: 'usdtbsc',
//   },
//   {
//     ticker: 'usdc',
//     name: 'USDC (BEP20)',
//     image: 'https://content-api.changenow.io/uploads/usdcbsc_397b9c0f7d.svg',
//     network: 'bsc',
//     tokenContract: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
//     legacyTicker: 'usdcbsc',
//   },
// ];

const networks_btc_arb = [
  {
    ticker: 'btc',
    name: 'Bitcoin (BTC)',
    image: 'https://content-api.changenow.io/uploads/btc_1_527dc9ec3c.svg',
    network: 'btc',
    tokenContract: null,
    legacyTicker: 'btc',
  },
  {
    ticker: 'arb',
    name: 'Arbitrum (ARB20)',
    image: 'https://content-api.changenow.io/uploads/arb_b711c7cb0b.svg',
    network: 'arbitrum',
    tokenContract: null,
    legacyTicker: 'arb',
  },
];

const networks_sol_ada = [
  {
    ticker: 'sol',
    name: 'Solana (SOL)',
    image: 'https://content-api.changenow.io/uploads/sol_3b3f795997.svg',
    network: 'sol',
    tokenContract: null,
    legacyTicker: 'sol',
  },
  {
    ticker: 'ada',
    name: 'Cardano (ADA)',
    image: 'https://content-api.changenow.io/uploads/ada_fb42809541.svg',
    network: 'ada',
    tokenContract: null,
    legacyTicker: 'ada',
  },
];

const networks_bsc_inj = [
  {
    ticker: 'bnb',
    name: 'BNB (BEP20)',
    image: 'https://content-api.changenow.io/uploads/bnbbsc_331e969a6b.svg',
    network: 'bsc',
    tokenContract: null,
    legacyTicker: 'bnbbsc',
  },
  {
    ticker: 'inj',
    name: 'Injective (INJ)',
    image: 'https://content-api.changenow.io/uploads/injmainnet_c155cd4e32.svg',
    network: 'inj',
    tokenContract: null,
    legacyTicker: 'injmainnet',
  },
];

const networks_op_matic = [
  {
    ticker: 'op',
    name: 'Optimism (OP)',
    image: 'https://content-api.changenow.io/uploads/op_e3944c4cf9.svg',
    network: 'op',
    tokenContract: '0x4200000000000000000000000000000000000042',
    legacyTicker: 'op',
  },
  {
    ticker: 'matic',
    name: 'Polygon (MATIC)',
    image:
      'https://content-api.changenow.io/uploads/matic_token_f9906e3f5d.svg',
    network: 'matic',
    tokenContract: null,
    legacyTicker: 'maticmainnet',
  },
];

const networks_xrp_ftm = [
  {
    ticker: 'xrp',
    name: 'Ripple (XRP)',
    image: 'https://content-api.changenow.io/uploads/xrp_3b5212fd4a.svg',
    network: 'xrp',
    tokenContract: null,
    legacyTicker: 'xrp',
  },
  {
    ticker: 'ftm',
    name: 'Fantom (FTM)',
    image: 'https://content-api.changenow.io/uploads/ftm_801088098f.svg',
    network: 'ftm',
    tokenContract: null,
    legacyTicker: 'ftmmainnet',
  },
];

const networks_tia_sei = [
  {
    ticker: 'tia',
    name: 'Celestia (TIA)',
    image: 'https://content-api.changenow.io/uploads/tia_4ed44a458a.svg',
    network: 'tia',
    tokenContract: null,
    legacyTicker: 'tia',
  },
  // {
  //   ticker: 'sui (SUI)',
  //   name: 'Sui',
  //   image: 'https://content-api.changenow.io/uploads/sui_6d4e2efb11.svg',
  //   network: 'sui',
  //   tokenContract: null,
  //   legacyTicker: 'suimainnet',
  // },
  {
    ticker: 'sei',
    name: 'Sei (SEI)',
    image: 'https://content-api.changenow.io/uploads/sei_fda6fbd2c1.svg',
    network: 'sei',
    tokenContract: null,
    legacyTicker: 'sei',
  },
];

const networks_avax_tron = [
  {
    ticker: 'avax',
    name: 'Avalanche (AVAX)',
    image: 'https://content-api.changenow.io/uploads/avaxs_4e906c3ad4.svg',
    network: 'cchain',
    tokenContract: null,
    legacyTicker: 'avaxc',
  },
  {
    ticker: 'trx',
    name: 'TRON (TRC20)',
    image: 'https://content-api.changenow.io/uploads/trx_f14430166e.svg',
    network: 'trx',
    tokenContract: null,
    legacyTicker: 'trx',
  },
];

const networks_dym_sui = [
  {
    ticker: 'dym',
    name: 'Dymension (DYM)',
    image: 'https://content-api.changenow.io/uploads/dym_7321eabaa0.svg',
    network: 'dym',
    tokenContract: null,
    legacyTicker: 'dymmainnet',
  },
  {
    ticker: 'sui',
    name: 'Sui (SUI)',
    image: 'https://content-api.changenow.io/uploads/sui_6d4e2efb11.svg',
    network: 'sui',
    tokenContract: null,
    legacyTicker: 'suimainnet',
  },
];

export const list_currency = [
  ...eth,
  ...networks_btc_arb,
  ...networks_op_matic,
  ...networks_bsc_inj,
  ...networks_sol_ada,
  ...networks_xrp_ftm,
  ...networks_avax_tron,
  ...networks_dym_sui,
  ...networks_tia_sei,
];

export const list_tokens = {
  eth,
  networks_btc_arb,
  networks_op_matic,
  networks_bsc_inj,
  networks_sol_ada,
  networks_xrp_ftm,
  networks_tia_sei,
  networks_avax_tron,
  networks_dym_sui,
};
