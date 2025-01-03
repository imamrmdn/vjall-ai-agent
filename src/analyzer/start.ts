import { bot } from 'src/main';

import { CallbackInfo, textInfo } from 'src/utils';
import { list_currency } from 'src/utils/tokens';
import { keyboardMarkup } from 'src/utils/keyboardMarkup';

import { AnalyzeStartDto } from 'src/models/Analyze';

export const startAnalyzing = ({
  states,
  chatId,
  messageId,
  stages,
}: // data,
AnalyzeStartDto) => {
  if (!states[chatId]) {
    states[chatId] = {
      analyzeChainId: '',
      analyzeContractAddress: '',
    };
  }

  //   if (stages[chatId] && states[chatId]) {
  //     if (stages[chatId] === CallbackInfo.FROM_TOKEN) {
  //       states[chatId].fromToken = data?.ticker;
  //       states[chatId].fromCurrency = data?.network;
  //     }

  //     if (stages[chatId] === CallbackInfo.TO_TOKEN) {
  //       states[chatId].toToken = data?.ticker;
  //       states[chatId].toCurrency = data?.network;
  //     }
  //   }

  if (stages[chatId] && messageId) {
    bot.deleteMessage(chatId, messageId);
  }

  bot.sendMessage(chatId, textInfo.analyze, {
    parse_mode: 'Markdown',
    reply_markup: JSON.stringify({
      inline_keyboard: keyboardMarkup.chains,
    }),
  });
};
