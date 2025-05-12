import ApplicationDAO from '../../dao/ApplicationDAO'
import LoginDAO from '../../dao/LoginDAO'
import { Application, NewApplication, ProfileLogin } from '../../types'

class DashboardService {
  constructor(
    private loginDAO: LoginDAO,
    private applicationDAO: ApplicationDAO
  ) {}

  async createApp(application: NewApplication): Promise<Application> {
    const newApplication = await this.applicationDAO.create(application)

    return newApplication
  }

  async getProfileLoginsFromApp({
    applicationId,
    startDate,
    endDate,
    chainId,
  }: {
    applicationId: string
    startDate: Date
    endDate: Date
    chainId: number
  }): Promise<ProfileLogin[] | undefined> {
    const profileLogins = await this.loginDAO.findProfileLogins({
      applicationId,
      startDate,
      endDate,
      chainId,
    })

    return profileLogins
  }

  async getAppsFromUser({ userId }: { userId: string }): Promise<Application[]> {
    const applications = await this.applicationDAO.findByUserId(userId)

    return applications
  }
}

export default DashboardService
