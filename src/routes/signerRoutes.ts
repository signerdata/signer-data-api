import { Router } from 'express';
import pool from '../config/database';
// import redis from '../config/redis';
import { SignerController } from '../controllers/SignerController';
import { SignerDAO } from '../dao/SignerDAO';
import { SignerService } from '../services/SignerService';

const router = Router();
const signerDAO = new SignerDAO(pool);
const signerService = new SignerService(signerDAO /*, redis */);
const signerController = new SignerController(signerService);

/**
 * @swagger
 * /api/v1/signer/login/{address}:
 *   post:
 *     description: Tracks the signer's address during the login process and returns its onchain profile
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
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Signer'
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
router.post('/login/:address', (req, res) => signerController.loginSigner(req, res));

export default router;
