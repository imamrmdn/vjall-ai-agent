import { bot } from 'src/main';

// import { CallbackInfo, textInfo } from 'src/utils';
// import { list_currency } from 'src/utils/tokens';
// import { keyboardMarkup } from 'src/utils/keyboardMarkup';

import { AnalyzeStartDto } from 'src/models/Analyze';
// import { MessageStartAnalyze } from 'src/models/Message';
import { CallbackInfo } from 'src/utils';

export const startStaking = async ({
  states,
  chatId,
  messageId,
  stages,
}: AnalyzeStartDto) => {
  if (!states[chatId]) {
    states[chatId] = {
      walletAddress: '',
    };
  }

  stages[chatId] = CallbackInfo.STAKING;

  await bot.sendMessage(
    chatId,
    `
*Zeal-AI Staking*

Staking: stake.zeal-ai.net

_This Feature will live soon_
`,
    {
      parse_mode: 'Markdown',
      // reply_to_message_id: messageId,
      // reply_markup: JSON.stringify({
      //   inline_keyboard: [
      //     [
      //       {
      //         text: `❌ Cancel`,
      //         callback_data: JSON.stringify({
      //           command: CallbackInfo.EXIT,
      //         }),
      //       },
      //     ],
      //   ],
      // }),
    },
  );
};
