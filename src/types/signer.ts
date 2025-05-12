export type SignerProfile = {
  account: {
    ageDays: number
  }
  transactions: {
    all: {
      countAll: number
      count30d: number
      count7d: number
      frequencyAll: number
      frequency30d: number
      frequency7d: number
      firstTransaction?: Date
      lastTransaction?: Date
      spanDays: number
      activeDaysCount: number
    }
    in: {
      countAll: number
      count30d: number
      count7d: number
      frequencyAll: number
      frequency30d: number
      frequency7d: number
      firstTransaction?: Date
      lastTransaction?: Date
      spanDays: number
      activeDaysCount: number
    }
    out: {
      countAll: number
      count30d: number
      count7d: number
      frequencyAll: number
      frequency30d: number
      frequency7d: number
      firstTransaction?: Date
      lastTransaction?: Date
      spanDays: number
      activeDaysCount: number
    }
  }
  tokens: {
    address: string
    volume: string
    volumeIn: string
    volumeOut: string
  }[]
  interactions: {
    address: string
    count: number
  }[]
  contractsDeployed: number
}

export type Signer = {
  address: string
  chainId: number
  profile: SignerProfile
  transactionsCount: number
  blockNumber: number
  blockTimestamp: Date
}

export type Transaction = {
  blockNumber: number
  timestamp: number
  nonce: number
  from?: string
  to?: string
  value: string
  data: string
  gasUsed: string
  gasPrice: string
  contractAddress?: string
}

export type ProfileData = {
  transactions: Transaction[]
  lastBlockNumber: number
  lastBlockTimestamp: Date
}
