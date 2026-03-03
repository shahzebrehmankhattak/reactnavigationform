export const patterns: Record<string, RegExp> = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
  phone: /^\+?[0-9]{10,15}$/,
  number: /^[0-9]+$/ 
};

export function validateField(patternKey: string, value: string): boolean {
  if (!value) return false;
  const pattern = patterns[patternKey];
  if (!pattern) return true; 
  return pattern.test(value.trim());
}