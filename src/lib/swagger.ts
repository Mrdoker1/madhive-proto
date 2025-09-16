// OpenAPI specification for the API
export const apiSpec = {
  openapi: '3.0.0',
  info: {
    title: 'MadHive Proto API',
    version: '1.0.0',
    description: 'API documentation for MadHive Proto application',
  },
  servers: [
    {
      url: '/api',
      description: 'Development server',
    },
  ],
  paths: {
    '/status': {
      get: {
        summary: 'Get server status',
        description: 'Returns the current status of the server',
        responses: {
          '200': {
            description: 'Server status information',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'string',
                      enum: ['online', 'offline', 'maintenance'],
                    },
                    uptime: {
                      type: 'number',
                      description: 'Server uptime in seconds',
                    },
                    version: {
                      type: 'string',
                    },
                    timestamp: {
                      type: 'string',
                      format: 'date-time',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};