import type {
  HomepageComparisonSlot,
  WeaponHomepageEntry,
} from "@/features/homepage/model/homepage.types";
import { Button } from "@/common/components/button";
import { DamageBadge } from "@/common/components/damage-badge";
import { joinClassNames } from "@/common/utils/classnames";

type ComparisonPanelProps = {
  side: HomepageComparisonSlot;
  weapon: WeaponHomepageEntry | null;
  onClear: (slot: HomepageComparisonSlot) => void;
};

export const ComparisonPanel = ({
  side,
  weapon,
  onClear,
}: ComparisonPanelProps) => {
  const panelLabel = side === "left" ? "Left Weapon" : "Right Weapon";

  return (
    <div
      className={joinClassNames(
        "panel-shell flex flex-1 flex-col items-center justify-center px-[18px] py-5 text-center",
        !weapon && "panel-empty",
      )}
    >
      <div className="font-ornate mb-2 text-[0.7rem] font-bold uppercase tracking-[0.3em] text-[var(--gold)] opacity-70">
        {panelLabel}
      </div>
      {weapon ? (
        <>
          <div className="font-ornate mb-2 text-[1.3rem] leading-tight font-bold text-[var(--royal-blue)] md:text-[1.6rem]">
            {weapon.name}
          </div>
          <DamageBadge
            className="font-ornate mb-2 text-[0.75rem] font-bold"
            damageType={weapon.damageType}
          />
          <div className="font-ornate text-[0.85rem] italic leading-6 text-[#7a6a5a]">
            <span className="block">
              <span className="mr-1 text-[0.7rem] font-semibold uppercase not-italic tracking-[0.1em] text-[var(--royal-blue-light)]">
                Type
              </span>
              {weapon.weaponTypesLabel}
            </span>
            <span className="block">
              <span className="mr-1 text-[0.7rem] font-semibold uppercase not-italic tracking-[0.1em] text-[var(--royal-blue-light)]">
                Class
              </span>
              {weapon.subclassAccessLabel}
            </span>
          </div>
          <Button
            className="mt-3"
            onClick={() => onClear(side)}
            variant="clear"
          >
            &times; Clear
          </Button>
        </>
      ) : (
        <>
          <span className="mb-2 block text-[2.4rem] text-[var(--gold)] opacity-30">
            &#9876;
          </span>
          <span className="font-ornate text-[1.1rem] italic text-[var(--royal-blue-light)] opacity-60">
            Select a weapon below
          </span>
        </>
      )}
    </div>
  );
};
