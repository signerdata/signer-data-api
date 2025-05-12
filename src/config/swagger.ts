import { version } from '../../package.json'

export const swaggerOptions = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'SignerData API',
      version,
      description: 'SignerData API documentation',
    },
    components: {
      schemas: {
        SignerProfile: {
          type: 'object',
          description: 'The onchain profile of the signer',
          properties: {
            account: {
              type: 'object',
              description: 'Account information',
              properties: {
                ageDays: {
                  type: 'number',
                  description: 'Number of days since the account was created',
                  example: 365,
                },
              },
            },
            transactions: {
              type: 'object',
              description: 'Transaction statistics for the signer',
              properties: {
                all: {
                  type: 'object',
                  description: 'Statistics for all transactions',
                  properties: {
                    countAll: {
                      type: 'number',
                      description: 'Total number of transactions',
                      example: 100,
                    },
                    count30d: {
                      type: 'number',
                      description: 'Number of transactions in the last 30 days',
                      example: 10,
                    },
                    count7d: {
                      type: 'number',
                      description: 'Number of transactions in the last 7 days',
                      example: 3,
                    },
                    frequencyAll: {
                      type: 'number',
                      description: 'Average number of transactions per day since account creation',
                      example: 0.27,
                    },
                    frequency30d: {
                      type: 'number',
                      description: 'Average number of transactions per day in the last 30 days',
                      example: 0.33,
                    },
                    frequency7d: {
                      type: 'number',
                      description: 'Average number of transactions per day in the last 7 days',
                      example: 0.43,
                    },
                    firstTransaction: {
                      type: 'string',
                      format: 'date-time',
                      description: 'Date of the first transaction',
                      example: '2025-01-01T00:00:00Z',
                      nullable: true,
                    },
                    lastTransaction: {
                      type: 'string',
                      format: 'date-time',
                      description: 'Date of the most recent transaction',
                      example: '2025-03-15T00:00:00Z',
                      nullable: true,
                    },
                    spanDays: {
                      type: 'number',
                      description: 'Number of days between first and last transaction',
                      example: 365,
                    },
                    activeDaysCount: {
                      type: 'number',
                      description: 'Number of days with at least one transaction',
                      example: 180,
                    },
                  },
                },
                in: {
                  type: 'object',
                  description: 'Statistics for incoming transactions',
                  properties: {
                    countAll: {
                      type: 'number',
                      description: 'Total number of incoming transactions',
                      example: 50,
                    },
                    count30d: {
                      type: 'number',
                      description: 'Number of incoming transactions in the last 30 days',
                      example: 5,
                    },
                    count7d: {
                      type: 'number',
                      description: 'Number of incoming transactions in the last 7 days',
                      example: 2,
                    },
                    frequencyAll: {
                      type: 'number',
                      description:
                        'Average number of incoming transactions per day since account creation',
                      example: 0.14,
                    },
                    frequency30d: {
                      type: 'number',
                      description:
                        'Average number of incoming transactions per day in the last 30 days',
                      example: 0.17,
                    },
                    frequency7d: {
                      type: 'number',
                      description:
                        'Average number of incoming transactions per day in the last 7 days',
                      example: 0.29,
                    },
                    firstTransaction: {
                      type: 'string',
                      format: 'date-time',
                      description: 'Date of the first incoming transaction',
                      example: '2025-01-01T00:00:00Z',
                      nullable: true,
                    },
                    lastTransaction: {
                      type: 'string',
                      format: 'date-time',
                      description: 'Date of the most recent incoming transaction',
                      example: '2025-03-15T00:00:00Z',
                      nullable: true,
                    },
                    spanDays: {
                      type: 'number',
                      description: 'Number of days between first and last incoming transaction',
                      example: 365,
                    },
                    activeDaysCount: {
                      type: 'number',
                      description: 'Number of days with at least one incoming transaction',
                      example: 90,
                    },
                  },
                },
                out: {
                  type: 'object',
                  description: 'Statistics for outgoing transactions',
                  properties: {
                    countAll: {
                      type: 'number',
                      description: 'Total number of outgoing transactions',
                      example: 50,
                    },
                    count30d: {
                      type: 'number',
                      description: 'Number of outgoing transactions in the last 30 days',
                      example: 5,
                    },
                    count7d: {
                      type: 'number',
                      description: 'Number of outgoing transactions in the last 7 days',
                      example: 1,
                    },
                    frequencyAll: {
                      type: 'number',
                      description:
                        'Average number of outgoing transactions per day since account creation',
                      example: 0.14,
                    },
                    frequency30d: {
                      type: 'number',
                      description:
                        'Average number of outgoing transactions per day in the last 30 days',
                      example: 0.17,
                    },
                    frequency7d: {
                      type: 'number',
                      description:
                        'Average number of outgoing transactions per day in the last 7 days',
                      example: 0.14,
                    },
                    firstTransaction: {
                      type: 'string',
                      format: 'date-time',
                      description: 'Date of the first outgoing transaction',
                      example: '2025-01-01T00:00:00Z',
                      nullable: true,
                    },
                    lastTransaction: {
                      type: 'string',
                      format: 'date-time',
                      description: 'Date of the most recent outgoing transaction',
                      example: '2025-03-15T00:00:00Z',
                      nullable: true,
                    },
                    spanDays: {
                      type: 'number',
                      description: 'Number of days between first and last outgoing transaction',
                      example: 365,
                    },
                    activeDaysCount: {
                      type: 'number',
                      description: 'Number of days with at least one outgoing transaction',
                      example: 90,
                    },
                  },
                },
              },
            },
            tokens: {
              type: 'array',
              description: 'List of tokens used by the signer',
              items: {
                type: 'object',
                properties: {
                  address: {
                    type: 'string',
                    description: 'Contract address of the token',
                    example: '0x1234567890123456789012345678901234567890',
                  },
                  volume: {
                    type: 'string',
                    description: 'Total volume of the token processed by the signer in wei',
                    example: '5000000000000000000',
                  },
                  volumeIn: {
                    type: 'string',
                    description: 'Total incoming volume of the token in wei',
                    example: '3000000000000000000',
                  },
                  volumeOut: {
                    type: 'string',
                    description: 'Total outgoing volume of the token in wei',
                    example: '2000000000000000000',
                  },
                },
              },
            },
            interactions: {
              type: 'array',
              description: 'List of contracts interacted with by the signer',
              items: {
                type: 'object',
                properties: {
                  address: {
                    type: 'string',
                    description: 'Contract address',
                    example: '0x1234567890123456789012345678901234567890',
                  },
                  count: {
                    type: 'number',
                    description: 'Number of interactions with the contract',
                    example: 10,
                  },
                },
              },
            },
            contractsDeployed: {
              type: 'number',
              description: 'Number of contracts deployed by the signer',
              example: 2,
            },
          },
        },
        ProfileLogin: {
          type: 'object',
          description: 'Login and onchain profile of a signer',
          properties: {
            applicationId: {
              type: 'string',
              description: 'The application id',
              example: '123e4567-e89b-12d3-a456-426614174000',
            },
            chainId: {
              type: 'number',
              description: 'The chain id',
              example: 1,
            },
            address: {
              type: 'string',
              description: 'The address of the signer',
              example: '0x1234567890123456789012345678901234567890',
            },
            date: {
              type: 'string',
              description: 'The date of the login',
              format: 'date-time',
              example: '2025-05-01T00:00:00Z',
            },
            count: {
              type: 'number',
              description: 'The count of logins for the signer on the application on the date.',
              example: 3,
            },
            transactionsCount: {
              type: 'number',
              description: 'Total number of transactions for this signer',
              example: 100,
            },
            blockNumber: {
              type: 'number',
              description: 'Last block number processed for this signer',
              example: 12345678,
            },
            blockTimestamp: {
              type: 'string',
              format: 'date-time',
              description: 'Timestamp of the last block processed for this signer',
              example: '2025-05-15T00:00:00Z',
            },
            profile: {
              $ref: '#/components/schemas/SignerProfile',
            },
          },
        },
        Application: {
          type: 'object',
          description: 'The application registered in the system',
          properties: {
            name: {
              type: 'string',
              description: 'Name of the application',
              example: 'My DApp'
            },
            description: {
              type: 'string',
              description: 'Optional description of the application',
              example: 'A decentralized application for managing digital assets',
              nullable: true
            },
            domain: {
              type: 'string',
              description: 'Domain where the application is hosted',
              example: 'mydapp.example.com'
            },
            active: {
              type: 'boolean',
              description: 'Whether the application is currently active',
              example: true
            }
          }
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
}
