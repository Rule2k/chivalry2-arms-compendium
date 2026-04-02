import type {
  HomepageClassKey,
  HomepageComparisonMetric,
  HomepageMetricKey,
  HomepageSortKey,
} from "./homepage.types";

export const HOMEPAGE_CLASS_HIERARCHY = {
  Knight: ["Officer", "Guardian", "Crusader"],
  Vanguard: ["Devastator", "Raider", "Ambusher"],
  Footman: ["Poleman", "Man at Arms", "Engineer"],
  Archer: ["Longbowman", "Crossbowman", "Skirmisher"],
} as const satisfies Record<
  Exclude<HomepageClassKey, "All">,
  readonly string[]
>;

export const HOMEPAGE_CLASS_OPTIONS: HomepageClassKey[] = [
  "All",
  "Knight",
  "Vanguard",
  "Footman",
  "Archer",
];

export const HOMEPAGE_SORT_OPTIONS: Array<{
  key: HomepageSortKey;
  label: string;
}> = [
  { key: "name", label: "Sort by Name" },
  { key: "avgLightDamage", label: "Light Damage" },
  { key: "avgHeavyDamage", label: "Heavy Damage" },
  { key: "avgRange", label: "Range" },
  { key: "avgSpeed", label: "Speed" },
];

export const HOMEPAGE_COMPARISON_METRICS: HomepageComparisonMetric[] = [
  { key: "avgLightDamage", label: "Light Dmg", lowerIsBetter: false },
  { key: "avgHeavyDamage", label: "Heavy Dmg", lowerIsBetter: false },
  { key: "avgRange", label: "Range", lowerIsBetter: false },
  { key: "avgSpeed", label: "Speed", lowerIsBetter: true },
];

export const isLowerBetterMetric = (metricKey: HomepageMetricKey): boolean => {
  return (
    HOMEPAGE_COMPARISON_METRICS.find((metric) => metric.key === metricKey)
      ?.lowerIsBetter ?? false
  );
};
