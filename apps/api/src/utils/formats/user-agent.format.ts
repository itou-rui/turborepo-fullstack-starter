/**
 * Extract browser name and version from user agent string
 * @param userAgent User agent string from request header
 * @returns Formatted browser identifier (e.g., "Chrome/133", "Safari/17", "Firefox/120")
 */
export function formatUserAgent(userAgent?: string): string {
  if (!userAgent) return 'Unknown';

  // Common browser patterns
  const patterns = [
    // Browsers
    { regex: /Chrome\/(\d+)/, name: 'Chrome' },
    { regex: /Firefox\/(\d+)/, name: 'Firefox' },
    { regex: /Safari\/(\d+)/, name: 'Safari' },
    { regex: /Edge\/(\d+)/, name: 'Edge' },
    { regex: /OPR\/(\d+)/, name: 'Opera' },

    // Programming Languages & Tools
    { regex: /python-requests\/(\d+)/, name: 'Python-Requests' },
    { regex: /Python\/(\d+)/, name: 'Python' },
    { regex: /curl\/(\d+)/, name: 'Curl' },
    { regex: /PostmanRuntime\/(\d+)/, name: 'Postman' },
    { regex: /axios\/(\d+)/, name: 'Axios' },
    { regex: /node-fetch\/(\d+)/, name: 'Node-Fetch' },
    { regex: /insomnia\/(\d+)/, name: 'Insomnia' },

    // Bots
    { regex: /Googlebot\/(\d+)/, name: 'Googlebot' },
    { regex: /bingbot\/(\d+)/, name: 'Bingbot' },
    { regex: /Twitterbot\/(\d+)/, name: 'Twitterbot' },
  ];

  for (const { regex, name } of patterns) {
    const match = userAgent.match(regex);
    if (match) {
      return `${name} ${match[1]}`;
    }
  }

  // Fallback to first part of user agent
  return userAgent.split(' ')[0];
}
