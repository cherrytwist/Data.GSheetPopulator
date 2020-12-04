export function toArray(s: string): string[] {
  if (s) {
    if (typeof s === 'number') return [`${s}`];
    return s.split(',');
  }
  return [];
}
