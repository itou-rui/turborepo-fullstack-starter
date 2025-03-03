/**
 * For security reasons, credentials is set to the default value (“same-origin”) except in the local environment.
 * @see https://developer.mozilla.org/ja/docs/Web/API/Request/credentials
 */
export function buildCredentials(credentials?: Request['credentials']): Request['credentials'] | undefined {
  if (process.env.NODE_ENV !== 'development') {
    return undefined;
  }

  return credentials;
}
