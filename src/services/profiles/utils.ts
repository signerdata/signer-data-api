import { SignerProfile, Transaction } from '../../types';

export function calculateFullProfile({
  transactions,
  address
} : {
  transactions: Transaction[],
  address: string
}): SignerProfile {
  if (transactions.length === 0) {
    return {
      account: {
        ageDays: 0
      },
      transactions: {
        all: {
          countAll: 0,
          count30d: 0,
          count7d: 0,
          frequencyAll: 0,
          frequency30d: 0,
          frequency7d: 0,
          // firstTransaction: undefined,
          // lastTransaction: undefined,
          spanDays: 0,
          activeDaysCount: 0
        },
        in: {
          countAll: 0,
          count30d: 0,
          count7d: 0,
          frequencyAll: 0,
          frequency30d: 0,
          frequency7d: 0,
          // firstTransaction: undefined,
          // lastTransaction: undefined,
          spanDays: 0,
          activeDaysCount: 0
        },
        out: {
          countAll: 0,
          count30d: 0,
          count7d: 0,
          frequencyAll: 0,
          frequency30d: 0,
          frequency7d: 0,
          // firstTransaction: undefined,
          // lastTransaction: undefined,
          spanDays: 0,
          activeDaysCount: 0
        }
      },
      tokens: [],
      interactions: [],
      contractsDeployed: 0
    };
  }

  const inTransactions = transactions.filter((tx) => tx.to === address);
  console.log(inTransactions.length);
  const outTransactions = transactions.filter((tx) => tx.from === address);
  console.log(outTransactions.length);

  const firstOutTransaction = outTransactions.length > 0 ? new Date(outTransactions[0].timestamp * 1000) : undefined;
  const lastOutTransaction = outTransactions.length > 0 ? new Date(outTransactions[outTransactions.length - 1].timestamp * 1000) : undefined;
  const firstInTransaction = inTransactions.length > 0 ? new Date(inTransactions[0].timestamp * 1000) : undefined;
  const lastInTransaction = inTransactions.length > 0 ? new Date(inTransactions[inTransactions.length - 1].timestamp * 1000) : undefined;

  // Frequency
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const daysPassed = firstOutTransaction && lastOutTransaction 
    ? (lastOutTransaction.getTime() - firstOutTransaction.getTime()) / millisecondsPerDay 
    : 0;
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
      firstTransaction: firstOutTransaction,
      lastTransaction: lastOutTransaction,
      frequencyAll: frequency,
      frequency30d: frequencyLastMonth,
      frequency7d: frequencyLastWeek,
      countAll: transactions.length,
      count30d: transactionsLastMonth.length,
      count7d: transactionsLastWeek.length,
      spanDays: daysPassed,
      activeDaysCount: transactions.length
    },
    in: {
      firstTransaction: firstInTransaction,
      lastTransaction: lastInTransaction,





      // TODO: 0x5180db8f5c931aae63c74266b211f580155ecac8 retuns null. Also check daysPassed != 0
      frequencyAll: inTransactions.length > 0 ? inTransactions.length / daysPassed : 0, 







      frequency30d: inTransactions.filter((tx) => tx.timestamp > thirtyDaysAgo).length / 30,
      frequency7d: inTransactions.filter((tx) => tx.timestamp > sevenDaysAgo).length / 7,
      countAll: inTransactions.length,
      count30d: inTransactions.filter((tx) => tx.timestamp > thirtyDaysAgo).length,
      count7d: inTransactions.filter((tx) => tx.timestamp > sevenDaysAgo).length,
      spanDays: firstInTransaction && lastInTransaction 
        ? (lastInTransaction.getTime() - firstInTransaction.getTime()) / millisecondsPerDay 
        : 0,
      activeDaysCount: inTransactions.length
    },
    out: {
      firstTransaction: firstOutTransaction,
      lastTransaction: lastOutTransaction,
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
    ageDays: firstOutTransaction && lastOutTransaction 
      ? (lastOutTransaction.getTime() - firstOutTransaction.getTime()) / millisecondsPerDay 
      : 0
  }

  return {
    account,
    transactions: txs,
    tokens,
    interactions: interactions.sort((a, b) => b.count - a.count),
    contractsDeployed
  };
}
