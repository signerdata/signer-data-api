import { Pool } from 'pg'
import { Application, NewApplication } from '../types'

class ApplicationDAO {
  constructor(private pool: Pool) {}

  async findById(id: number): Promise<Application> {
    const query = {
      text: 'SELECT * FROM applications WHERE id = $1',
      values: [id],
    }

    const result = await this.pool.query(query)
    return result.rows[0]
  }

  async findByDomain(domain: string): Promise<Application> {
    const query = {
      text: 'SELECT * FROM applications WHERE domain = $1',
      values: [domain],
    }

    const result = await this.pool.query(query)
    return result.rows[0]
  }

  async findByUserId(userId: string): Promise<Application[]> {
    const query = {
      text: 'SELECT * FROM applications WHERE user_id = $1',
      values: [userId],
    }

    const result = await this.pool.query(query)
    return result.rows
  }

  async create(application: NewApplication): Promise<Application> {
    const query = {
      text: `
        INSERT INTO applications (
          user_id,
          name,
          description,
          domain
        ) VALUES ($1, $2, $3, $4)
        RETURNING *
      `,
      values: [application.userId, application.name, application.description, application.domain],
    }

    const result = await this.pool.query(query)
    return result.rows[0]
  }

  async update(application: Application): Promise<Application> {
    const query = {
      text: `
        UPDATE applications 
        SET
          name = $1,
          description = $2,
          domain = $3,
          active = $4,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $5
        RETURNING *
      `,
      values: [
        application.name,
        application.description,
        application.domain,
        application.active,
        application.id,
      ],
    }

    const result = await this.pool.query(query)
    return result.rows[0]
  }
}

export default ApplicationDAO
