export type Profile = {
  transactions: {
    firstTransactionDate: Date;
    lastTransactionDate: Date;
    frequency: number;
    // frequencyLastMonth: number;
    // frequencyLastWeek: number;
    count: number;
    // countLastMonth: number;
    // countLastWeek: number;
  },
  tokens: {
    address: string;
    balance: string;
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
    calls: {
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
  }
  deployments: {
    contractDeployments: string[],
    // contractDeploymentsLastMonth: string[],
    // contractDeploymentsLastWeek: string[],
  }
}

export type Signer = {
  address: string;
  profile: Profile;
  createdAt?: Date;
  updatedAt?: Date;
}
