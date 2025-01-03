import { HttpService } from '@nestjs/axios';

import { bot } from 'src/main';
import { AppService } from 'src/app.service';

import {
  CallbackInfo,
  deadAddress,
  shortenAddress,
  zeroAddress,
} from 'src/utils';
import { ChainInfo, list_network } from 'src/utils/chains';
import { AnalyzeContractAddressDto } from 'src/models/Analyze';
import { MessageStartAnalyze } from 'src/models/Message';

export const contractAddressAnalyzing = ({
  chatId,
  messageId,
  stages,
  states,
  data,
}: AnalyzeContractAddressDto) => {
  stages[chatId] = CallbackInfo.CONTRACT_ADDRESS;

  let network = list_network.find(
    (item) => item.chainId === data?.analyzeChainId,
  )?.label;

  if (network && stages[chatId] && states[chatId]) {
    states[chatId].analyzeChainId = data?.analyzeChainId;
  }

  bot.editMessageText(
    `
          Enter the Contract Address of ${network} that you have and want to analyze.
        `,
    {
      chat_id: chatId,
      message_id: messageId,
      parse_mode: 'Markdown',
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [
            {
              text: `❌ Cancel Analyze`,
              callback_data: JSON.stringify({
                command: CallbackInfo.EXIT,
              }),
            },
          ],
        ],
      }),
    },
  );
};

// const urls = {
//   dexScreener: 'https://dexscreener.com',
//   dexView: 'https://www.dexview.com',
//   dexTools: 'https://www.dextools.io/app/en',
// };

export const receiverMessageAnalyzing = async ({
  chatId,
  messageId,
  messageText,
  states,
  stages,
}: MessageStartAnalyze) => {
  const httpService = new HttpService();
  const appService = new AppService(httpService);

  if (chatId && Boolean(messageId) && Boolean(messageId - 1)) {
    bot.deleteMessage(chatId, messageId - 1);
    bot.deleteMessage(chatId, messageId);
  }

  await bot.sendMessage(chatId, '🤔 Analyzing...');

  const request = await appService.getResultAnalyzing({
    chainId: states[chatId].analyzeChainId,
    contractAddress: messageText,
  });
  const response = await request;

  if (response?.code) {
    const result = response?.result || {};
    const isEmptyResponse = Object.keys(result).length === 0;

    const info =
      ChainInfo[states[chatId].analyzeChainId as keyof typeof ChainInfo];

    if (isEmptyResponse) {
      await bot.sendMessage(
        chatId,
        `
      <b>ERROR</b>
<b>Did you choose the right network? You scanned this contract on ${info.code}</b>
        `,
        {
          parse_mode: 'HTML',
          // chat_id: chatId,
          message_id: messageId,
        },
      );

      if (stages[chatId]) {
        stages[chatId] = CallbackInfo.EXIT;
      }
    } else {
      const {
        token_name,
        token_symbol,
        owner_address,
        is_open_source,
        is_anti_whale,
        is_blacklisted,
        is_proxy,
        is_whitelisted,
        is_mintable,
        is_honeypot,
        // cannot_sell_all,
        trading_cooldown,
        hidden_owner,
        owner_change_balance,
        honeypot_with_same_creator,
        slippage_modifiable,
        transfer_pausable,
        // can_take_back_ownership,
        buy_tax,
        sell_tax,
        total_supply,
        holder_count,
      } = Object.values(result)[0] as any;

      const isRenounced =
        owner_address &&
        (owner_address === zeroAddress || owner_address === deadAddress);
      const isOpenSource = !!Number(is_open_source);
      const isAntiWhale = !!Number(is_anti_whale);
      const isSlippageModifiable = !!Number(slippage_modifiable);
      const isHiddenOwner = !!Number(hidden_owner);
      const isTradingCooldown = !!Number(trading_cooldown);
      const isBlacklist = !!Number(is_blacklisted);
      const isWhitelist = !!Number(is_whitelisted);
      const isProxy = !!Number(is_proxy);
      const isMintable = !!Number(is_mintable);
      const isTransferPausable = !!Number(transfer_pausable);
      // const isCantSellAll = !!Number(cannot_sell_all);
      const isOwnerChangeBalance = !!Number(owner_change_balance);
      // const isTakeBackOwnership = !!Number(can_take_back_ownership);
      const isSameOwnerHoneypot = !!Number(honeypot_with_same_creator);

      // const dexScreenerLink = `${urls.dexScreener}/${info.dexs}/${messageText}`;
      // const dexViewLink = `${urls.dexView}/${info.dexv}/${messageText}`;
      // const dexToolsLink = `${urls.dexTools}/${info.dext}/pair-explorer/${dex[0]?.pair}`;

      await bot.sendMessage(
        chatId,
        `
<b>🪙 ${token_name?.toUpperCase() ?? '-'} ($${
          token_symbol?.toUpperCase() ?? '-'
        })</b>
<b>🧾 CA: <code>${messageText}</code></b>
  
<b>🔗 Network:  ${ChainInfo[states[chatId].analyzeChainId].code}</b>
<b>📝 Verified:  ${isOpenSource ? '✅' : '❌'}</b>
<b>👨‍💻 Owner: ${isRenounced ? 'RENOUNCED' : shortenAddress(owner_address, 3)}</b>
<b>🍯 Honeypot TEST: ${Number(is_honeypot) === 0 ? '✅' : '❌'}</b>
<b>👥 Holders: ${holder_count ?? '-'}</b>
<b>💰 Total Supply: ${
          total_supply ? Number(total_supply).toLocaleString('en-US') : '-'
        }</b>
<b>⚖️ Tax: ${!!buy_tax ? (Number(buy_tax) * 100).toFixed(1) : '-'}% Buy | ${
          !!sell_tax ? (Number(sell_tax) * 100).toFixed(1) : '-'
        }% Sell</b>
  
<b>⚙️ Overview :</b>
  
<b>${isAntiWhale ? '🟢' : '🔴'} Anti Whale</b>
<b>${!isSlippageModifiable ? '🟢' : '🔴'} Set Fee</b>
<b>${!isOwnerChangeBalance ? '🟢' : '🔴'} Set Balance</b>
<b>${!isHiddenOwner ? '🟢' : '🔴'} Hidden Owner</b>
<b>${!isTradingCooldown ? '🟢' : '🔴'} Trading Cooldown</b>
<b>${!isBlacklist ? '🟢' : '🔴'} Blacklist</b>
<b>${!isWhitelist ? '🟢' : '🔴'} Whitelist</b>
<b>${!isProxy ? '🟢' : '🔴'} Proxy Contract</b>
<b>${!isMintable ? '🟢' : '🔴'} Mintable</b>
<b>${!isTransferPausable ? '🟢' : '🔴'} Transfer Pausable</b>
<b>${!isSameOwnerHoneypot ? '🟢' : '🔴'} Same Honeypot Owner</b>
        `,
        {
          parse_mode: 'HTML',
          // chat_id: chatId,
          message_id: messageId,
        },
      );

      if (stages[chatId]) {
        stages[chatId] = CallbackInfo.EXIT;
      }
    }
  } else {
    await bot.sendMessage(
      chatId,
      `
<b>😥 ${response?.message ?? ''} - Operation Cancelled </b>
      `,
      {
        parse_mode: 'HTML',
        // chat_id: chatId,
        message_id: messageId,
      },
    );

    if (stages[chatId]) {
      stages[chatId] = CallbackInfo.EXIT;
    }
  }
};
