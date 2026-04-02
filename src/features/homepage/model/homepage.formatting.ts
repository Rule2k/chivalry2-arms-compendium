import type {
  HomepageMetricKey,
  HomepageMetricMaximums,
} from "./homepage.types";

const roundPercent = (value: number, maxValue: number): number => {
  if (maxValue <= 0) {
    return 0;
  }

  return Math.round((value / maxValue) * 100);
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
  maximums: HomepageMetricMaximums,
): number => {
  return roundPercent(value, maximums[metricKey]);
};

export const getMetricPercent = (value: number, maxValue: number): number => {
  return roundPercent(value, maxValue);
};
