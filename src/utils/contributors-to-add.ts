export function contributorsToAdd(
  existingContributors: string[] | undefined,
  targetContributors: string[]
): string[] {
  const contributorsToAdd: string[] = [];
  for (const targetContributor of targetContributors) {
    if (
      existingContributors &&
      !existingContributors.includes(targetContributor.toLowerCase())
    ) {
      contributorsToAdd.push(targetContributor.toLowerCase());
    }
  }
  return contributorsToAdd;
}
