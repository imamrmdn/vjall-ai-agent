import { bot } from 'src/main';

import { CallbackInfo } from 'src/utils';
import { list_currency } from 'src/utils/tokens';

import type { MixReceiverDto } from 'src/models/Mix';

export const receiverMixing = ({
  chatId,
  messageId,
  stages,
  states,
}: MixReceiverDto) => {
  stages[chatId] = CallbackInfo.RECEIVER;
  let tokenName = list_currency.find(
    (item) =>
      item.ticker === states[chatId].toToken &&
      item.network === states[chatId].toCurrency,
  ).name;

  bot.editMessageText(
    `
      Enter your ${tokenName} wallet address
      `,
    {
      chat_id: chatId,
      message_id: messageId,
      parse_mode: 'Markdown',
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [
            {
              text: `❌ Cancel Bridging`,
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

export const amountMixing = ({
  chatId,
  messageId,
  stages,
  states,
}: MixReceiverDto) => {
  stages[chatId] = CallbackInfo.AMOUNT;

  let tokenFromName = list_currency.find(
    (item) =>
      item.ticker === states[chatId].fromToken &&
      item.network === states[chatId].fromCurrency,
  ).name;

  let tokenToName = list_currency.find(
    (item) =>
      item.ticker === states[chatId].toToken &&
      item.network === states[chatId].toCurrency,
  ).name;

  bot.editMessageText(
    `
        Enter the amount of ${tokenFromName} that you have and want to exchange for ${tokenToName}.

Example: If you have 0.1 ETH and want to convert it to USDT, just type 0.1
      `,
    {
      chat_id: chatId,
      message_id: messageId,
      parse_mode: 'Markdown',
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [
            {
              text: `❌ Cancel Bridging`,
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
