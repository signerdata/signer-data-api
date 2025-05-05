import { SignerDAO } from '../dao/SignerDAO';
import { Signer, SignerProfile } from '../types/signer';
import { getTransactions } from './envio';
import { calculateFullProfile } from './utils';

export class SignerService {
  constructor(
    private signerDAO: SignerDAO,
  ) {}

  async getProfile(address: string): Promise<SignerProfile | undefined> {
    const signer = await this.signerDAO.findByAddress(address);
    if (signer) {
      // const recentProfileData = await getTransactions({ address, startBlock: signer.blockNumber });
      // const profile = await recalculateProfile({ address, transactions: recentProfileData.transactions });
      // const newSigner: Signer = {
      //   address,
      //   profile,
      //   transactionsCount: profileData.transactions.length,
      //   blockNumber: profileData.lastBlockNumber,
      //   blockTimestamp: profileData.lastBlockTimestamp
      // };
      // const updatedSigner = await this.signerDAO.update(newSigner);
      return signer.profile;
    }

    const profileData = await getTransactions({ address, startBlock: 0 });
    const profile = await calculateFullProfile({ address, transactions: profileData.transactions });

    const newSigner: Signer = {
      address,
      profile,
      transactionsCount: profileData.transactions.length,
      blockNumber: profileData.lastBlockNumber,
      blockTimestamp: profileData.lastBlockTimestamp
    };
    const createdSigner = await this.signerDAO.create(newSigner);

    return createdSigner.profile;
  }
} 