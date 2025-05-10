import { Router } from 'express';
import pool from '../config/database';
// import redis from '../config/redis';
import DashboardController from '../controllers/DashboardController';
import ApplicationDAO from '../dao/ApplicationDAO';
import LoginDAO from '../dao/LoginDAO';
import DashboardService from '../services/dashboard/DashboardService';

const router = Router();
const loginDAO = new LoginDAO(pool);
const applicationDAO = new ApplicationDAO(pool);
const dashboardService = new DashboardService(loginDAO, applicationDAO);
const dashboardController = new DashboardController(dashboardService);

/**
 * @swagger
 * /api/v1/dashboard/applications:
 *   post:
 *     description: Creates a new application for the user
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Application'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid domain format"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid authorization token"
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
router.post('/applications', (req, res) => dashboardController.createApp(req, res));

/**
 * @swagger
 * /api/v1/dashboard/{applicationId}:
 *   get:
 *     description: Returns login statistics for the application
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: applicationId
 *         required: true
 *         schema:
 *           type: string
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         description: The application id
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProfileLogin'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid applicationId format"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid authorization token"
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
router.get('/applications/:applicationId', (req, res) => dashboardController.getLoginsFromApp(req, res));

/**
 * @swagger
 * /api/v1/dashboard/applications:
 *   get:
 *     description: Returns all the user's applications
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Application'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid authorization token"
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
router.get('/applications', (req, res) => dashboardController.getAppsFromUser(req, res));

export default router;
