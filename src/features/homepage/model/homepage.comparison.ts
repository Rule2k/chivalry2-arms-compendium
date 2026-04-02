import { HOMEPAGE_COMPARISON_METRICS } from "./homepage.constants";
import { getMetricPercent } from "./homepage.formatting";
import type {
  HomepageComparisonRow,
  HomepageComparisonSelection,
  HomepageComparisonSlot,
  HomepageMetricBounds,
  WeaponHomepageEntry,
} from "./homepage.types";

export const assignComparisonSlot = (
  selection: HomepageComparisonSelection,
  slot: HomepageComparisonSlot,
  weaponId: string,
): HomepageComparisonSelection => {
  if (slot === "left") {
    return {
      leftWeaponId: weaponId,
      rightWeaponId:
        selection.rightWeaponId === weaponId
          ? selection.leftWeaponId
          : selection.rightWeaponId,
    };
  }

  return {
    leftWeaponId:
      selection.leftWeaponId === weaponId
        ? selection.rightWeaponId
        : selection.leftWeaponId,
    rightWeaponId: weaponId,
  };
};

export const clearComparisonSlot = (
  selection: HomepageComparisonSelection,
  slot: HomepageComparisonSlot,
): HomepageComparisonSelection => {
  if (slot === "left") {
    return {
      ...selection,
      leftWeaponId: null,
    };
  }

  return {
    ...selection,
    rightWeaponId: null,
  };
};

const getComparisonState = (
  leftValue: number,
  rightValue: number,
  lowerIsBetter: boolean,
): Pick<HomepageComparisonRow, "leftState" | "rightState"> => {
  if (leftValue === rightValue) {
    return {
      leftState: "tied",
      rightState: "tied",
    };
  }

  const leftWins = lowerIsBetter ? leftValue < rightValue : leftValue > rightValue;

  return {
    leftState: leftWins ? "winner" : "loser",
    rightState: leftWins ? "loser" : "winner",
  };
};

export const buildComparisonRows = (
  leftWeapon: WeaponHomepageEntry | null,
  rightWeapon: WeaponHomepageEntry | null,
  metricBounds: HomepageMetricBounds,
): HomepageComparisonRow[] => {
  if (!leftWeapon || !rightWeapon) {
    return [];
  }

  return HOMEPAGE_COMPARISON_METRICS.map((metric) => {
    const leftValue = leftWeapon.summary[metric.key];
    const rightValue = rightWeapon.summary[metric.key];
    const states = getComparisonState(
      leftValue,
      rightValue,
      metric.lowerIsBetter,
    );

    return {
      key: metric.key,
      label: metric.label,
      lowerIsBetter: metric.lowerIsBetter,
      leftPercent: getMetricPercent(
        leftValue,
        metricBounds[metric.key],
        metric.lowerIsBetter,
      ),
      leftState: states.leftState,
      leftValue,
      rightPercent: getMetricPercent(
        rightValue,
        metricBounds[metric.key],
        metric.lowerIsBetter,
      ),
      rightState: states.rightState,
      rightValue,
    };
  });
};
