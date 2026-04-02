import type {
  HomepageMetricBounds,
  HomepageMetricKey,
} from "./homepage.types";
import { isLowerBetterMetric } from "./homepage.constants";

const roundPercent = (
  value: number,
  bounds: { max: number; min: number },
  lowerIsBetter: boolean,
): number => {
  if (bounds.max <= bounds.min) {
    return 100;
  }

  const normalizedValue = (value - bounds.min) / (bounds.max - bounds.min);
  const percent = lowerIsBetter ? (1 - normalizedValue) * 100 : normalizedValue * 100;

  if (!Number.isFinite(percent)) {
    return 0;
  }

  return Math.max(0, Math.min(100, Math.round(percent)));
};

export const formatMetricValue = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 1,
    minimumFractionDigits: Number.isInteger(value) ? 0 : 1,
  }).format(value);
};

export const getMetricBarWidth = (
  value: number,
  metricKey: HomepageMetricKey,
  metricBounds: HomepageMetricBounds,
): number => {
  return roundPercent(
    value,
    metricBounds[metricKey],
    isLowerBetterMetric(metricKey),
  );
};

export const getMetricPercent = (
  value: number,
  bounds: { max: number; min: number },
  lowerIsBetter = false,
): number => {
  return roundPercent(value, bounds, lowerIsBetter);
};
