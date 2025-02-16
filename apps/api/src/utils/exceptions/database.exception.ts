import { HttpException, HttpStatus } from '@nestjs/common';

export class DatabaseException extends HttpException {
  constructor(operation: string) {
    super(
      {
        message: `Database operation failed: ${operation}`,
        error: 'DatabaseError',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
