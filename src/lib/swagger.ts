export const apiSpec = {
  openapi: "3.0.0",
  info: {
    title: "Madhive Proto API",
    description: "API endpoints for Madhive Proto application",
    version: "1.0.0",
    contact: {
      name: "Madhive Proto Team",
    },
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Development server",
    },
    {
      url: "https://your-domain.com",
      description: "Production server",
    },
  ],
  paths: {
    "/api/status": {
      get: {
        summary: "Get server status",
        description: "Retrieve current server status including uptime, memory usage, and system information",
        tags: ["Status"],
        responses: {
          "200": {
            description: "Server status retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    server: {
                      type: "string",
                      example: "online",
                      description: "Current server status",
                    },
                    timestamp: {
                      type: "string",
                      format: "date-time",
                      example: "2025-09-16T14:30:00.000Z",
                      description: "Current server timestamp",
                    },
                    uptime: {
                      type: "number",
                      example: 3600,
                      description: "Server uptime in seconds",
                    },
                    version: {
                      type: "string",
                      example: "1.0.0",
                      description: "Application version",
                    },
                    environment: {
                      type: "string",
                      example: "development",
                      description: "Current environment",
                    },
                    memory: {
                      type: "object",
                      properties: {
                        used: {
                          type: "number",
                          example: 45,
                          description: "Used memory in MB",
                        },
                        total: {
                          type: "number",
                          example: 128,
                          description: "Total memory in MB",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          "500": {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    server: {
                      type: "string",
                      example: "error",
                    },
                    message: {
                      type: "string",
                      example: "Failed to get server status",
                    },
                    timestamp: {
                      type: "string",
                      format: "date-time",
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
  tags: [
    {
      name: "Status",
      description: "Server status and monitoring endpoints",
    },
  ],
};