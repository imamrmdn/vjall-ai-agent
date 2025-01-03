import { AnalyzeDtoConversation } from './Analyze';
import type { MixDtoConversation } from './Mix';

export interface MessageAmountMix {
  states: MixDtoConversation;
  chatId: number;
  messageId: number;
  messageText: number;
}

export interface MessageReceiverMix {
  states: MixDtoConversation;
  chatId: number;
  messageId: number;
  messageText: string;
}

export interface MessageStartAnalyze {
  states: AnalyzeDtoConversation;
  stages: any;
  chatId: number;
  messageId: number;
  messageText: string;
}
