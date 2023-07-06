import type { DocumentTypeMap } from './types/serverTypes';

// ignore DOCUMENT_TYPE so every property key will be wrapped in ''
// prettier-ignore
export const DOCUMENT_TYPE: DocumentTypeMap = {
  'dependents-pass': 'Dependents Pass',
  'drivers-licence': `Driver's Licence`,
  'foreigner-permanent-residence': 'Foreigner Permanent Residence',
  'foreigner-residence': 'Foreigner Residence',
  'foreigner-temporary-residence': 'Foreigner Temporary Residence',
  'identity-card': 'National ID',
  'long-term-pass': 'Long Term Pass',
  'passport': 'Passport',
  'postal-id': 'Postal ID',
  'profession-card': 'Profession Card',
  'social-security': 'Social Security',
  'student-pass': 'Student Pass',
  'visa': 'Visa',
  'visit-pass': 'Visit Pass',
  'voter-registration': 'Voter registration card',
  'work-pass': 'Work Pass',
  'work-permit': 'Work Permit',
};

// IL, IC, IA  - ino card specific
export const DOCUMENT_CODES_ID = ['I', 'ID', 'IL', 'IC', 'IA'];

export const DEFAULT_ERROR = { MESSAGE: 'Unexpected error occurred without more specific cause.', CODE: 500 };

export const RECAPTCHA_FULFILLED_SCORE = 0.5;
