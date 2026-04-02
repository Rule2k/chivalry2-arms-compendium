import {
  formatMetricValue,
  getMetricBarWidth,
} from "@/features/homepage/model/homepage.model";
import type {
  HomepageComparisonSlot,
  HomepageMetricKey,
  HomepageMetricMaximums,
  WeaponHomepageEntry,
} from "@/features/homepage/model/homepage.types";
import { Button } from "@/common/components/button";
import { DamageBadge } from "@/common/components/damage-badge";
import { StatBar } from "@/common/components/stat-bar";
import { joinClassNames } from "@/common/utils/classnames";

type WeaponCardProps = {
  isLeftSelected: boolean;
  isRightSelected: boolean;
  maximums: HomepageMetricMaximums;
  onAssign: (slot: HomepageComparisonSlot, weaponId: string) => void;
  weapon: WeaponHomepageEntry;
};

const WEAPON_CARD_METRICS: Array<{ key: HomepageMetricKey; label: string }> = [
  { key: "avgLightDamage", label: "Light Dmg" },
  { key: "avgHeavyDamage", label: "Heavy Dmg" },
  { key: "avgRange", label: "Range" },
  { key: "avgSpeed", label: "Speed" },
];

export const WeaponCard = ({
  isLeftSelected,
  isRightSelected,
  maximums,
  onAssign,
  weapon,
}: WeaponCardProps) => {
  return (
    <article
      className={joinClassNames(
        "weapon-card flex flex-col items-center p-[22px]",
        isLeftSelected && "weapon-card--selected-left",
        isRightSelected && "weapon-card--selected-right",
      )}
    >
      <h2 className="font-ornate mb-2 text-center text-[1.5rem] leading-tight font-bold tracking-[0.05em] text-[var(--royal-blue)]">
        {weapon.name}
      </h2>
      <DamageBadge
        className="font-ornate mb-3 text-[0.75rem] font-bold"
        damageType={weapon.damageType}
      />
      <div className="card-rule mb-4" />
      <div className="mb-4 flex w-full flex-col gap-2">
        {WEAPON_CARD_METRICS.map((metric) => {
          const metricValue = weapon.summary[metric.key];
          const width = getMetricBarWidth(metricValue, metric.key, maximums);

          return (
            <div className="flex items-center gap-2" key={metric.key}>
              <span className="font-ornate w-[96px] flex-none whitespace-nowrap text-right text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[var(--royal-blue)]">
                {metric.label}
              </span>
              <StatBar className="flex-1" percent={width} size="compact" />
              <span className="w-10 flex-none text-right text-[0.72rem] text-[#8a7a6a]">
                {formatMetricValue(metricValue)}
              </span>
            </div>
          );
        })}
      </div>
      <div className="font-ornate mb-4 text-center text-[0.85rem] italic leading-6 text-[#7a6a5a]">
        <span className="block">
          <span className="mr-1 text-[0.7rem] font-semibold uppercase not-italic tracking-[0.12em] text-[var(--royal-blue-light)]">
            Type
          </span>
          {weapon.weaponTypesLabel}
        </span>
        <span className="block">
          <span className="mr-1 text-[0.7rem] font-semibold uppercase not-italic tracking-[0.12em] text-[var(--royal-blue-light)]">
            Class
          </span>
          {weapon.subclassAccessLabel}
        </span>
      </div>
      <div className="flex w-full flex-col gap-2 md:flex-row md:gap-[10px]">
        <Button
          active={isLeftSelected}
          activeTone="left"
          className="flex-1"
          onClick={() => onAssign("left", weapon.id)}
          variant="duel"
        >
          {isLeftSelected ? "\u2714 Left" : "Set Left"}
        </Button>
        <Button
          active={isRightSelected}
          activeTone="right"
          className="flex-1"
          onClick={() => onAssign("right", weapon.id)}
          variant="duel"
        >
          {isRightSelected ? "\u2714 Right" : "Set Right"}
        </Button>
      </div>
    </article>
  );
};
