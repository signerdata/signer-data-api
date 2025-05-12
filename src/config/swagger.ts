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
        Signer: {
          type: 'object',
          description: 'Onchain profile of a signer',
          // required: [],
          properties: {
            address: {
              type: 'string',
              description: 'The address of the signer',
              example: '0x1234567890123456789012345678901234567890',
            },
            profile: {
              type: 'object',
              description: 'The onchain profile of the signer',
              properties: {
                transactions: {
                  type: 'object',
                  description: 'The transactions executed by the signer',
                  properties: {
                    firstTransactionDate: {
                      type: 'string',
                      description: 'The date of the first transaction',
                      format: 'date-time',
                      example: '2024-01-01T00:00:00Z',
                    },
                    lastTransactionDate: {
                      type: 'string',
                      description: 'The date of the last transaction',
                      format: 'date-time',
                      example: '2024-03-15T00:00:00Z',
                    },
                    frequency: {
                      type: 'number',
                      description: 'The frequency of the transactions executed by the signer',
                      example: 5,
                    },
                    count: {
                      type: 'number',
                      description: 'The number of transactions executed by the signer',
                      example: 100,
                    },
                  },
                },
                tokens: {
                  type: 'array',
                  description: 'The tokens used by the signer',
                  items: {
                    type: 'object',
                    description: 'A token used by the signer',
                    properties: {
                      address: {
                        type: 'string',
                        description: 'The address of the token',
                        example: '0x1234567890123456789012345678901234567890',
                      },
                      balance: {
                        type: 'string',
                        description: "The balance of the token in the signer's wallet",
                        example: '1000000000000000000',
                      },
                      volume: {
                        type: 'string',
                        description: 'The volume of the token processed by the signer',
                        example: '5000000000000000000',
                      },
                      volumeIn: {
                        type: 'string',
                        description: 'The incoming volume of the token processed by the signer',
                        example: '3000000000000000000',
                      },
                      volumeOut: {
                        type: 'string',
                        description: 'The outgoing volume of the token processed by the signer',
                        example: '2000000000000000000',
                      },
                    },
                  },
                },
                interactions: {
                  type: 'array',
                  description: 'The contracts called by the signer',
                  items: {
                    type: 'object',
                    description: 'A contract called by the signer',
                    properties: {
                      address: {
                        type: 'string',
                        description: 'The address of the contract',
                        example: '0x1234567890123456789012345678901234567890',
                      },
                      count: {
                        type: 'number',
                        description: 'The number of calls to the contract by the signer',
                        example: 10,
                      },
                    },
                  },
                },
                contractDeployments: {
                  type: 'array',
                  description: 'The contracts deployed by the signer',
                  items: {
                    type: 'string',
                    description: 'The address of the contract deployed by the signer',
                    example: '0x1234567890123456789012345678901234567890',
                  },
                },
              },
            },
            createdAt: {
              type: 'string',
              description: 'The date of creation of the signer profile',
              format: 'date-time',
              example: '2024-01-01T00:00:00Z',
            },
            updatedAt: {
              type: 'string',
              description: 'The date of the last update of the signer profile',
              format: 'date-time',
              example: '2024-03-15T00:00:00Z',
            },
          },
        },
        ProfileLogin: {
          type: 'object',
          description: 'Login and onchain profile of a signer',
          properties: {
            applicationId: {
              type: 'number',
              description: 'The application id',
              example: 1,
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
              example: '2024-01-01T00:00:00Z',
            },
            count: {
              type: 'number',
              description: 'The count of logins for the signer on the application on the date.',
              example: 3,
            },
            profile: {
              type: 'object',
              description: 'The onchain profile of the signer',
              properties: {
                transactions: {
                  type: 'object',
                  description: 'The transactions executed by the signer',
                  properties: {
                    firstTransactionDate: {
                      type: 'string',
                      description: 'The date of the first transaction',
                      format: 'date-time',
                      example: '2024-01-01T00:00:00Z',
                    },
                    lastTransactionDate: {
                      type: 'string',
                      description: 'The date of the last transaction',
                      format: 'date-time',
                      example: '2024-03-15T00:00:00Z',
                    },
                    frequency: {
                      type: 'number',
                      description: 'The frequency of the transactions executed by the signer',
                      example: 5,
                    },
                    count: {
                      type: 'number',
                      description: 'The number of transactions executed by the signer',
                      example: 100,
                    },
                  },
                },
                tokens: {
                  type: 'array',
                  description: 'The tokens used by the signer',
                  items: {
                    type: 'object',
                    description: 'A token used by the signer',
                    properties: {
                      address: {
                        type: 'string',
                        description: 'The address of the token',
                        example: '0x1234567890123456789012345678901234567890',
                      },
                      balance: {
                        type: 'string',
                        description: "The balance of the token in the signer's wallet",
                        example: '1000000000000000000',
                      },
                      volume: {
                        type: 'string',
                        description: 'The volume of the token processed by the signer',
                        example: '5000000000000000000',
                      },
                      volumeIn: {
                        type: 'string',
                        description: 'The incoming volume of the token processed by the signer',
                        example: '3000000000000000000',
                      },
                      volumeOut: {
                        type: 'string',
                        description: 'The outgoing volume of the token processed by the signer',
                        example: '2000000000000000000',
                      },
                    },
                  },
                },
                interactions: {
                  type: 'array',
                  description: 'The contracts called by the signer',
                  items: {
                    type: 'object',
                    description: 'A contract called by the signer',
                    properties: {
                      address: {
                        type: 'string',
                        description: 'The address of the contract',
                        example: '0x1234567890123456789012345678901234567890',
                      },
                      count: {
                        type: 'number',
                        description: 'The number of calls to the contract by the signer',
                        example: 10,
                      },
                    },
                  },
                },
                contractDeployments: {
                  type: 'array',
                  description: 'The contracts deployed by the signer',
                  items: {
                    type: 'string',
                    description: 'The address of the contract deployed by the signer',
                    example: '0x1234567890123456789012345678901234567890',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
}
