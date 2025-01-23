const CONVERTED_FROM_ERROR = {
  name: 'CONVERTED_FROM_ERROR',
  category: 'ProcessHTMLFile',
  message: {
    en: 'A Node.js Error was converted to Critters.',
    ja: 'Node.jsのErrorがCrittersErrorに変換されました。',
  },
} as const;

const CONVERTED_FROM_UNKNOW_ERROR = {
  name: 'CONVERTED_FROM_UNKNOW_ERROR',
  category: 'ProcessHTMLFile',
  message: {
    en: 'An unknown Node.js error was converted to CrittersError.',
    ja: 'Node.jsの不明なエラーがCrittersErrorに変換されました。',
  },
} as const;

const FAILED_WRITE_FILE = {
  name: 'FAILED_WRITE_FILE',
  category: 'ProcessHTMLFile',
  message: {
    en: 'Failed to write HTML file.',
    ja: 'HTMLファイルの書き込みに失敗しました。',
  },
} as const;

export const PROCESS_HTML_FILE_ERRORS = {
  CONVERTED_FROM_ERROR,
  CONVERTED_FROM_UNKNOW_ERROR,
  FAILED_WRITE_FILE,
};

export type ProcessHTMLFileErrorCategory = (typeof PROCESS_HTML_FILE_ERRORS)[keyof typeof PROCESS_HTML_FILE_ERRORS]['category'];

export type ProcessHTMLFileErrorName = (typeof PROCESS_HTML_FILE_ERRORS)[keyof typeof PROCESS_HTML_FILE_ERRORS]['name'];
