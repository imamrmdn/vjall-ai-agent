export interface AnalyzeDtoConversation {
  analyzeChainId?: string;
  analyzeContractAddress?: string;
}

export interface AnalyzeStartDto extends AnalyzeDtoConversation {
  chatId?: number;
  messageId?: number;
  states: AnalyzeDtoConversation;
  stages: any;
  // data: {
  //   analyzeNetwork?: string;
  //   analyzeContractAddress?: string;
  // };
}

export interface AnalyzeContractAddressDto {
  chatId: number;
  messageId: number;
  states: AnalyzeDtoConversation;
  stages: any;
  data: {
    analyzeChainId?: string;
    analyzeContractAddress?: string;
  };
}

export interface AnalyzeResultDto {
  chainId: string;
  contractAddress: string;
}
