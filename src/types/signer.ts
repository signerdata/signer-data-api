import { Transaction } from "./transactions";

export type SignerProfile = {
  account: {
    ageDays: number;
    activeDaysCount: number;
  },
  transactions: {
    all: {
      countAll: number;
      count30d: number;
      count7d: number;
      frequencyAll: number;
      frequency30d: number;
      frequency7d: number;
      firstTransaction: Date;
      lastTransaction: Date;
      spanDays: number;
      activeDaysCount: number;
    },
    in: {
      countAll: number;
      count30d: number;
      count7d: number;
      frequencyAll: number;
      frequency30d: number;
      frequency7d: number;
      firstTransaction: Date;
      lastTransaction: Date;
      spanDays: number;
      activeDaysCount: number;
    },
    out: {
      countAll: number;
      count30d: number;
      count7d: number;
      frequencyAll: number;
      frequency30d: number;
      frequency7d: number;
      firstTransaction: Date;
      lastTransaction: Date;
      spanDays: number;
      activeDaysCount: number;
    }
  },
  tokens: {
    address: string;
    //balance: string;
    volume: string;
    // volumeLastMonth: string;
    // volumeLastWeek: string;
    volumeIn: string;
    // volumeInLastMonth: string;
    // volumeInLastWeek: string;
    volumeOut: string;
    // volumeOutLastMonth: string;
    // volumeOutLastWeek: string;
  }[]
  interactions: {
    address: string;
    count: number;
  }[],
  // callsLastMonth: {
  //   address: string;
  //   count: number;
  // }[],
  // callsLastWeek: {
  //   address: string;
  //   count: number;
  // }[],
  contractsDeployed: number,
  // contractsDeployedLastMonth: number,
  // contractsDeployedLastWeek: number,
}

export type Signer = {
  address: string;
  profile: SignerProfile;
  transactionsCount: number;
  blockNumber: number;
  blockTimestamp: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ProfileData = {
  transactions: Transaction[];
  lastBlockNumber: number
  lastBlockTimestamp: Date
}
