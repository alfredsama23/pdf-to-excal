import { DataPattern } from './types';

export const dataPatterns: DataPattern[] = [
  {
    type: 'email',
    pattern: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
  },
  {
    type: 'phone',
    pattern: /(\+\d{1,3}[-.]?)?\(?\d{3}\)?[-.]?\d{3}[-.]?\d{4}/g,
  },
  {
    type: 'date',
    pattern: /\d{1,2}[-/]\d{1,2}[-/]\d{2,4}|\d{4}[-/]\d{1,2}[-/]\d{1,2}/g,
  },
  {
    type: 'name',
    pattern: /(?:Mr\.|Mrs\.|Ms\.|Dr\.)\s[A-Z][a-z]+(?:\s[A-Z][a-z]+)*|[A-Z][a-z]+(?:\s[A-Z][a-z]+){1,2}/g,
  },
  {
    type: 'address',
    pattern: /\d+\s+[A-Za-z\s,]+(?:Avenue|Lane|Road|Boulevard|Drive|Street|Ave|Dr|Rd|Blvd|Ln|St)\.?(?:\s+[A-Za-z]+,)?\s+[A-Z]{2}\s+\d{5}/g,
  },
];