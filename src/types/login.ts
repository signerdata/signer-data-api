import { SignerProfile } from "./signer";

export type NewLogin = {
  applicationId: string;
  chainId: number;
  signerAddress: string;
};

export type Login = {
  applicationId: string;
  date: Date;
  chainId: number;
  signerAddress: string;
  count: number;
};

export type ProfileLogin = {
  applicationId: string;
  date: Date;
  chainId: number;
  address: string;
  count: number;
  profile: SignerProfile;
  transactionsCount: number;
  blockNumber: number;
  blockTimestamp: Date;
}; 
