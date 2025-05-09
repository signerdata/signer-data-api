import { getAddress } from 'viem';
import { BASE_CHAIN_ID } from '../../config/constants';
import LoginDAO from '../../dao/LoginDAO';
import SignerDAO from '../../dao/SignerDAO';
import { Signer, SignerProfile } from '../../types';
import { getTransactions } from '../envio';
import { calculateFullProfile } from '../profiles/utils';

class SignerService {
  constructor(
    private signerDAO: SignerDAO,
    private loginDAO: LoginDAO,
  ) {}

  async getProfile({
    address,
    applicationId,
    chainId
  }: {
    address: string,
    applicationId: string,
    chainId: number
  }): Promise<SignerProfile | undefined> {
    const checksummedAddress = getAddress(address);

    await this.loginDAO.create({
      applicationId,
      chainId,
      signerAddress: checksummedAddress
    });

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
      chainId: BASE_CHAIN_ID,
      profile,
      transactionsCount: profileData.transactions.length,
      blockNumber: profileData.lastBlockNumber,
      blockTimestamp: profileData.lastBlockTimestamp
    };
    const createdSigner = await this.signerDAO.create(newSigner);

    return createdSigner.profile;
  }
} 

export default SignerService;
