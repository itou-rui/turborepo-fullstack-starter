'use server';

import { cookies, headers } from 'next/headers';
import { ERROR_MESSAGES, NODE_ERROR_MESSAGES } from '@workspace/constants';
import { type LocalAuthProfile } from '@workspace/types';
import type { LibOptions } from '../../types';
import { fetcher, FetcherError, FETCH_ERROR_MESSAGES } from '../../fetcher';
import { logger } from '../../logger';
import { ApiError } from '../../errors';

export async function getSession<T = LocalAuthProfile>(options: LibOptions = { enableLogging: true }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('connect.sid');
  if (!token) return null;

  const headerStore = await headers();
  const userAgent = headerStore.get('user-agent');
  const path = `/api/internal/auth/local/me`;
  const logDetails = { method: 'GET', url: path, agent: userAgent };

  try {
    const response = await fetcher.get<T | null>('/api/internal/auth/local/me', {
      headers: {
        Cookie: `connect.sid=${token.value}`,
      },
      next: { revalidate: 5 },
    });

    if (response.ok) {
      if (options.enableLogging) {
        const sessionUser = response.data as T;
        logger('info', 'GetSession', { status: response.status, ...logDetails, context: { sessionUser } });
      }
      return response.data;
    }
  } catch (e: unknown) {
    const logError = (level: 'warn' | 'error', message: string, error: unknown, status = 500) => {
      if (options.enableLogging) {
        logger(level, 'GetSession', { status, message, ...logDetails, context: { error } });
      }
    };

    switch (true) {
      case e instanceof ApiError: {
        const level = e.status > 500 ? 'error' : 'warn';
        const message = ERROR_MESSAGES[e.code].log;
        logError(level, message, e, e.status);
        break;
      }
      case e instanceof FetcherError: {
        logError('error', FETCH_ERROR_MESSAGES[e.code].log, e);
        break;
      }
      case e instanceof Error: {
        logError('error', NODE_ERROR_MESSAGES.NodeError.log, e);
        break;
      }
      default: {
        logError('error', NODE_ERROR_MESSAGES.UnknownError.log, e);
        break;
      }
    }

    throw e;
  }
}
