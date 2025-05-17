import { Request, Response } from 'express'
import { isAddress } from 'viem'
import { BASE_CHAIN_ID } from '../config/constants'
import SignerService from '../services/profiles/SignerService'

class SignerController {
  constructor(private signerService: SignerService) {}

  async loginSigner(req: Request, res: Response): Promise<void> {
    try {
      const { address } = req.params
      const { applicationId } = req.body

      const isValidAddress = isAddress(address)
      if (!isValidAddress) {
        res.status(400).json({
          message: 'Invalid address format',
        })
        return
      }
      if (!applicationId) {
        res.status(400).json({
          message: 'Invalid applicationId',
        })
        return
      }
      
      const profile = await this.signerService.getProfile({
        address,
        applicationId,
        chainId: BASE_CHAIN_ID,
      })
      if (!profile) {
        res.status(404).json({
          message: 'Signer not found',
        })
        return
      }

      res.status(200).json(profile)
    } catch (error) {
      console.error(error)
      res.status(500).json({
        message: 'Internal server error',
      })
    }
  }
}

export default SignerController
