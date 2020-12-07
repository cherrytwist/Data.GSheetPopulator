export function toArray(s: string): string[] {
  if (s) {
    if (typeof s === 'number') return [`${s}`];
    return s.split(',').map(x => x && x.trim());
  }
  return [];
}
