import type {
  WeaponRecordV1,
  WeaponSummaryMetrics,
} from "@/domain/weapons/contract/weapon.types";

export type HomepageMetricKey = keyof WeaponSummaryMetrics;
export type HomepageSortKey = "name" | HomepageMetricKey;
export type HomepageClassKey =
  | "All"
  | "Knight"
  | "Vanguard"
  | "Footman"
  | "Archer";
export type HomepageComparisonSlot = "left" | "right";
export type HomepageComparisonState = "winner" | "loser" | "tied";

export type HomepageFilterState = {
  activeClass: HomepageClassKey;
  activeSubclass: string;
  searchTerm: string;
};

export type HomepageComparisonSelection = {
  leftWeaponId: string | null;
  rightWeaponId: string | null;
};

export type WeaponHomepageEntry = Pick<
  WeaponRecordV1,
  "damageType" | "id" | "name" | "slug"
> & {
  subclassAccess: string[];
  subclassAccessLabel: string;
  summary: WeaponSummaryMetrics;
  weaponTypes: string[];
  weaponTypesLabel: string;
};

export type HomepageMetricBounds = Record<
  HomepageMetricKey,
  {
    max: number;
    min: number;
  }
>;

export type HomepageComparisonMetric = {
  key: HomepageMetricKey;
  label: string;
  lowerIsBetter: boolean;
};

export type HomepageComparisonRow = HomepageComparisonMetric & {
  leftPercent: number;
  leftState: HomepageComparisonState;
  leftValue: number;
  rightPercent: number;
  rightState: HomepageComparisonState;
  rightValue: number;
};
