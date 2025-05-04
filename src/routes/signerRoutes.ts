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

router.post('/login/:address', (req, res) => signerController.loginSigner(req, res));

export default router;
