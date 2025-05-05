export type Transaction = {
  blockNumber: number;
  timestamp: number;
  nonce: number;
  from?: string;
  to?: string;
  value: string;
  data: string;
  gasUsed: string;
  gasPrice: string;
  contractAddress?: string;
};
