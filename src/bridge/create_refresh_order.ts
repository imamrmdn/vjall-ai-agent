import { HttpService } from '@nestjs/axios';

import { bot } from 'src/main';
import { AppService } from 'src/app.service';

import { CallbackInfo } from 'src/utils';
import { list_currency } from 'src/utils/tokens';
import { keyboardMarkup } from 'src/utils/keyboardMarkup';

import {
  MixCreateOrderDto,
  MixRefreshOrderDto,
  MixerType,
} from 'src/models/Mix';

export const createOrderMixing = async ({
  chatId,
  messageId,
  stages,
  states,
  chatStates,
}: MixCreateOrderDto) => {
  const httpService = new HttpService();
  const appService = new AppService(httpService);

  stages[chatId] = CallbackInfo.CREATE_ORDER;

  bot.editMessageText('🤔 Creating order...', {
    chat_id: chatId,
    message_id: messageId,
  });

  const requestOrder = await appService.createOrder({
    flow: MixerType.FIXED,
    fromAmount: states[chatId].amount,
    fromCurrency: states[chatId].fromToken,
    fromNetwork: states[chatId].fromCurrency,
    toAmount: '',
    toCurrency: states[chatId].toToken,
    toNetwork: states[chatId].toCurrency,
    address: states[chatId].receiver,
    type: 'direct',
    rateId: states[chatId].rateId,
  });
  const responseOrder = await requestOrder;

  // console.log(responseOrder, 'res order');

  if (responseOrder) {
    await bot.editMessageText(
      `
                  *Bridging Transaction started :*

• Bridging ID: \`${responseOrder?.id ?? '-'}\`
• Send: ${responseOrder.fromAmount} ${
        list_currency.find(
          (item) =>
            item.ticker === responseOrder.fromCurrency &&
            item.network === responseOrder.fromNetwork,
        ).name
      }
• Receive: ${responseOrder?.toAmount ?? '-'} ${
        list_currency.find(
          (item) =>
            item.ticker === responseOrder.toCurrency &&
            item.network === responseOrder.toNetwork,
        ).name
      }
• Receiver Wallet: \`${responseOrder?.payoutAddress ?? '-'}\`

➡️ Please transfer ${states[chatId].amount} ${
        list_currency.find(
          (item) =>
            item.ticker === responseOrder.fromCurrency &&
            item.network === responseOrder.fromNetwork,
        ).name
      } to start bridging process. 

Deposit Wallet: \`${responseOrder?.payinAddress ?? '-'}\`

You will get ${responseOrder?.toAmount ?? '-'} ${
        list_currency.find(
          (item) =>
            item.ticker === responseOrder.toCurrency &&
            item.network === responseOrder.toNetwork,
        ).name
      } for your ${responseOrder.fromAmount} ${
        list_currency.find(
          (item) =>
            item.ticker === responseOrder.fromCurrency &&
            item.network === responseOrder.fromNetwork,
        ).name
      }.

Note: You must complete this trade within a maximum of 30 minutes. Fees can vary.

📡 Status: Waiting`,
      {
        chat_id: chatId,
        message_id: messageId,
        parse_mode: 'Markdown',
        reply_markup: JSON.stringify({
          inline_keyboard: keyboardMarkup.refreshOrder(responseOrder?.id),
        }),
      },
    );

    delete chatStates[chatId];
    delete states[chatId];
    delete stages[chatId];
  }
};

export const refreshOrderMixing = async ({
  chatId,
  messageId,
  stages,
  orderId,
}: MixRefreshOrderDto) => {
  const httpService = new HttpService();
  const appService = new AppService(httpService);

  stages[chatId] = CallbackInfo.REFRESH_ORDER;

  const requestStatusOrder = await appService.getStatusOrder(orderId);
  const responseStatusOrder = await requestStatusOrder;
  // console.log(responseStatusOrder, 'status order');

  if (responseStatusOrder?.isSuccess) {
    const statusOrder = {
      fromAmount:
        responseStatusOrder?.expectedAmountFrom ||
        responseStatusOrder?.amountFrom,
      fromCurrency: responseStatusOrder.fromCurrency,
      fromNetwork: responseStatusOrder.fromNetwork,
      toAmount:
        responseStatusOrder?.expectedAmountTo || responseStatusOrder?.amountTo,
      toCurrency: responseStatusOrder.toCurrency,
      toNetwork: responseStatusOrder.toNetwork,
    };

    if (chatId && messageId) {
      await bot.deleteMessage(chatId, messageId);
    }

    await bot.sendMessage(
      chatId,
      `
                *Bridging Transaction started :*

• Bridging ID: \`${responseStatusOrder?.id ?? '-'}\`
• Send: ${statusOrder.fromAmount} ${
        list_currency.find(
          (item) =>
            item.ticker === statusOrder.fromCurrency &&
            item.network === statusOrder.fromNetwork,
        ).name
      }
• Receive: ${statusOrder.toAmount ?? '-'} ${
        list_currency.find(
          (item) =>
            item.ticker === statusOrder.toCurrency &&
            item.network === statusOrder.toNetwork,
        ).name
      }
• Receiver Wallet: \`${responseStatusOrder?.payoutAddress ?? '-'}\`

Deposit Wallet: \`${responseStatusOrder?.payinAddress ?? '-'}\`

Note: You must complete this trade within a maximum of 30 minutes. Fees can vary.

📡 Status: ${
        responseStatusOrder?.status?.charAt(0)?.toUpperCase() +
        responseStatusOrder?.status?.slice(1)
      }`,
      {
        // chat_id: chatId,
        message_id: messageId,
        parse_mode: 'Markdown',
        reply_markup: JSON.stringify({
          inline_keyboard: keyboardMarkup.refreshOrder(responseStatusOrder?.id),
        }),
      },
    );
  } else {
    await bot.editMessageText(
      `
      <b> 😥 ${responseStatusOrder?.message ?? ''} - Operation Cancelled </b>
        `,
      {
        chat_id: chatId,
        message_id: messageId,
        parse_mode: 'HTML',
      },
    );
  }
};
