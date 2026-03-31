const NON_ALPHANUMERIC_PATTERN = /[^a-z0-9]+/g;
const EDGE_HYPHEN_PATTERN = /^-+|-+$/g;

export const normalizeStringList = (values: string[]): string[] => {
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))].sort(
    (left, right) => left.localeCompare(right),
  );
};

export const createWeaponSlug = (name: string): string => {
  const slug = name
    .trim()
    .toLowerCase()
    .replace(NON_ALPHANUMERIC_PATTERN, "-")
    .replace(EDGE_HYPHEN_PATTERN, "");

  if (!slug) {
    throw new Error("Cannot create a weapon slug from an empty name.");
  }

  return slug;
};
