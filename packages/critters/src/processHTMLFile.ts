import { join } from 'path';
import fs from 'fs';
import Critters from 'critters';
import { parse } from 'node-html-parser';
import { CrittersError } from './errors';

/**
 * Interface representing path patterns for CSS files.
 */
interface PathPatterns {
  real: string;
  original: string;
}

/**
 * Processes an HTML file by inlining critical CSS and optionally saving the result.
 *
 * @param {string} file - The path to the HTML file.
 * @param {string} htmlString - The HTML content as a string.
 * @param {string} [runtime] - The runtime environment ('ISR' or 'SSR').
 * @returns {Promise<string | undefined>} The inlined CSS as a string, or undefined if an error occurs.
 */
export async function processHTMLFile(file: string, htmlString: string, runtime?: string): Promise<string | undefined> {
  try {
    const critters = new Critters({});
    const html = htmlString || (file && fs.readFileSync(file, 'utf-8'));

    const pathPatterns: PathPatterns = {
      real: '/.next/static/css',
      original: '/_next/static/css',
    };

    const changedToRealPath = html.replace(new RegExp(pathPatterns.original, 'g'), pathPatterns.real);

    const inlined = await critters.process(changedToRealPath);

    const restoredNextJSPath = inlined.replace(new RegExp(pathPatterns.real, 'g'), pathPatterns.original);

    const DOMAfterCritters = parse(restoredNextJSPath);
    const head = DOMAfterCritters.querySelector('head');

    head?.querySelectorAll('link[rel="stylesheet"], link[as="style"]').forEach((link) => link.remove());

    /**
     * save HTML file in runtime, only for ISR
     * source: https://nextjs.org/docs/pages/building-your-application/data-fetching/incremental-static-regeneration
     */
    if (runtime === 'ISR') {
      const filePath = join(process.cwd(), '.next', 'server', 'pages', `${file}.html`);

      fs.writeFile(filePath, DOMAfterCritters.toString(), (err) => {
        if (err) {
          console.error(
            new CrittersError('ProcessHTMLFile', 'FAILED_WRITE_FILE', 'Failed save the html file.', {
              error: err,
            }).toObject(),
          );
        } else {
          console.log('The HTML file has been saved: ', filePath);
        }
      });

      // we don't save file in SSR
    } else if (runtime !== 'SSR') {
      fs.writeFileSync(file, DOMAfterCritters.toString());
    }

    return DOMAfterCritters.querySelector('style')?.text;
  } catch (e) {
    if (e instanceof Error) {
      throw CrittersError.toCrittersError('ProcessHTMLFile', 'CONVERTED_FROM_ERROR', {
        error: e,
        message: 'Error processing the HTML file.',
      });
    }

    throw CrittersError.toCrittersError('ProcessHTMLFile', 'CONVERTED_FROM_UNKNOW_ERROR', {
      error: e,
      message: 'Error processing the HTML file.',
    });
  }
}
