import { bot } from 'src/main';

import { CallbackInfo } from 'src/utils';
import { keyboardMarkup } from 'src/utils/keyboardMarkup';

import type { MixFromAndToDto } from 'src/models/Mix';

export const fromMixing = ({ chatId, messageId, stages }: MixFromAndToDto) => {
  stages[chatId] = CallbackInfo.FROM_TOKEN;
  // mixStates[chatId].receiver = '';
  // mixStates[chatId].amount = '';
  bot.editMessageText(
    `
      🔼 *Choose the currency you want to deposit.*
    `,
    {
      chat_id: chatId,
      message_id: messageId,
      parse_mode: 'Markdown',
      reply_markup: JSON.stringify({
        inline_keyboard: keyboardMarkup.tokensFrom,
      }),
    },
  );
};

export const toMixing = ({ chatId, messageId, stages }: MixFromAndToDto) => {
  stages[chatId] = CallbackInfo.TO_TOKEN;
  // mixStates[chatId].receiver = '';
  // mixStates[chatId].amount = '';
  bot.editMessageText(
    `
        🔽 *Choose the currency you want to receive.*
      `,
    {
      chat_id: chatId,
      message_id: messageId,
      parse_mode: 'Markdown',
      reply_markup: JSON.stringify({
        inline_keyboard: keyboardMarkup.tokensTo,
      }),
    },
  );
};
