import { bot } from 'src/main';

import {
  amountMessageMixing,
  receiverMessageMixing,
} from './amount_receiver_message';
import { startMixing } from './start';
import { fromMixing, toMixing } from './from_to';
import { amountMixing, receiverMixing } from './receiver_amount';
import { estimateMixing } from './estimate';
import { createOrderMixing, refreshOrderMixing } from './create_refresh_order';

import { CallbackInfo } from 'src/utils';

import type { MixCommand } from 'src/models/Mix';

const bridgeCommand = ({ stages, states, chatStates }: MixCommand) => {
  bot.on('message', async (msg) => {
    const chatId: number = msg.chat.id;
    const messageId = msg.message_id;
    const messageText = msg.text;

    if (stages[chatId] && states[chatId]) {
      if (stages[chatId] === CallbackInfo.AMOUNT) {
        amountMessageMixing({
          chatId,
          messageId,
          messageText,
          states,
        });
      }

      if (stages[chatId] === CallbackInfo.RECEIVER) {
        receiverMessageMixing({
          chatId,
          messageId,
          messageText,
          states,
        });
      }
    }
  });

  bot.on('callback_query', async (callbackQuery) => {
    const query = callbackQuery;
    const message = query.message;

    const chatId: number = message.chat.id;
    const data = JSON.parse(callbackQuery.data);

    // console.log(data, 'data');
    // console.log(message, 'message');
    // console.log(chatStates, 'chatStates');

    switch (data.command) {
      case CallbackInfo.MIX:
        startMixing({
          chatId,
          messageId: message.message_id,
          data,
          stages,
          states,
        });
        break;

      case CallbackInfo.FROM_TOKEN:
        fromMixing({
          chatId,
          messageId: message.message_id,
          stages,
        });
        break;

      case CallbackInfo.TO_TOKEN:
        toMixing({
          chatId,
          messageId: message.message_id,
          stages,
        });
        break;

      case CallbackInfo.RECEIVER:
        receiverMixing({
          chatId,
          messageId: message.message_id,
          stages,
          states,
        });
        break;

      case CallbackInfo.AMOUNT:
        amountMixing({
          chatId,
          messageId: message.message_id,
          stages,
          states,
        });
        break;

      case CallbackInfo.ESTIMATE_EXCHANGE:
        estimateMixing({
          chatId,
          messageId: message.message_id,
          stages,
          states,
        });
        break;

      case CallbackInfo.CREATE_ORDER:
        if (stages[chatId] && states[chatId]) {
          createOrderMixing({
            chatId,
            messageId: message.message_id,
            stages,
            states,
            chatStates,
          });
        }
        break;

      case CallbackInfo.REFRESH_ORDER:
        if (data.id) {
          refreshOrderMixing({
            chatId,
            messageId: message.message_id,
            stages,
            orderId: data.id ?? '',
          });
        }
        break;
      default:
        return;
    }
  });
};

export default bridgeCommand;
