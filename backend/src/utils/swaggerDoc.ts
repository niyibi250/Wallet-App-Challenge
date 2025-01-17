export default {
    openapi: '3.0.0',
    info: {
      title: 'Wallet API',
      version: '1.0.0',
      description: 'API documentation for the wallet application',
    },
    paths: {
      '/transactions': {
        get: {
          summary: 'Get all transactions',
          responses: {
            '200': {
              description: 'List of transactions',
            },
          },
        },
      },
    },
  };
  