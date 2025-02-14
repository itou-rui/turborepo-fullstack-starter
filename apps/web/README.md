# README

## InlineCSS

> [!WARNING]
> This feature caches styles on a per-page basis. Per-theme caching is not supported.

### Add File

```sh
cd apps/web
mkdir critters
echo "[]" > processedRoutes.json
```

### [package.json](./package.json)

1. Modify the start command as follows

```json
"start": "CRITTERS_RUNTIME=1 NODE_ENV=production node server",
```

2. Add a dependency

```json
"dependencies": {
  "@workspace/critters": "*"
}
```

### [next.config.ts](./next.config.ts)

1. Add the following to the top level of the file

```ts
import { writeFileSync } from 'fs';
import { join } from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { processHTMLFile, getFiles } from '@workspace/critters';

class CrittersPlugin {
  apply(compiler) {
    compiler.hooks.done.tapAsync('CrittersPlugin', async (stats, callback) => {
      if (process.env.NODE_ENV === 'production') {
        console.time('Critters: build job');

        const currentFolder = join(process.cwd(), '.next');
        const files = getFiles(currentFolder);
        const processedRoutes = [];

        for (const file of files) {
          if (file.endsWith('.html')) {
            const pagesFolder = file.split('.next/server/pages')[1];
            if (pagesFolder) {
              await processHTMLFile(file, pagesFolder).catch((e) => {
                console.error('[Warning][PageFolder]: ' + e.message);
              });

              processedRoutes.push(pagesFolder.replace('.html', '').replace('index', ''));
            }

            const appFolder = file.split('.next/server/app')[1];
            if (appFolder) {
              await processHTMLFile(file, appFolder).catch((e) => {
                console.error('[Warning][AppFolder]: ' + e.message);
              });

              processedRoutes.push(appFolder.replace('.html', '').replace('index', ''));
            }
          }
        }

        writeFileSync(join(process.cwd(), 'processedRoutes.json'), JSON.stringify(processedRoutes));

        console.timeEnd('Critters: build job');
      }
      callback();
    });
  }
}
```

2. Configure webpack

```ts
webpack: (config, { isServer }) => {
  config.plugins.push(
    new CopyWebpackPlugin({
      patterns: [{ from: 'styles', to: 'static/css' }]
    })
  );

  config.plugins.push(new CrittersPlugin());

  return config;
},
```

3. Configure experimental

```ts
experimental: {
  optimizeCss: true,
},
```

### Middleware

1. Add the following middleware

```ts
// ./src/middlewares/addCustomHeader.ts
import { type NextFetchEvent, type NextMiddleware, NextRequest, NextResponse } from 'next/server';

/**
 * Middleware to add custom headers to the request.
 *
 * @param middleware - The next middleware function.
 * @returns A function that handles the request and adds custom headers.
 */
export function addCustomHeader(middleware: NextMiddleware): NextMiddleware {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-pathname', request.nextUrl.pathname);
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  };
}
```

2. [middlewares/index.ts](./src/middlewares/index.ts)

```ts
export * from './addCustomHeader';
```

3. [middleware.ts](./src/middleware.ts)

```ts
import { chain, addCustomHeader } from './middlewares';

export default chain([
  addCustomHeader, // Execute at the end
]);
```

### [Layout.ts](./src/app/layout.tsx)

1. Add the following to the top level of the file

```ts
import { join } from 'path';
import fs from 'fs';
import { headers } from 'next/headers';

/**
 * Get the paths to the CSS files based on the page.
 * @param {string | null} page - The current page path.
 * @returns {string[]} - An array of CSS file paths.
 */
function getCSSPaths(page: string | null): string[] {
  const basePath = join('/_next', 'static', 'css');
  const globalCSS = join(basePath, 'globals.css');
  if (page?.startsWith('/dynamic')) {
    return [join(basePath, 'dynamic.css'), globalCSS];
  }
  return [globalCSS];
}

/**
 * Get the critical CSS for the given page.
 * @param {string | null} page - The current page path.
 * @returns {Promise<JSX.Element | false>} - A promise that resolves to a style element with the critical CSS or false if not found.
 */
async function getCriticalCSS(page: string | null): Promise<JSX.Element | false> {
  if (!page) return false;

  const withoutQuery = page.split('?')[0];
  const cssPath = join(process.cwd(), 'critters', withoutQuery, 'styles.css');

  try {
    const cssContent = await fs.promises.readFile(cssPath, 'utf-8');
    return <style dangerouslySetInnerHTML={{ __html: cssContent }} />;
  } catch {
    return false;
  }
}
```

2. Modify the `RootLayout` as follows

```ts
export default async function RootLayout(props: LayoutProps): Promise<JSX.Element> {
  const headersList = headers();
  const pathName = (await headersList).get('x-pathname');
  const criticalCSS = await getCriticalCSS(pathName);
  const isCriticalCSSMode = process.env.CRITTERS_RUNTIME && criticalCSS;
  const cssLinks = getCSSPaths(pathName).map((link) => <link key={link} rel='stylesheet' href={link} />);

  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        {isCriticalCSSMode ? criticalCSS : cssLinks}
      </head>
      <body className={`${fontSans.variable} ${fontMono.variable} font-sans`}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <ReduxProvider>
            {props.children}
            {isCriticalCSSMode && cssLinks}
            <Toaster />
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### Custom Server

1. add the following to the top level of the file

```js
// ./server.js

/* eslint-disable turbo/no-undeclared-env-vars */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */

const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const zlib = require('zlib');
const { join } = require('path');
const { processHTMLFile } = require('@workspace/critters');

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || (dev ? '3000' : '8080');
const hostname = process.env.HOSTNAME || (dev ? 'localhost' : '0.0.0.0');
const app = next({ dev, port, hostname });
const handle = app.getRequestHandler();
const DIR = 'critters';
const processedRoutes = new Set();
const routes = {};
const cachingTime = 5 * 60 * 1000;

try {
  console.time('Critters: runtime prepare');

  fs.rmSync(DIR, { recursive: true, force: true });

  fs.cpSync('pages', DIR, {
    recursive: true,
    filter: function (source) {
      if (source.includes('.')) {
        return false;
      }
      return true;
    },
  });

  const processedHTMLFiles = fs.readFileSync(join(process.cwd(), 'processedRoutes.json'), 'utf-8');

  JSON.parse(processedHTMLFiles).forEach((file) => processedRoutes.add(file));

  console.timeEnd('Critters: runtime prepare');
} catch (error) {
  console.error('Critters preparation error:', error);
}

async function saveStylesToFile(html, path) {
  try {
    const folder = DIR + path;
    const styles = await processHTMLFile(path, html, 'SSR');

    fs.mkdirSync(folder, { recursive: true });

    const filePath = join(folder, 'styles.css');

    await fs.promises.writeFile(filePath, styles);
    console.log('styles saved to file:', filePath);
    console.timeEnd('Critters: runtime');
  } catch (error) {
    console.error('Error in saveStylesToFile:', error);
  }
}

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const pathname = parsedUrl.pathname;

    if (!processedRoutes.has(pathname) || Date.now() - routes[pathname] > cachingTime) {
      const originalWrite = res.write;
      const chunks = [];

      res.write = function (chunk) {
        if (res.statusCode === 200 && res.getHeader('content-type')?.includes('text/html')) {
          chunks.push(chunk);
        }
        originalWrite.apply(res, arguments);
        return true;
      };

      res.on('finish', () => {
        if (res.statusCode === 200 && res.getHeader('content-type')?.includes('text/html')) {
          processedRoutes.add(pathname);

          setTimeout(() => {
            console.time('Critters: runtime');

            const html = Buffer.concat(chunks);

            const contentEncoding = res.getHeader('content-encoding');
            if (contentEncoding === 'gzip') {
              zlib.unzip(html, (err, decompressedData) => {
                if (err) {
                  console.error('Error decompressing data:', err, {
                    contentEncoding,
                    dataLength: html.length,
                  });
                  return;
                }
                saveStylesToFile(decompressedData.toString(), pathname);
                routes[pathname] = Date.now();
              });
            }

            // Direct processing if not compressed
            else {
              saveStylesToFile(html.toString(), pathname);
              routes[pathname] = Date.now();
            }
          }, 0);
        }
      });
    }

    handle(req, res, parsedUrl);
  }).listen(port, hostname, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
```
