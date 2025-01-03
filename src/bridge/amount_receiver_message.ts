import { HttpService } from '@nestjs/axios';

import { bot } from 'src/main';
import { AppService } from 'src/app.service';

import { CallbackInfo, textInfo } from 'src/utils';
import { keyboardMarkup } from 'src/utils/keyboardMarkup';
import { list_currency } from 'src/utils/tokens';

import type { MessageAmountMix, MessageReceiverMix } from 'src/models/Message';

export const amountMessageMixing = async ({
  chatId,
  messageId,
  messageText,
  states,
}: MessageAmountMix) => {
  const tokenFromName = list_currency.find(
    (item) =>
      item.ticker === states[chatId].fromToken &&
      item.network === states[chatId].fromCurrency,
  ).name;
  const tokenToName = list_currency.find(
    (item) =>
      item.ticker === states[chatId].toToken &&
      item.network === states[chatId].toCurrency,
  ).name;
  if (chatId && Boolean(messageId) && Boolean(messageId - 1)) {
    await bot.deleteMessage(chatId, messageId - 1);
  }

  if (isNaN(messageText)) {
    // If the user's input is not a number, ask the user for their age again
    if (chatId && messageId) {
      await bot.deleteMessage(chatId, messageId);
    }

    await bot.sendMessage(
      chatId,
      'Invalid Amount! Please enter the right amount.',
    );

    await bot.sendMessage(
      chatId,
      `
              Enter the amount of ${tokenFromName} that you have and want to exchange for ${tokenToName}.
              
Example: If you have 0.1 ETH and want to convert it to USDT, just type 0.1
            `,
      {
        parse_mode: 'Markdown',
        // reply_to_message_id: messageId,
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
  } else {
    if (chatId && messageId) {
      await bot.deleteMessage(chatId, messageId);
    }

    states[chatId].amount = messageText;
    await bot.sendMessage(chatId, textInfo.mixing, {
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
  }
};

export const receiverMessageMixing = async ({
  chatId,
  messageId,
  messageText,
  states,
}: MessageReceiverMix) => {
  const httpService = new HttpService();
  const appService = new AppService(httpService);

  const tokenToName = list_currency.find(
    (item) =>
      item.ticker === states[chatId].toToken &&
      item.network === states[chatId].toCurrency,
  ).name;

  if (chatId && Boolean(messageId) && Boolean(messageId - 1)) {
    await bot.deleteMessage(chatId, messageId - 1);
  }

  const request = await appService.getAddressValidator({
    network: states[chatId].toCurrency,
    address: messageText,
  });
  const response = await request;

  // console.log(response, 'response');

  if (response?.isSuccess) {
    if (!response?.result && response?.message) {
      await bot.sendMessage(chatId, response?.message, {
        reply_to_message_id: messageId,
      });

      bot.sendMessage(
        chatId,
        `
          Enter your ${tokenToName} wallet address
        `,
        {
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
    } else {
      if (chatId && messageId) {
        await bot.deleteMessage(chatId, messageId);
      }
      states[chatId].receiver = messageText;
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
                  )?.name ?? '-'
                : '',
            toToken:
              states[chatId] && states[chatId].toToken
                ? list_currency.find(
                    (item) =>
                      item.ticker === states[chatId].toToken &&
                      item.network === states[chatId].toCurrency,
                  )?.name ?? '-'
                : '',
            amount: states[chatId] ? states[chatId].amount : '',
            receiver: states[chatId] ? states[chatId].receiver : '',
            rateId: '',
          }),
        }),
      });
    }
  } else {
    await bot.sendMessage(
      chatId,
      `
          <b> 😥 ${response?.message ?? ''} - Operation Cancelled </b>
            `,
      {
        parse_mode: 'HTML',
      },
    );
  }
};
