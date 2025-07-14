import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

import bridgeCommand from './bridge';
import analyzeCommand from './analyzer';

import { CallbackInfo, ChatStage, textInfo } from './utils';
import { keyboardMarkup } from './utils/keyboardMarkup';

import type { MixDtoConversation } from './models/Mix';
import type { AnalyzeDtoConversation } from './models/Analyze';
import faucetCommand from './faucet';
import stakingCommand from './staking';

const TelegramBot = require('node-telegram-bot-api');

import OpenAI from 'openai';

import 'dotenv/config';

// const botToken = '6567740479:AAGpS3H2tzHtp_7Ey-9v0PWpAnEaNLoVlgk';
const botToken = process.env.TOKEN_BOT;
export const bot = new TelegramBot(botToken, { polling: true });

// Store the state of each chat
let chatStates = {};

let mixStates = {} as MixDtoConversation;
let mixStage = {};

let analyzeStates = {} as AnalyzeDtoConversation;

const clientOpenAi = new OpenAI({
  apiKey: process.env.OPENAI_APIKEY,
});

async function getAIResponse(prompt: string): Promise<any> {
  try {
    const completion = await clientOpenAi.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'assistant',
          content: `
   You are NexaFlow AI Code Assistant.

- If asked whether you are from ChatGPT or OpenAI, say you are created by NexaFlow AI or NexaFlow Engine.
- If asked about the website of NexaFlow, respond with "https://www.nexaflow.tech/".

Main policy:
- Only respond to prompts about programming or code assistance. This includes analyzing source code, explaining programming concepts, answering questions about programming history, or helping with anything related to coding (e.g., JavaScript, Python, etc.).
- If the user's prompt is unrelated to programming (for example: asking about houses, world trivia, daily life, general chit-chat), respond exactly with:
NexaFlow Code Assistant cannot process your request because it is not related to programming or code analysis.
          `,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    });
    //
    console.log({ log: completion.choices[0].message.content });
    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error with OpenAI API:', error);
    return 'Error: Unable to process your request at the moment.';
  }
}

async function main() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*', // replace with your allowed origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders:
      // 'Origin,Content-Type,Authorization,Accept,User-Agent,Cache-Control,Pragma,x-api-key',
      'x-api-key',
    credentials: true,
    exposedHeaders: 'Content-Length',
    maxAge: 43200, // 12 hours
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  bot.on('message', async (msg) => {
    const chatId: number = msg.chat.id;
    const messageText = msg.text;

    if (messageText === '/start') {
      // chatStates[chatId] = ChatStage.START;

      // delete mixStates[chatId];
      // delete mixStage[chatId];

      // if (!mixStates[chatId]) {
      //   mixStates[chatId] = {
      //     amount: '',
      //     fromToken: '',
      //     fromCurrency: '',
      //     receiver: '',
      //     toToken: '',
      //     toCurrency: '',
      //     rateId: '',
      //     analyzeChainId: '',
      //     analyzeContractAddress: '',
      //   };
      // }

      // Path to the video file
      const videoPath =
        'https://res.cloudinary.com/drmwcjsgc/image/upload/v1752499619/about-nexaflow_yogk0l.jpg';

      await bot.sendPhoto(chatId, videoPath, {
        parse_mode: 'Markdown',
        caption: `
          *NexaFlow 🤖*

*Smarter Workflows, Powered by AI*
Unlock Your Data's True Power.\n

As companies generate more data than ever, they struggle to extract value quickly and securely. Existing centralized infrastructure creates vulnerabilities, while development teams waste time on repetitive tasks.

        `,
        reply_markup: JSON.stringify({
          inline_keyboard: keyboardMarkup.start,
        }),
      });
    }else{
      //bot.sendMessage(chatId, 'Invalid command. Please try again.')
      let mssg;

      bot
        .sendMessage(chatId, 'generate...')
        .then((message) => (mssg = message.message_id));

      const resp = await getAIResponse(messageText);
      console.log({ log: resp });

      if (resp) {
        bot.deleteMessage(chatId, mssg);
      }

      bot.sendMessage(chatId, resp);
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
      case CallbackInfo.ABOUT:
        bot.sendMessage(chatId, textInfo.about, {
          parse_mode: 'Markdown',
        });
        break;

      case CallbackInfo.SOCIALS:
        bot.editMessageReplyMarkup(
          {
            inline_keyboard: keyboardMarkup.socials,
          },
          {
            chat_id: chatId,
            message_id: message.message_id,
          },
        );
        break;
      case CallbackInfo.CMMD:
          bot.sendMessage(chatId, textInfo.instructions);
          break;
      case CallbackInfo.ATM:
          bot.sendMessage(chatId, textInfo.fiturlock1);
          break;
      case CallbackInfo.DII:
          bot.sendMessage(chatId, textInfo.fiturlock2);
          break;
      case CallbackInfo.BACK:
        bot.editMessageReplyMarkup(
          {
            inline_keyboard: keyboardMarkup.start,
          },
          {
            chat_id: chatId,
            message_id: message.message_id,
          },
        );
        break;

      case CallbackInfo.EXIT:
        delete chatStates[chatId];
        delete mixStates[chatId];
        delete mixStage[chatId];
        if (chatId && message.message_id) {
          bot.deleteMessage(chatId, message.message_id);
        }
        break;

      default:
        return;
    }
  });

  bridgeCommand({
    stages: mixStage,
    states: mixStates,
    chatStates,
  });

  analyzeCommand({
    stages: mixStage,
    states: analyzeStates,
  });

  faucetCommand({
    stages: mixStage,
    states: analyzeStates,
  });

  stakingCommand({
    stages: mixStage,
    states: analyzeStates,
  });

  await app.listen(4000);
}
main();
