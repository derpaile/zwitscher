export function isCommercialEditableLicense(...values) {
  const text = values.filter(Boolean).join(' ').toLowerCase();
  if (!text || isExplicitlyForbiddenLicense(text)) return false;
  return /creativecommons\.org\/licenses\/by(?:-sa)?\//i.test(text)
    || /\bcc\s*by(?:-sa)?\b/i.test(text)
    || /\battribution(?:-sharealike)?\b/i.test(text)
    || /creativecommons\.org\/publicdomain\/(?:zero|mark)\//i.test(text)
    || /\bcc0\b|public domain|\bpdm\b/i.test(text);
}

export function isExplicitlyForbiddenLicense(...values) {
  const text = values.filter(Boolean).join(' ').toLowerCase();
  return /(?:by[- ]?nc|noncommercial|non-commercial|by[- ]?nd|no.?derivatives|all rights reserved|sampling)/i.test(text);
}

export function licenseName(value = '') {
  const text = value.toLowerCase();
  if (/publicdomain\/zero|\bcc0\b/.test(text)) return 'CC0 1.0';
  if (/publicdomain\/mark|\bpdm\b|public domain/.test(text)) return 'Public domain';
  const match = text.match(/(?:licenses\/)?(by(?:-sa)?)[-/ ](\d\.\d)/);
  if (match) return `CC ${match[1].toUpperCase()} ${match[2]}`;
  return value;
}
