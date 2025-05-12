import { Router } from 'express'
import pool from '../config/database'
// import redis from '../config/redis';
import SignerController from '../controllers/SignerController'
import LoginDAO from '../dao/LoginDAO'
import SignerDAO from '../dao/SignerDAO'
import SignerService from '../services/profiles/SignerService'

const router = Router()
const signerDAO = new SignerDAO(pool)
const loginDAO = new LoginDAO(pool)
const signerService = new SignerService(signerDAO, loginDAO)
const signerController = new SignerController(signerService)

/**
 * @swagger
 * /api/v1/signer/{address}:
 *   post:
 *     description: Records a login event for the signer and returns its latest onchain profile data
 *     tags:
 *       - Signer
 *     parameters:
 *       - in: path
 *         name: address
 *         required: true
 *         schema:
 *           type: string
 *           example: "0x1234567890123456789012345678901234567890"
 *         description: The address of the signer
 *       - in: body
 *         name: applicationId
 *         required: true
 *         schema:
 *           type: string
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         description: The id of the application
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SignerProfile'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid address format"
 *       5XX:
 *         description: Unexpected error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unexpected error"
 */
router.post('/:address', (req, res) => signerController.loginSigner(req, res))

export default router
