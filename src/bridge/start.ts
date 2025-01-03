import { bot } from 'src/main';

import { CallbackInfo, textInfo } from 'src/utils';
import { list_currency } from 'src/utils/tokens';
import { keyboardMarkup } from 'src/utils/keyboardMarkup';

import type { MixStartDto } from 'src/models/Mix';

export const startMixing = ({
  states,
  chatId,
  messageId,
  stages,
  data,
}: MixStartDto) => {
  if (!states[chatId]) {
    states[chatId] = {
      amount: '',
      fromToken: '',
      fromCurrency: '',
      receiver: '',
      toToken: '',
      toCurrency: '',
      rateId: '',
    };
  }

  if (stages[chatId] && states[chatId]) {
    if (stages[chatId] === CallbackInfo.FROM_TOKEN) {
      states[chatId].fromToken = data?.ticker;
      states[chatId].fromCurrency = data?.network;
    }

    if (stages[chatId] === CallbackInfo.TO_TOKEN) {
      states[chatId].toToken = data?.ticker;
      states[chatId].toCurrency = data?.network;
    }
  }

  if (stages[chatId] && messageId) {
    bot.deleteMessage(chatId, messageId);
  }

  bot.sendMessage(chatId, textInfo.mixing, {
    parse_mode: 'Markdown',
    reply_markup: JSON.stringify({
      inline_keyboard: keyboardMarkup.mixing({
        fromToken:
          states[chatId] && states[chatId].fromToken
            ? list_currency.find(
                (item) =>
                  item.ticker === states[chatId].fromToken &&
                  item.network === states[chatId].fromCurrency,
              ).name
            : '',
        toToken:
          states[chatId] && states[chatId].toToken
            ? list_currency.find(
                (item) =>
                  item.ticker === states[chatId].toToken &&
                  item.network === states[chatId].toCurrency,
              ).name
            : '',
        amount: states[chatId] ? states[chatId].amount : '',
        receiver: states[chatId] ? states[chatId].receiver : '',
        rateId: '',
      }),
    }),
  });
};
