// Helper function to count non duplicated objects (using `field` to filter)
export function getUniqueFilenameCount<T>(arr: T[], field: Partial<keyof T>): number {
  const uniqueFilenames = new Set(arr.map((item) => item[field]));
  return uniqueFilenames.size;
}
