'use server';

import { type APISession } from '@workspace/types';
import { NextStructuredLogger, type LogFormat } from '@workspace/logger';
import * as fetcher from '../fetcher';

export async function get(revalidate = 30): Promise<APISession | null> {
  const logger = new NextStructuredLogger({
    name: 'GetSession',
    format: process.env.LOG_FORMAT as LogFormat,
  });

  try {
    const result = await fetcher.get<APISession>('/api/auth/session', {
      revalidate,
    });

    // 2xx
    if (result.ok === true) {
      logger.info(`GET /api/auth/session ${result.status} ${result.message}`);
      return result.data;
    }

    // 4xx, 5xx
    else {
      logger.error(`GET /api/auth/session ${result.status} ${result.message}`, {
        code: result.code,
        errors: result.errors,
      });
      return null;
    }
  } catch (e: unknown) {
    const entry = { error: e, sourceLocation: { file: 'index.ts', line: '11-14', function: 'getSession' } };

    if (e instanceof Error) {
      logger.error(`GET /api/auth/session ${e.message}`, entry);
    } else {
      logger.error(`GET /api/auth/session exception error`, entry);
    }
    return null;
  }
}
