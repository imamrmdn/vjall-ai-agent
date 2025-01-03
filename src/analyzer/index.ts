import { bot } from 'src/main';

import { CallbackInfo } from 'src/utils';

import { startAnalyzing } from './start';
import {
  contractAddressAnalyzing,
  receiverMessageAnalyzing,
} from './contract_address';
import { AnalyzeStartDto } from 'src/models/Analyze';

const analyzeCommand = ({ stages, states }: AnalyzeStartDto) => {
  bot.on('message', async (msg) => {
    const chatId: number = msg.chat.id;
    const messageId = msg.message_id;
    const messageText = msg.text;

    // console.log(stages[chatId], 'stages[chatId]');

    if (
      stages[chatId] === CallbackInfo.CONTRACT_ADDRESS &&
      states[chatId]?.analyzeChainId
    ) {
      receiverMessageAnalyzing({
        chatId,
        messageId,
        messageText,
        states,
        stages,
      });
    }
  });

  bot.on('callback_query', async (callbackQuery) => {
    const query = callbackQuery;
    const message = query.message;

    const chatId: number = message.chat.id;
    const data = JSON.parse(callbackQuery.data);

    switch (data.command) {
      case CallbackInfo.ANALYZE:
        startAnalyzing({
          chatId,
          messageId: message.message_id,
          stages,
          states,
        });
        break;

      case CallbackInfo.CONTRACT_ADDRESS:
        contractAddressAnalyzing({
          chatId,
          messageId: message.message_id,
          stages,
          states,
          data,
        });
        break;
      default:
        return;
    }
  });
};

export default analyzeCommand;
