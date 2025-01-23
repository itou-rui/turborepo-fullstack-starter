const CONVERTED_FROM_ERROR = {
  name: 'CONVERTED_FROM_ERROR',
  category: 'GetFiles',
  message: {
    en: 'A Node.js Error was converted to WebError.',
    ja: 'Node.jsのErrorがWebErrorに変換されました。',
  },
} as const;

const CONVERTED_FROM_UNKNOW_ERROR = {
  name: 'CONVERTED_FROM_UNKNOW_ERROR',
  category: 'GetFiles',
  message: {
    en: 'An unknown Node.js error was converted to WebError.',
    ja: 'Node.jsの不明なエラーがWebErrorに変換されました。',
  },
} as const;

export const GET_FILES_ERRORS = {
  CONVERTED_FROM_ERROR,
  CONVERTED_FROM_UNKNOW_ERROR,
};

export type GetFilesErrorCategory = (typeof GET_FILES_ERRORS)[keyof typeof GET_FILES_ERRORS]['category'];

export type GetFilesErrorName = (typeof GET_FILES_ERRORS)[keyof typeof GET_FILES_ERRORS]['name'];
