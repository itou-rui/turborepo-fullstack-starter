import { NextStructuredLogger, type LogContext, type LogFormat } from '@workspace/logger';

type LoggerLevel = 'debug' | 'info' | 'log' | 'error' | 'warn' | 'fatal';

type LogDetails = {
  url: string;
  status: number;
  method: string;
  agent: string | null;
  message?: string;
  context?: LogContext;
};

const agents: string[] = [
  'Chrome',
  'Firefox',
  'Safari',
  'Edge',
  'OPR',
  'Python-Requests',
  'Python',
  'Curl',
  'Postman',
  'Axios',
  'Node-Fetch',
  'Insomnia',
  'Googlebot',
  'Bingbot',
  'Twitterbot',
] as const;

function formatUserAgent(userAgent: string | null) {
  if (!userAgent) return 'Unknown';
  for (const agent of agents) {
    const match = userAgent.match(new RegExp(`${agent}/(\\d+)`));
    if (match) {
      return `${agent} ${match[1]}`;
    }
  }
  return userAgent.split(' ')[0];
}

export function logger(level: LoggerLevel, name: string, details: LogDetails) {
  const logger = new NextStructuredLogger({ format: (process.env.LOG_FORMAT as LogFormat) || 'text', name });

  const { context, ...rest } = details;
  const shortUserAgent = formatUserAgent(rest.agent);

  logger[level](`${rest.method} ${rest.status} ${shortUserAgent} ${rest.url} ${rest.message || ''}`, context);
}
