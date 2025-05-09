import { Pool } from 'pg';
import { Login, NewLogin, ProfileLogin } from '../types';

class LoginDAO {
  constructor(private pool: Pool) {}

  async create(login: NewLogin): Promise<Login> {
    const query = {
      text: `
        INSERT INTO logins (
          application_id,
          date,
          chain_id,
          signer_address
        ) VALUES ($1, CURRENT_DATE, $2, $3)
        ON CONFLICT (application_id, date, chain_id, signer_address)
        DO UPDATE SET 
          count = logins.count + 1,
          updated_at = CURRENT_TIMESTAMP
        RETURNING *
      `,
      values: [
        login.applicationId,
        login.chainId,
        login.signerAddress
      ],
    };

    const result = await this.pool.query(query);
    return result.rows[0];
  }

  /*
  async findLogin({
    applicationId,
    chainId,
    signerAddress
  }: {
    applicationId: string,
    chainId: number,
    signerAddress: string
  }): Promise<Login> {
    const query = {
      text: `
        SELECT *
        FROM logins 
        WHERE
          application_id = $1 AND
          date = CURRENT_DATE AND
          chain_id = $2 AND
          signer_address = $3
      `,
      values: [
        applicationId,
        chainId,
        signerAddress
      ],
    };

    const result = await this.pool.query(query);
    return result.rows[0];
  }
  */

  async findProfileLogins({
    applicationId,
    startDate,
    endDate,
    chainId
  }: {
    applicationId: string,
    startDate: Date,
    endDate: Date,
    chainId: number
  }): Promise<ProfileLogin[]> {

    console.log(startDate, endDate);
    const query = {
      text: `
        SELECT 
          *,
          to_char(logins.date, 'YYYY-MM-DD') as date
        FROM logins
        JOIN signers
        ON
          signers.address = logins.signer_address AND
          signers.chain_id = logins.chain_id
        WHERE
          logins.application_id = $1 AND
          logins.date BETWEEN $2 AND $3 AND
          logins.chain_id = $4
      `,
      values: [
        applicationId,
        startDate,
        endDate,
        chainId
      ],
    };

    const result = await this.pool.query(query);
    result.rows.forEach(row => {
      console.log(row)
    });
    return result.rows;
  }

  /*
  async getTotalLogins(
    applicationId: string,
    startDate: Date,
    endDate: Date,
    chainId: number
  ): Promise<number> {
    const query = {
      text: `
        SELECT SUM(count) as total
        FROM logins 
        WHERE application_id = $1 
        AND date >= $2 
        AND date <= $3 
        AND chain_id = $4
      `,
      values: [
        applicationId,
        startDate,
        endDate,
        chainId
      ],
    };

    const result = await this.pool.query(query);
    return parseInt(result.rows[0].total) || 0;
  }

  async getUniqueSigners(
    applicationId: string,
    startDate: Date,
    endDate: Date,
    chainId: number
  ): Promise<number> {
    const query = {
      text: `
        SELECT COUNT(DISTINCT signer_address) as unique_signers
        FROM logins 
        WHERE application_id = $1 
        AND date >= $2 
        AND date <= $3 
        AND chain_id = $4
      `,
      values: [
        applicationId,
        startDate,
        endDate,
        chainId
      ],
    };

    const result = await this.pool.query(query);
    return parseInt(result.rows[0].unique_signers) || 0;
  }
  */
}

export default LoginDAO;
