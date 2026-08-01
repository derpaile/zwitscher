export function isCourseCompleted(examBest: number, masteryLevels: number[]): boolean {
  return examBest >= .8 && masteryLevels.length > 0 && masteryLevels.every((level) => level >= 2);
}

export function recommendedContrast(confusions: Record<string,number>, minimum = 2): [string,string] | null {
  const entry = Object.entries(confusions)
    .filter(([key,count]) => key.includes('>') && count >= minimum)
    .sort((a,b) => b[1]-a[1] || a[0].localeCompare(b[0],'de'))[0];
  if (!entry) return null;
  const [first,second] = entry[0].split('>');
  return first && second ? [first,second] : null;
}

export function rankedConfusionIds(speciesId: string, confusions: Record<string,number>): string[] {
  return Object.entries(confusions)
    .filter(([key]) => key.startsWith(`${speciesId}>`))
    .sort((a,b) => b[1]-a[1] || a[0].localeCompare(b[0],'de'))
    .map(([key]) => key.slice(speciesId.length+1))
    .filter(Boolean);
}
