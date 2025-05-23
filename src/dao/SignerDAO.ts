import { Pool } from 'pg'
import { Signer } from '../types'

class SignerDAO {
  constructor(private pool: Pool) {}

  async findByAddress(address: string): Promise<Signer> {
    const query = {
      text: 'SELECT * FROM signers WHERE address = $1',
      values: [address],
    }

    const result = await this.pool.query(query)
    return result.rows[0]
  }

  async create(signer: Signer): Promise<Signer> {
    const query = {
      text: `
        INSERT INTO signers (
          address,
          chain_id,
          profile,
          transactions_count,
          block_number,
          block_timestamp
        ) VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
      `,
      values: [
        signer.address,
        signer.chainId,
        JSON.stringify(signer.profile),
        signer.transactionsCount,
        signer.blockNumber,
        signer.blockTimestamp,
      ],
    }

    const result = await this.pool.query(query)
    return result.rows[0]
  }

  async update(signer: Signer): Promise<Signer> {
    const query = {
      text: `
        UPDATE signers 
        SET
          profile = $1,
          transactions_count = $2,
          block_number = $3,
          block_timestamp = $4,
          updated_at = CURRENT_TIMESTAMP
        WHERE address = $5
        RETURNING *
      `,
      values: [
        JSON.stringify(signer.profile),
        signer.transactionsCount,
        signer.blockNumber,
        signer.blockTimestamp,
        signer.address,
      ],
    }

    const result = await this.pool.query(query)
    return result.rows[0]
  }

  async createOrUpdate(signer: Signer): Promise<Signer> {
    const existingSigner = await this.findByAddress(signer.address)

    if (existingSigner) {
      return this.update(signer)
    }
    return this.create(signer)
  }
}

export default SignerDAO
