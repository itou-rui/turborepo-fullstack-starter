import { GET_FILES_ERRORS, type GetFilesErrorName, type GetFilesErrorCategory } from './getFiles';
import { PROCESS_HTML_FILE_ERRORS, type ProcessHTMLFileErrorName, type ProcessHTMLFileErrorCategory } from './processHTMLFile';

const CRITTERS_ERRORS = {
  GET_FILES: GET_FILES_ERRORS,
  PROCESS_HTML_FILE: PROCESS_HTML_FILE_ERRORS,
} as const;

export type CrittersErrorGroups = keyof typeof CRITTERS_ERRORS;

export type CrittersErrorCategory = GetFilesErrorCategory | ProcessHTMLFileErrorCategory;

type ErrorMap = {
  GetFiles: GetFilesErrorName;
  ProcessHTMLFile: ProcessHTMLFileErrorName;
};

export type CrittersErrorName<T extends CrittersErrorCategory> = ErrorMap[T];

type ErrorDetailsMap = {
  GET_FILES: (typeof GET_FILES_ERRORS)[keyof typeof GET_FILES_ERRORS];
  PROCESS_HTML_FILE: (typeof PROCESS_HTML_FILE_ERRORS)[keyof typeof PROCESS_HTML_FILE_ERRORS];
};

export type CrittersErrorDetails = ErrorDetailsMap[CrittersErrorGroups];

export * from './getFiles';
export * from './processHTMLFile';
export default CRITTERS_ERRORS;
