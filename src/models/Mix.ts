export interface MixCommand {
  stages: any;
  states: MixDtoConversation;
  chatStates: { [key: string]: number };
}
export interface MixUserDto {
  [chatId: number]: MixDto;
}

export interface MixDto {
  fromToken: string;
  toToken: string;
  amount: string;
  receiver: string;
  rateId: string;
}

export interface MixDtoConversation extends MixDto {
  fromName: string;
  fromCurrency: string;
  toName: string;
  toCurrency: string;
}

export enum MixerType {
  FLOAT = 'standard',
  FIXED = 'fixed-rate',
}

export interface EstimateExchangeParams {
  fromCurrency: string;
  toCurrency: string;
  fromAmount: string;
  toAmount: string;
  fromNetwork: string;
  toNetwork: string;
  flowType: MixerType;
}

export interface AddressValidatorParams {
  network: string;
  address: string;
}

export interface CreateExchangeDto {
  fromCurrency: string;
  fromNetwork: string;
  toCurrency: string;
  toNetwork: string;
  fromAmount: string;
  toAmount: string;
  address: string;
  flow: string;
  type: string;
  rateId: string;
}

export interface Currecy {
  ticker: string;
  name: string;
  image: string;
  network: string;
  tokenContract: string | null;
  legacyTicker: string;
}

export interface MixStartDto {
  chatId: number;
  messageId: number;
  states: MixDtoConversation;
  stages: any;
  data: Currecy;
}

export interface MixFromAndToDto {
  chatId: number;
  messageId: number;
  stages: any;
}

export interface MixReceiverDto {
  chatId: number;
  messageId: number;
  stages: any;
  states: MixDtoConversation;
}

export interface MixEstimateDto {
  chatId: number;
  messageId: number;
  stages: any;
  states: MixDtoConversation;
}

export interface MixCreateOrderDto {
  chatId: number;
  messageId: number;
  stages: any;
  states: MixDtoConversation;
  chatStates: { [key: string]: number };
}

export interface MixRefreshOrderDto {
  chatId: number;
  messageId: number;
  stages: any;
  orderId: string;
}
