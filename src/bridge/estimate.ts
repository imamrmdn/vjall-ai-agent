import { HttpService } from '@nestjs/axios';

import { bot } from 'src/main';
import { AppService } from 'src/app.service';

import { CallbackInfo } from 'src/utils';
import { list_currency } from 'src/utils/tokens';
import { keyboardMarkup } from 'src/utils/keyboardMarkup';

import { MixEstimateDto, MixerType } from 'src/models/Mix';

export const estimateMixing = async ({
  chatId,
  messageId,
  stages,
  states,
}: MixEstimateDto) => {
  const httpService = new HttpService();
  const appService = new AppService(httpService);

  stages[chatId] = CallbackInfo.ESTIMATE_EXCHANGE;

  await bot.editMessageText('🤔 Finding the best rate...', {
    chat_id: chatId,
    message_id: messageId,
  });

  const estimateParams = {
    flowType: MixerType.FIXED,
    fromAmount: states[chatId].amount,
    fromCurrency: states[chatId].fromToken,
    fromNetwork: states[chatId].fromCurrency,
    toAmount: '',
    toCurrency: states[chatId].toToken,
    toNetwork: states[chatId].toCurrency,
  };

  const requestEstimate = await appService.getEstimateExchange(estimateParams);

  const responseEstimate = await requestEstimate;

  // console.log(response, 'response');

  if (responseEstimate?.isSuccess) {
    states[chatId].rateId = responseEstimate?.rateId;
    await bot.editMessageText(
      `
          <b>Zeal-AI: Igniting Intelligence in Every Blockchain Interaction</b>

• Send: <b>${states[chatId].amount} ${
        list_currency.find(
          (item) =>
            item.ticker === states[chatId].fromToken &&
            item.network === states[chatId].fromCurrency,
        ).name
      }</b>
• Receive: <b>${responseEstimate?.toAmount ?? '-'} ${
        list_currency.find(
          (item) =>
            item.ticker === states[chatId].toToken &&
            item.network === states[chatId].toCurrency,
        ).name
      }</b>
• Receiver Wallet: <code>${states[chatId].receiver}</code>
          `,
      {
        chat_id: chatId,
        message_id: messageId,
        parse_mode: 'HTML',
        reply_markup: JSON.stringify({
          inline_keyboard: keyboardMarkup.estimateExchange,
        }),
      },
    );
  } else {
    await bot.editMessageText(
      `
        <b> 😥 ${responseEstimate?.message ?? ''} - Operation Cancelled </b>
          `,
      {
        chat_id: chatId,
        message_id: messageId,
        parse_mode: 'HTML',
      },
    );
  }
};
