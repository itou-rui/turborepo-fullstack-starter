import fs from 'fs';
import path from 'path';
import { CrittersError } from './errors';

/**
 * Recursively retrieves all files from a given directory.
 *
 * @param {string} dir - The directory to search for files.
 * @param {string[]} [files=[]] - An array to accumulate the file paths.
 * @returns {string[]} An array of file paths.
 */
export function getFiles(dir: string, files: string[] = []): string[] {
  try {
    const fileList = fs.readdirSync(dir);

    for (const file of fileList) {
      const name = path.join(dir, file);

      if (fs.statSync(name).isDirectory()) {
        getFiles(name, files);
      } else {
        files.push(name);
      }
    }
    return files;
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw CrittersError.toCrittersError('GetFiles', 'CONVERTED_FROM_ERROR', {
        error: e,
      });
    }

    throw CrittersError.toCrittersError('GetFiles', 'CONVERTED_FROM_UNKNOW_ERROR', {
      error: e,
      message: 'An unknown Node.js error was converted to CrittersError.',
    });
  }
}
