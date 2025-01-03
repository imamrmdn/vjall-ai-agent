import { bot } from 'src/main';

import { CallbackInfo } from 'src/utils';
import { isAddress } from 'ethers/lib/utils';

import { claimFaucet, startFaucet } from './start';
// import {
//   contractAddressAnalyzing,
//   receiverMessageAnalyzing,
// } from './contract_address';
import { AnalyzeStartDto } from 'src/models/Analyze';

const faucetCommand = ({ stages, states }: AnalyzeStartDto) => {
  bot.on('message', async (msg) => {
    const chatId: number = msg.chat.id;
    const messageId = msg.message_id;
    const messageText = msg.text;

    // console.log(stages[chatId], 'stages[chatId]');

    if (stages[chatId] === CallbackInfo.CLAIM_FAUCET && messageText) {
      if (isAddress(messageText)) {
        // console.log(messageText, 'walletAddress');
        claimFaucet({
          chatId,
          messageId,
          messageText,
          stages,
          states,
        });
      } else {
        if (stages[chatId] && messageId && Boolean(messageId - 1)) {
          await bot.deleteMessage(chatId, messageId - 1);
        }

        bot.sendMessage(chatId, '❌ Invalid Address', {
          reply_to_message_id: messageId,
        });
      }
    }
  });

  bot.on('callback_query', async (callbackQuery) => {
    const query = callbackQuery;
    const message = query.message;

    const chatId: number = message.chat.id;
    const data = JSON.parse(callbackQuery.data);

    // console.log(data.command, 'data.command');

    switch (data.command) {
      case CallbackInfo.CLAIM_FAUCET:
        startFaucet({
          chatId,
          messageId: message.message_id,
          stages,
          states,
        });
        break;
      default:
        return;
    }
  });
};

export default faucetCommand;
