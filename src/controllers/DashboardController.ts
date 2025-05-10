import { User } from '@supabase/supabase-js';
import { Request, Response } from 'express';
import { BASE_CHAIN_ID } from '../config/constants';
import { supabase } from '../services/config';
import DashboardService from '../services/dashboard/DashboardService';

async function validateUserToken(req: Request, res: Response): Promise<User | undefined> {
  const { authorization } = req.headers;

  const token = authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({
      message: 'Invalid authorization token'
    });
    return;
  }
  const { data, error } = await supabase.auth.getUser(token);
  if (error) {
    res.status(401).json({
      message: 'Invalid authorization token'
    });
    return;
  }

  return data.user;
}

class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  async createApp(req: Request, res: Response): Promise<void> {
    try {
      const { domain } = req.body;
      
      const user = await validateUserToken(req, res);
      if (!user) {
        return
      }

      if (!domain.match(/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/)) {
        res.status(400).json({
          message: 'Invalid domain format'
        });
        return;
      }
      
      const newApplication = await this.dashboardService.createApp({
        userId: user.id,
        name: '',
        description: '',
        domain
      });

      res.status(201).json(newApplication);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Internal server error'
      });
    }
  }

  async getLoginsFromApp(req: Request, res: Response): Promise<void> {
    try {
      const { applicationId } = req.params;

      const user = await validateUserToken(req, res);
      if (!user) {
        return
      }

      if (!applicationId) {
        res.status(400).json({
          message: 'Invalid applicationId format'
        });
        return;
      }
      
      const applications = await this.dashboardService.getAppsFromUser({
        userId: user.id
      });
      if (!applications.find(app => app.id === applicationId)) {
        res.status(400).json({
          message: 'Invalid applicationId'
        });
        return;
      }
  
      const dayInMilliseconds = 24 * 60 * 60 * 1000;
      const logins = await this.dashboardService.getProfileLoginsFromApp({
        applicationId,
        startDate: new Date(Date.now() - 30 * dayInMilliseconds),
        endDate: new Date(),
        chainId: BASE_CHAIN_ID
      });
      if (!logins) {
        res.status(200).json([]);
        return;
      }

      res.status(200).json(logins);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Internal server error'
      });
    }
  }

  async getAppsFromUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await validateUserToken(req, res);
      if (!user) {
        return
      }

      const applications = await this.dashboardService.getAppsFromUser({
        userId: user.id
      });
      if (!applications) {
        res.status(200).json([]);
        return;
      }

      res.status(200).json(applications);
      } catch (error) {
        console.error(error);
        res.status(500).json({
          message: 'Internal server error'
        });
      }
  }
}

export default DashboardController;
