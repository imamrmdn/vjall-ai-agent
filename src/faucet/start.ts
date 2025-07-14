// import { bot } from 'src/main';

// // import { CallbackInfo, textInfo } from 'src/utils';
// // import { list_currency } from 'src/utils/tokens';
// // import { keyboardMarkup } from 'src/utils/keyboardMarkup';

// import { AnalyzeStartDto } from 'src/models/Analyze';
// import { MessageStartAnalyze } from 'src/models/Message';
// import { CallbackInfo } from 'src/utils';
// import redis from './redis';
// import { HttpService } from '@nestjs/axios';
// import { AppService } from 'src/app.service';

// export const startFaucet = async ({
//   states,
//   chatId,
//   messageId,
//   stages,
// }: AnalyzeStartDto) => {
//   if (!states[chatId]) {
//     states[chatId] = {
//       walletAddress: '',
//     };
//   }

//   stages[chatId] = CallbackInfo.CLAIM_FAUCET;

//   await bot.sendMessage(
//     chatId,
//     `
// *Zeal-AI Testnet*

// Network Name: Zeal-AI
// Symbol: ZAI
// Chain ID: 2302

// RPC: rpc.zeal-ai.net
// Explorer: explorer.zeal-ai.net
// Faucet: faucet.zeal-ai.net

// _Enter your wallet Address_
// `,
//     {
//       parse_mode: 'Markdown',
//       // reply_to_message_id: messageId,
//       reply_markup: JSON.stringify({
//         inline_keyboard: [
//           [
//             {
//               text: `❌ Cancel`,
//               callback_data: JSON.stringify({
//                 command: CallbackInfo.EXIT,
//               }),
//             },
//           ],
//         ],
//       }),
//     },
//   );
// };

// export const claimFaucet = async ({
//   chatId,
//   messageId,
//   messageText,
//   states,
//   stages,
// }: MessageStartAnalyze) => {
//   const httpService = new HttpService();
//   const appService = new AppService(httpService);

//   if (chatId && Boolean(messageId) && Boolean(messageId - 1)) {
//     bot.deleteMessage(chatId, messageId - 1);
//     bot.deleteMessage(chatId, messageId);
//   }

//   await bot.sendMessage(chatId, '⏳ Claiming...');

//   const received = await appService.canReceive(messageText);
//   if (!received.success) {
//     if (chatId && Boolean(messageId)) {
//       bot.deleteMessage(chatId, messageId);
//     }

//     await bot.sendMessage(chatId, received.message);

//     if (stages[chatId]) {
//       stages[chatId] = CallbackInfo.EXIT;
//     }
//   }

//   const transfer = await appService.transferCoin(messageText);
//   if (!transfer.success) {
//     if (chatId && Boolean(messageId)) {
//       bot.deleteMessage(chatId, messageId);
//     }

//     await redis.set(messageText, Math.floor(Date.now() / 1000));

//     await bot.sendMessage(chatId, transfer.message);

//     if (stages[chatId]) {
//       stages[chatId] = CallbackInfo.EXIT;
//     }
//   }

//   await bot.sendMessage(chatId, '✅ Claim Succesful');

//   if (stages[chatId]) {
//     stages[chatId] = CallbackInfo.EXIT;
//   }
// };
