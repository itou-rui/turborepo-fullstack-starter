import { Injectable } from '@nestjs/common';
import { type DiscordErrorData } from 'discord.js';
import { DiscordAPIErrorException, MaximumRetryAttemptsExceededException } from 'utils/exceptions';

/**
 * Service for interacting with the Discord API.
 */
@Injectable()
export class DiscordService {
  constructor() {}

  /**
   * Waits for a specified amount of time.
   * @param ms - The number of milliseconds to wait.
   * @returns A promise that resolves after the specified time.
   */
  private async wait(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Makes an HTTP request to the Discord API with retry logic.
   * @param url - The endpoint URL.
   * @param options - The request options.
   * @param retryCount - The current retry attempt count.
   * @returns The response data as a generic type.
   * @throws {MaximumRetryAttemptsExceededException} if retries exceed the limit.
   * @throws {DiscordAPIErrorException} for Discord API errors.
   */
  async http<T>(url: string, options?: RequestInit, retryCount = 0): Promise<T> {
    const MAX_RETRIES = 3;
    const INITIAL_RETRY_DELAY = 1000;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
        ...options?.headers,
      },
      ...options,
    });

    if (response.ok && response.status === 204) {
      return null as T;
    }

    if (response.ok) {
      return (await response.json()) as T;
    }

    if (response.status === 429) {
      const errors = (await response.json()) as { retry_after: number; message: string; global: boolean };

      if (retryCount >= MAX_RETRIES) {
        throw new MaximumRetryAttemptsExceededException(url, retryCount);
      }

      const retryAfterHeader = response.headers.get('Retry-After');
      const retryAfter = retryAfterHeader ? Number(retryAfterHeader) : errors.retry_after;

      const backoffDelay = INITIAL_RETRY_DELAY * Math.pow(2, retryCount);
      const waitTime = retryAfter * 1000 + backoffDelay;

      await this.wait(waitTime);
      return this.http<T>(url, options, retryCount + 1);
    }

    const { code, message, errors } = (await response.json()) as DiscordErrorData;
    throw new DiscordAPIErrorException(code, message, response.status, errors);
  }

  /**
   * Sends a GET request to the Discord API.
   * @param url - The endpoint URL.
   * @param options - The request options.
   * @returns The response data as a generic type.
   */
  async get<T>(url: string, options?: RequestInit): Promise<T> {
    return this.http<T>(url, {
      ...options,
      method: 'GET',
    });
  }

  /**
   * Sends a POST request to the Discord API.
   * @param url - The endpoint URL.
   * @param body - The request body.
   * @param options - The request options.
   * @returns The response data as a generic type.
   */
  async post<T, R>(url: string, body: T, options?: RequestInit): Promise<R> {
    return this.http<R>(url, {
      ...options,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: JSON.stringify(body),
    });
  }

  /**
   * Sends a PUT request to the Discord API.
   * @param url - The endpoint URL.
   * @param body - The request body.
   * @param options - The request options.
   * @returns The response data as a generic type.
   */
  async put<T, R>(url: string, body: T, options?: RequestInit): Promise<R> {
    return this.http<R>(url, {
      ...options,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: JSON.stringify(body),
    });
  }

  /**
   * Sends a PATCH request to the Discord API.
   * @param url - The endpoint URL.
   * @param body - The request body.
   * @param options - The request options.
   * @returns The response data as a generic type.
   */
  async patch<T, R>(url: string, body: T, options?: RequestInit): Promise<R> {
    return this.http<R>(url, {
      ...options,
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: JSON.stringify(body),
    });
  }

  /**
   * Sends a DELETE request to the Discord API.
   * @param url - The endpoint URL.
   * @param options - The request options.
   * @returns The response data as a generic type.
   */
  async delete<T>(url: string, options?: RequestInit): Promise<T> {
    return this.http<T>(url, {
      ...options,
      method: 'DELETE',
      ...options?.headers,
    });
  }
}
