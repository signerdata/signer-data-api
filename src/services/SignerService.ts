import { SignerDAO } from '../dao/SignerDAO';
import { SignerProfile } from '../entities/Signer';

export class SignerService {
  constructor(
    private signerDAO: SignerDAO,
    // private redis: Redis,
    // private cacheTTL: number = parseInt(process.env.PROFILE_CACHE_TTL || '1800')
  ) {}

  // private getCacheKey(address: string): string {
  //   return `profile:${address}`;
  // }

  async getSignerData(address: string): Promise<SignerProfile | undefined> {
    // const cacheKey = this.getCacheKey(address);
    // const cachedProfile = await this.redis.get(cacheKey);
    
    // if (cachedProfile) {
    //   return JSON.parse(cachedProfile);
    // }

    const signer = await this.signerDAO.findByAddress(address);

    if (signer) {
      // await profileUpdateQueue.add('update-profile', { address });
      return signer.profile;
    }
    // await profileFullCalculationQueue.add('calculate-profile', { address });

    return;
  }

  /*
  async updateProfile(address: string): Promise<void> {
    // TODO: Implement this

    const signer = await this.signerDAO.update(address, {});

    if (signer) {
      await this.redis.setex(
        this.getCacheKey(address),
        this.cacheTTL,
        JSON.stringify(signer)
      );
    }
  }

  async calculateFullProfile(address: string): Promise<void> {
    // TODO: Implement this
    
    const signer = await this.signerDAO.create(address, {});

    if (signer) {
      await this.redis.setex(
        this.getCacheKey(address),
        this.cacheTTL,
        JSON.stringify(signer)
      );
    }
  }
  */
} 