import {
  BlockField,
  HypersyncClient,
  Query,
  TransactionField,
  TransactionSelection,
} from '@envio-dev/hypersync-client'
import { getAddress } from 'viem'
import { ProfileData, Transaction } from '../../types'

export async function getTransactions({
  address,
  startBlock = 0,
}: {
  address: string
  startBlock: number
}): Promise<ProfileData> {
  const transactionQuery: TransactionSelection[] = [
    {
      from: [address],
    },
    {
      to: [address],
    },
  ]

  // https://docs.envio.dev/docs/HyperSync/hypersync-supported-networks
  const network = 'base'
  console.log('network', network)
  const client = HypersyncClient.new({
    url: `https://${network}.hypersync.xyz`,
  })

  let nextBlock: number | undefined = startBlock
  const allTransactions: Transaction[] = []

  console.log(`Build profile for ${address} from block ${nextBlock}`)
  while (nextBlock !== undefined) {
    const query: Query = {
      fromBlock: Number(nextBlock),
      transactions: transactionQuery,
      fieldSelection: {
        block: [BlockField.Number, BlockField.Timestamp],
        transaction: [
          TransactionField.BlockNumber,
          TransactionField.Hash,
          TransactionField.From,
          TransactionField.To,
          TransactionField.Value,
          TransactionField.Input,
          TransactionField.Nonce,
          TransactionField.GasPrice,
          TransactionField.GasUsed,
          TransactionField.ContractAddress,
        ],
      },
    }

    const result = await client.get(query)

    const blocks = result.data.blocks
    const partialTransactions = result.data.transactions

    const formattedPartialTransactions: Transaction[] = partialTransactions.map((tx) => ({
      blockNumber: tx.blockNumber!,
      timestamp: blocks.find((b) => tx.blockNumber === b.number)?.timestamp!,
      nonce: Number(tx.nonce),
      from: tx.from ? getAddress(tx.from) : undefined,
      to: tx.to ? getAddress(tx.to) : undefined,
      value: tx.value?.toString() || '0',
      data: tx.input || '0x',
      gasUsed: tx.gasUsed?.toString() || '0',
      gasPrice: tx.gasPrice?.toString() || '0',
      contractAddress: tx.contractAddress,
    }))

    allTransactions.push(...formattedPartialTransactions)
    nextBlock =
      result.archiveHeight && result.nextBlock > result.archiveHeight ? undefined : result.nextBlock
  }
  console.log(`Built profile for ${address} with ${allTransactions.length} transactions`)

  const lastTransaction = allTransactions[allTransactions.length - 1]
  return {
    transactions: allTransactions,
    lastBlockNumber: lastTransaction?.blockNumber || 0,
    lastBlockTimestamp: lastTransaction ? new Date(lastTransaction.timestamp * 1000) : new Date(),
  }
}
