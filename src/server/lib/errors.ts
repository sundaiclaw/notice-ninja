export class AppError extends Error {
  statusCode: number;
  expose: boolean;
  details?: unknown;

  constructor(message: string, statusCode = 500, options?: { expose?: boolean; details?: unknown }) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.expose = options?.expose ?? statusCode < 500;
    this.details = options?.details;
  }
}

export class BadRequestError extends AppError {
  constructor(message: string, details?: unknown) {
    super(message, 400, { expose: true, details });
  }
}

export class ConfigError extends AppError {
  constructor(message: string, details?: unknown) {
    super(message, 503, { expose: true, details });
  }
}

export class UpstreamServiceError extends AppError {
  constructor(message: string, details?: unknown) {
    super(message, 502, { expose: true, details });
  }
}

export class ResponseParseError extends AppError {
  constructor(message: string, details?: unknown) {
    super(message, 502, { expose: true, details });
  }
}

export function toErrorResponse(error: unknown) {
  if (error instanceof AppError) {
    return {
      statusCode: error.statusCode,
      body: {
        error: {
          message: error.message,
          details: error.details
        }
      }
    };
  }

  return {
    statusCode: 500,
    body: {
      error: {
        message: 'Unexpected server error.'
      }
    }
  };
}
