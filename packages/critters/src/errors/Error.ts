import CRITTERS_ERRORS, { type CrittersErrorName, type CrittersErrorCategory, type CrittersErrorDetails } from './details';

/**
 * Represents an entry for a Critters error.
 */
export type CrittersErrorEntry = {
  error?: Error | unknown;
  [key: string]: any;
};

/**
 * Represents an object entry for a Critters error.
 */
export type CrittersErrorEntryObject = {
  error?: { name: string; message: string; stack?: string };
  [key: string]: any;
};

/**
 * Class representing a Critters error.
 *
 * @template T - The category of the error.
 */
export class CrittersError<T extends CrittersErrorCategory> extends Error {
  public readonly details: CrittersErrorDetails;
  public readonly entry?: CrittersErrorEntry;

  /**
   * Creates an instance of CrittersError.
   *
   * @param {T} category - The category of the error.
   * @param {CrittersErrorName<T>} errorName - The name of the error.
   * @param {string} message - The error message.
   * @param {CrittersErrorEntry} [entry] - Additional error entry details.
   */
  constructor(category: T, errorName: CrittersErrorName<T>, message: string, entry?: CrittersErrorEntry) {
    super(message);
    this.name = 'CritterError';
    this.entry = entry;

    let foundDetails: CrittersErrorDetails | undefined;
    for (const groupErrors of Object.values(CRITTERS_ERRORS)) {
      const details = Object.values(groupErrors).find((error) => error.category === category && error.name === errorName);
      if (details) {
        foundDetails = details;
        break;
      }
    }

    if (!foundDetails) {
      throw new Error(`Invalid error combination: ${category} - ${errorName}`);
    }

    this.details = foundDetails;
  }

  /**
   * Converts an error to a CrittersError instance.
   *
   * @template T - The category of the error.
   * @param {T} category - The category of the error.
   * @param {CrittersErrorName<T>} errorName - The name of the error.
   * @param {CrittersErrorEntry & { error: Error | unknown; message?: string }} entry - The error entry details.
   * @returns {CrittersError<T>} The CrittersError instance.
   */
  static toCrittersError<T extends CrittersErrorCategory>(
    category: T,
    errorName: CrittersErrorName<T>,
    entry: CrittersErrorEntry & { error: Error | unknown; message?: string },
  ): CrittersError<T> {
    if (entry.error instanceof CrittersError) {
      return entry.error;
    }

    if (entry.error instanceof Error) {
      return new CrittersError(category, errorName, entry.message || entry.error.message, entry);
    }

    return new CrittersError(category, errorName, entry.message || 'Exception occurred.', entry);
  }

  private processSpecialObjects(value: unknown): unknown {
    if (value === null || value === undefined) {
      return value;
    }

    if (value instanceof Date) {
      return {
        type: 'Date',
        value: value.toISOString(),
      };
    }

    if (value instanceof Error) {
      return this.processError(value);
    }

    if (Array.isArray(value)) {
      return value.map((item) => this.processSpecialObjects(item));
    }

    if (value && typeof value === 'object') {
      const constructor = Object.getPrototypeOf(value)?.constructor;
      if (constructor && constructor !== Object) {
        return {
          type: constructor.name,
          value: this.processSpecialObjects({ ...value }),
        };
      }

      const processed: Record<string, unknown> = {};
      for (const [key, val] of Object.entries(value)) {
        processed[key] = this.processSpecialObjects(val);
      }
      return processed;
    }

    return value;
  }

  private processError(error: Error | unknown): Record<string, any> {
    if (error instanceof CrittersError) {
      return {
        type: 'CrittersError',
        name: error.name,
        message: error.message,
        details: error.details,
      };
    }

    if (error instanceof Error) {
      return {
        type: 'Error',
        name: error.name,
        message: error.message,
        stack: error.stack,
      };
    }

    if (error && typeof error === 'object') {
      return {
        type: 'Object',
        value: this.processSpecialObjects(error),
      };
    }

    return {
      type: 'Unknown',
      value: typeof error === 'string' ? error : String(error),
    };
  }

  toObject() {
    return {
      name: this.name,
      message: this.message,
      details: this.details,
      entry: this.entry ? (this.processSpecialObjects(this.entry) as CrittersErrorEntryObject) : null,
      stack: this.stack,
    };
  }
}
