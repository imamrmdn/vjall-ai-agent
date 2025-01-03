import { MixDto } from 'src/models/Mix';
import { CallbackInfo } from '.';
import { list_tokens } from './tokens';
import { list_chain } from './chains';

const startKeyboardMarkup = [
  [
    {
      text: '🔀 AI Agent',
      callback_data: JSON.stringify({
        command: CallbackInfo.MIX,
      }),
    },
    // {
    //   text: '🔎 Token Analyzer',
    //   callback_data: JSON.stringify({
    //     command: CallbackInfo.ANALYZE,
    //   }),
    // },
  ],
  [
    {
      text: '👾 AI Bridge',
      callback_data: JSON.stringify({
        command: CallbackInfo.CMMD,
      }),
    },
    // {
    //   text: '🔎 Token Analyzer',
    //   callback_data: JSON.stringify({
    //     command: CallbackInfo.ANALYZE,
    //   }),
    // },
  ],
  // [
  //   {
  //     text: 'ℹ️ Guideline',
  //     callback_data: JSON.stringify({
  //       command: CallbackInfo.ABOUT,
  //     }),
  //   },
  // ],
  [
    {
      text: '🔆 Socials',
      callback_data: JSON.stringify({
        command: CallbackInfo.SOCIALS,
      }),
    },
  ],
];

const socialsKeyboardMarkup = [
  // [
  //   {
  //     text: 'Website',
  //     url: 'https://hub.docker.com/',
  //   },
  // ],
  [
    {
      text: 'Website',
      url: 'https://www.vjall-agent.com/',
    },
    {
      text: 'Twitter / X',
      url: 'https://x.com/vjallagent',
    },
  ],
  [
    {
      text: '🔙 Back',
      callback_data: JSON.stringify({
        command: CallbackInfo.BACK,
      }),
    },
  ],
];

const mixingFormKeyboardMarkup = ({
  amount,
  fromToken,
  toToken,
  receiver,
}: MixDto) => {
  return [
    [
      {
        text: `From Currency: ${fromToken ?? 'None'}`,
        callback_data: JSON.stringify({
          command: CallbackInfo.FROM_TOKEN,
        }),
      },
    ],
    [
      {
        text: `To Currency: ${toToken ?? 'None'}`,
        callback_data: JSON.stringify({
          command: CallbackInfo.TO_TOKEN,
        }),
      },
    ],
    fromToken && toToken
      ? [
          {
            text: `💲 Amount: ${amount ?? 'None'}`,
            callback_data: JSON.stringify({
              command: CallbackInfo.AMOUNT,
            }),
          },
          ...(amount
            ? [
                {
                  text: `🎫 Receiver: ${receiver ?? 'None'}`,
                  callback_data: JSON.stringify({
                    command: CallbackInfo.RECEIVER,
                  }),
                },
              ]
            : []),
        ]
      : [],
    [
      ...(receiver
        ? [
            {
              text: `🔄 Start Bridging`,
              callback_data: JSON.stringify({
                command: CallbackInfo.ESTIMATE_EXCHANGE,
              }),
            },
          ]
        : []),
      {
        text: `❌ Cancel Bridging`,
        callback_data: JSON.stringify({
          command: CallbackInfo.EXIT,
        }),
      },
    ],
  ];
};

const refreshOrderKeyboardMarkup = (id: string) => {
  return [
    [
      {
        text: `⏳ Refresh Status`,
        callback_data: JSON.stringify({
          command: CallbackInfo.REFRESH_ORDER,
          id,
        }),
      },
    ],
  ];
};

const mixingEstimateKeyboardMarkup = [
  [
    {
      text: `🔀 Create Order`,
      callback_data: JSON.stringify({
        command: CallbackInfo.CREATE_ORDER,
      }),
    },
  ],
  [
    {
      text: `❌ Cancel Bridging`,
      callback_data: JSON.stringify({
        command: CallbackInfo.EXIT,
      }),
    },
  ],
];

const chainsAnalyerKeyboardMarkup = [
  [
    {
      text: 'CHOOSE NETWORK',
      callback_data: JSON.stringify({}),
    },
  ],
  [
    ...list_chain.chain_eth_bsc.map((item) => ({
      text: item.label,
      callback_data: JSON.stringify({
        command: CallbackInfo.CONTRACT_ADDRESS,
        analyzeChainId: item.chainId,
      }),
    })),
  ],
  [
    ...list_chain.chain_arb_base.map((item) => ({
      text: item.label,
      callback_data: JSON.stringify({
        command: CallbackInfo.CONTRACT_ADDRESS,
        analyzeChainId: item.chainId,
      }),
    })),
  ],
  [
    ...list_chain.chain_avax_polygon.map((item) => ({
      text: item.label,
      callback_data: JSON.stringify({
        command: CallbackInfo.CONTRACT_ADDRESS,
        analyzeChainId: item.chainId,
      }),
    })),
  ],
  [
    ...list_chain.chain_ftm_op.map((item) => ({
      text: item.label,
      callback_data: JSON.stringify({
        command: CallbackInfo.CONTRACT_ADDRESS,
        analyzeChainId: item.chainId,
      }),
    })),
  ],
  [
    {
      text: `❌ Cancel Analyze`,
      callback_data: JSON.stringify({
        command: CallbackInfo.EXIT,
      }),
    },
  ],
];

const tokensFromKeyboardMarkup = [
  [
    {
      text: 'ETHEREUM CHAIN',
      callback_data: JSON.stringify({}),
    },
  ],
  [
    ...list_tokens.eth.map((item) => ({
      text: item.name,
      callback_data: JSON.stringify({
        command: CallbackInfo.MIX,
        ticker: item.ticker,
        network: item.network,
        // name: item.name,
      }),
    })),
  ],
  // [
  //   {
  //     text: 'BSC CHAIN',
  //     callback_data: JSON.stringify({}),
  //   },
  // ],
  [
    {
      text: 'Networks',
      callback_data: JSON.stringify({}),
    },
  ],
  [
    ...list_tokens.networks_btc_arb.map((item) => ({
      text: item.name,
      callback_data: JSON.stringify({
        command: CallbackInfo.MIX,
        ticker: item.ticker,
        network: item.network,
        // name: item.name,
      }),
    })),
  ],
  [
    ...list_tokens.networks_op_matic.map((item) => ({
      text: item.name,
      callback_data: JSON.stringify({
        command: CallbackInfo.MIX,
        ticker: item.ticker,
        network: item.network,
        // name: item.name,
      }),
    })),
  ],
  [
    ...list_tokens.networks_bsc_inj.map((item) => ({
      text: item.name,
      callback_data: JSON.stringify({
        command: CallbackInfo.MIX,
        ticker: item.ticker,
        network: item.network,
        // name: item.name,
      }),
    })),
  ],
  [
    ...list_tokens.networks_sol_ada.map((item) => ({
      text: item.name,
      callback_data: JSON.stringify({
        command: CallbackInfo.MIX,
        ticker: item.ticker,
        network: item.network,
        // name: item.name,
      }),
    })),
  ],
  [
    ...list_tokens.networks_xrp_ftm.map((item) => ({
      text: item.name,
      callback_data: JSON.stringify({
        command: CallbackInfo.MIX,
        ticker: item.ticker,
        network: item.network,
        // name: item.name,
      }),
    })),
  ],
  [
    ...list_tokens.networks_tia_sei.map((item) => ({
      text: item.name,
      callback_data: JSON.stringify({
        command: CallbackInfo.MIX,
        ticker: item.ticker,
        network: item.network,
        // name: item.name,
      }),
    })),
  ],
  [
    ...list_tokens.networks_avax_tron.map((item) => ({
      text: item.name,
      callback_data: JSON.stringify({
        command: CallbackInfo.MIX,
        ticker: item.ticker,
        network: item.network,
        // name: item.name,
      }),
    })),
  ],
  [
    {
      text: `❌ Cancel Bridging`,
      callback_data: JSON.stringify({
        command: CallbackInfo.EXIT,
      }),
    },
  ],
];

const tokensToKeyboardMarkup = [
  [
    {
      text: 'ETHEREUM CHAIN',
      callback_data: JSON.stringify({}),
    },
  ],
  [
    ...list_tokens.eth.map((item) => ({
      text: item.name,
      callback_data: JSON.stringify({
        command: CallbackInfo.MIX,
        ticker: item.ticker,
        network: item.network,
        // name: item.name,
      }),
    })),
  ],
  // [
  //   {
  //     text: 'BSC CHAIN',
  //     callback_data: JSON.stringify({}),
  //   },
  // ],
  [
    {
      text: 'Networks',
      callback_data: JSON.stringify({}),
    },
  ],
  [
    ...list_tokens.networks_btc_arb.map((item) => ({
      text: item.name,
      callback_data: JSON.stringify({
        command: CallbackInfo.MIX,
        ticker: item.ticker,
        network: item.network,
        // name: item.name,
      }),
    })),
  ],
  [
    ...list_tokens.networks_op_matic.map((item) => ({
      text: item.name,
      callback_data: JSON.stringify({
        command: CallbackInfo.MIX,
        ticker: item.ticker,
        network: item.network,
        // name: item.name,
      }),
    })),
  ],
  [
    ...list_tokens.networks_bsc_inj.map((item) => ({
      text: item.name,
      callback_data: JSON.stringify({
        command: CallbackInfo.MIX,
        ticker: item.ticker,
        network: item.network,
        // name: item.name,
      }),
    })),
  ],
  [
    ...list_tokens.networks_sol_ada.map((item) => ({
      text: item.name,
      callback_data: JSON.stringify({
        command: CallbackInfo.MIX,
        ticker: item.ticker,
        network: item.network,
        // name: item.name,
      }),
    })),
  ],
  [
    ...list_tokens.networks_xrp_ftm.map((item) => ({
      text: item.name,
      callback_data: JSON.stringify({
        command: CallbackInfo.MIX,
        ticker: item.ticker,
        network: item.network,
        // name: item.name,
      }),
    })),
  ],
  [
    ...list_tokens.networks_tia_sei.map((item) => ({
      text: item.name,
      callback_data: JSON.stringify({
        command: CallbackInfo.MIX,
        ticker: item.ticker,
        network: item.network,
        // name: item.name,
      }),
    })),
  ],
  [
    ...list_tokens.networks_avax_tron.map((item) => ({
      text: item.name,
      callback_data: JSON.stringify({
        command: CallbackInfo.MIX,
        ticker: item.ticker,
        network: item.network,
        // name: item.name,
      }),
    })),
  ],
  [
    ...list_tokens.networks_dym_sui.map((item) => ({
      text: item.name,
      callback_data: JSON.stringify({
        command: CallbackInfo.MIX,
        ticker: item.ticker,
        network: item.network,
        // name: item.name,
      }),
    })),
  ],
  [
    {
      text: `❌ Cancel Bridging`,
      callback_data: JSON.stringify({
        command: CallbackInfo.EXIT,
      }),
    },
  ],
];

export const keyboardMarkup = {
  start: startKeyboardMarkup,
  socials: socialsKeyboardMarkup,
  mixing: mixingFormKeyboardMarkup,
  chains: chainsAnalyerKeyboardMarkup,
  estimateExchange: mixingEstimateKeyboardMarkup,
  tokensFrom: tokensFromKeyboardMarkup,
  tokensTo: tokensToKeyboardMarkup,
  refreshOrder: refreshOrderKeyboardMarkup,
};
