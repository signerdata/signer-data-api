import { Request, Response } from 'express';
import { isAddress } from 'viem';
import { SignerService } from '../services/SignerService';

export class SignerController {
  constructor(private signerService: SignerService) {}

  async loginSigner(req: Request, res: Response): Promise<void> {
    try {
      const { address } = req.params;

      const isValidAddress = isAddress(address);
      if (!isValidAddress) {
        res.status(400).json({
          message: 'Invalid address format'
        });
        return;
      }
      
      const profile = await this.signerService.getProfile(address);
      if (!profile) {
        res.status(404).json({
          message: 'Signer not found'
        });
        return;
      }

      res.status(200).json(profile);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Internal server error'
      });
    }
  }
} 