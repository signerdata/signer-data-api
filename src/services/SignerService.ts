import { getAddress } from 'viem';
import { SignerDAO } from '../dao/SignerDAO';
import { Signer, SignerProfile } from '../types/signer';
import { getTransactions } from './envio';
import { calculateFullProfile } from './utils';

export class SignerService {
  constructor(
    private signerDAO: SignerDAO,
  ) {}

  async getProfile(address: string): Promise<SignerProfile | undefined> {
    const checksummedAddress = getAddress(address);

    const signer = await this.signerDAO.findByAddress(checksummedAddress);
    if (signer) {
      // const recentProfileData = await getTransactions({ address: checksummedAddress, startBlock: signer.blockNumber });
      // const profile = await recalculateProfile({ address: checksummedAddress, transactions: recentProfileData.transactions });
      // const newSigner: Signer = {
      //   address: checksummedAddress,
      //   profile,
      //   transactionsCount: recentProfileData.transactions.length,
      //   blockNumber: recentProfileData.lastBlockNumber,
      //   blockTimestamp: recentProfileData.lastBlockTimestamp
      // };
      // const updatedSigner = await this.signerDAO.update(newSigner);

      return signer.profile;
    }

    const profileData = await getTransactions({ address: checksummedAddress, startBlock: 0 });
    const profile = await calculateFullProfile({ address: checksummedAddress, transactions: profileData.transactions });

    const newSigner: Signer = {
      address: checksummedAddress,
      profile,
      transactionsCount: profileData.transactions.length,
      blockNumber: profileData.lastBlockNumber,
      blockTimestamp: profileData.lastBlockTimestamp
    };
    const createdSigner = await this.signerDAO.create(newSigner);

    return createdSigner.profile;
  }
} 