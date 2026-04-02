import { formatMetricValue } from "@/features/homepage/model/homepage.model";
import type { HomepageComparisonRow } from "@/features/homepage/model/homepage.types";
import { StatBar } from "@/common/components/stat-bar";
import { joinClassNames } from "@/common/utils/classnames";

type MirroredStatsProps = {
  comparisonRows: HomepageComparisonRow[];
  hasLeftWeapon: boolean;
  hasRightWeapon: boolean;
};

export const MirroredStats = ({
  comparisonRows,
  hasLeftWeapon,
  hasRightWeapon,
}: MirroredStatsProps) => {
  if (!hasLeftWeapon && !hasRightWeapon) {
    return (
      <div className="font-ornate py-5 text-center text-[0.95rem] italic text-[var(--royal-blue-light)] opacity-50">
        Select two weapons to compare their stats
      </div>
    );
  }

  if (!hasLeftWeapon || !hasRightWeapon) {
    return (
      <div className="font-ornate py-5 text-center text-[0.95rem] italic text-[var(--royal-blue-light)] opacity-50">
        Select a second weapon to see the comparison
      </div>
    );
  }

  return (
    <div className="px-0 md:px-2">
      <div className="font-ornate mb-4 flex items-center justify-center gap-2 text-center text-[0.8rem] font-semibold uppercase tracking-[0.2em] text-[var(--royal-blue-light)]">
        <span className="h-px w-10 bg-gradient-to-r from-transparent via-[var(--border-gold)] to-transparent" />
        Comparative Analysis
        <span className="h-px w-10 bg-gradient-to-r from-transparent via-[var(--border-gold)] to-transparent" />
      </div>
      <div className="space-y-3">
        {comparisonRows.map((row) => {
          return (
            <div
              className="flex flex-wrap items-center gap-1 md:flex-nowrap md:gap-0"
              key={row.key}
            >
              <span
                className={joinClassNames(
                  "hidden w-9 flex-none pr-1 text-right text-[0.78rem] md:block",
                  row.leftState === "winner" && "comparison-value--winner font-bold",
                  row.leftState === "loser" && "comparison-value--loser",
                )}
              >
                {formatMetricValue(row.leftValue)}
              </span>
              <span className="mr-auto block w-10 flex-none text-left text-[0.72rem] md:hidden">
                {formatMetricValue(row.leftValue)}
              </span>
              <div className="order-1 flex flex-1 justify-end pr-0 md:order-none md:pr-2">
                <StatBar
                  className="w-full"
                  direction="left"
                  percent={row.leftPercent}
                  state={row.leftState}
                />
              </div>
              <div className="order-3 w-full flex-none text-center md:order-none md:w-[90px]">
                <span className="font-ornate text-[0.72rem] font-semibold uppercase tracking-[0.15em] text-[var(--royal-blue)]">
                  {row.label}
                </span>
              </div>
              <div className="order-2 flex flex-1 justify-start pl-0 md:order-none md:pl-2">
                <StatBar className="w-full" percent={row.rightPercent} state={row.rightState} />
              </div>
              <span
                className={joinClassNames(
                  "hidden w-9 flex-none pl-1 text-left text-[0.78rem] md:block",
                  row.rightState === "winner" && "comparison-value--winner font-bold",
                  row.rightState === "loser" && "comparison-value--loser",
                )}
              >
                {formatMetricValue(row.rightValue)}
              </span>
              <span className="ml-auto block w-10 flex-none text-right text-[0.72rem] md:hidden">
                {formatMetricValue(row.rightValue)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
