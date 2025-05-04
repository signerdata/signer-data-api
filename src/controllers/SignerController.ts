import { Request, Response } from 'express';
import { SignerService } from '../services/SignerService';

export class SignerController {
  constructor(private signerService: SignerService) {}

  async loginSigner(req: Request, res: Response): Promise<void> {
    try {
      const { address } = req.params;
      const signer = await this.signerService.getSignerData(address);

      if (!signer) {
        res.status(404).json({
          message: 'Signer not found'
        });
        return;
      }

      res.status(200).json({
        data: signer
      });
    } catch (error) {
      console.error('Error in getSignerData:', error);
      res.status(500).json({
        message: 'Internal server error'
      });
    }
  }
} 