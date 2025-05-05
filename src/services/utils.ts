import { SignerProfile } from '../types/signer';
import { Transaction } from '../types/transactions';

export function calculateFullProfile({
  transactions,
  address
} : {
  transactions: Transaction[],
  address: string
}): SignerProfile {
  // TODO: Handle 0 transactions, 0 out transactions, 0 in transactions

  const inTransactions = transactions.filter((tx) => tx.to === address);
  const outTransactions = transactions.filter((tx) => tx.from === address);

  const firstTransaction = new Date(outTransactions[0].timestamp * 1000);
  const lastTransaction = new Date(outTransactions[outTransactions.length - 1].timestamp * 1000);

  // Frequency
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const daysPassed = (lastTransaction.getTime() - firstTransaction.getTime()) / millisecondsPerDay;
  const frequency = daysPassed > 0 ? outTransactions.length / daysPassed : 0;

  // Frequency Last Month
  const thirtyDaysAgo = Math.floor((Date.now() - 30 * millisecondsPerDay) / 1000);
  const transactionsLastMonth = outTransactions.filter((tx) => tx.timestamp > thirtyDaysAgo);
  const frequencyLastMonth = transactionsLastMonth.length / 30;

  // Frequency Last Week
  const sevenDaysAgo = Math.floor((Date.now() - 7 * millisecondsPerDay) / 1000);
  const transactionsLastWeek = outTransactions.filter((tx) => tx.timestamp > sevenDaysAgo);
  const frequencyLastWeek = transactionsLastWeek.length / 7;

  const txs: SignerProfile['transactions'] = {
    all: {
      firstTransaction,
      lastTransaction,
      frequencyAll: frequency,
      frequency30d: frequencyLastMonth,
      frequency7d: frequencyLastWeek,
      countAll: outTransactions.length,
      count30d: transactionsLastMonth.length,
      count7d: transactionsLastWeek.length,
      spanDays: daysPassed,
      activeDaysCount: transactions.length
    },
    in: {
      firstTransaction,
      lastTransaction,
      frequencyAll: frequency,
      frequency30d: frequencyLastMonth,
      frequency7d: frequencyLastWeek,
      countAll: inTransactions.length,
      count30d: transactionsLastMonth.length,
      count7d: transactionsLastWeek.length,
      spanDays: daysPassed,
      activeDaysCount: inTransactions.length
    },
    out: {
      firstTransaction,
      lastTransaction,
      frequencyAll: frequency,
      frequency30d: frequencyLastMonth,
      frequency7d: frequencyLastWeek,
      countAll: outTransactions.length,
      count30d: transactionsLastMonth.length,
      count7d: transactionsLastWeek.length,
      spanDays: daysPassed,
      activeDaysCount: outTransactions.length
    }
  };

  const tokens: SignerProfile['tokens'] = [];

  const totalNativeTokenInVolume = inTransactions.reduce((acc, tx) => {
    return acc + BigInt(tx.value);
  }, BigInt(0));
  

  const totalNativeTokenOutVolume = outTransactions.reduce((acc, tx) => {
    return acc + BigInt(tx.value);
  }, BigInt(0));

  const totalNativeTokenVolume = totalNativeTokenInVolume + totalNativeTokenOutVolume;

  tokens.push({
    address: '0x0000000000000000000000000000000000000000',
    volume: totalNativeTokenVolume.toString(),
    volumeIn: totalNativeTokenInVolume.toString(),
    volumeOut: totalNativeTokenOutVolume.toString()
  });

  const interactionCounts = outTransactions.reduce((acc, tx) => {
    if (tx.data !== '0x') {
      const currentCount = acc.get(tx.to!) || 0;
      acc.set(tx.to!, currentCount + 1);
    }
    return acc;
  }, new Map<string, number>());

  const interactions: SignerProfile['interactions'] = [];
  interactionCounts.forEach((count, address) => {
    interactions.push({ address, count });
  })

  const contractsDeployed = outTransactions.filter((tx) => tx.to === undefined).length;

  const account: SignerProfile['account'] = {
    ageDays: (lastTransaction.getTime() - firstTransaction.getTime()) / millisecondsPerDay,
  }

  return {
    account,
    transactions: txs,
    tokens,
    interactions: interactions.sort((a, b) => b.count - a.count),
    contractsDeployed
  };
}
