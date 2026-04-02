import type {
  HomepageComparisonRow,
  HomepageComparisonSlot,
  WeaponHomepageEntry,
} from "@/features/homepage/model/homepage.types";
import { ComparisonPanel } from "@/features/homepage/components/comparison-panel";
import { MirroredStats } from "@/features/homepage/components/mirrored-stats";
import { joinClassNames } from "@/common/utils/classnames";

type ComparisonZoneProps = {
  leftWeapon: WeaponHomepageEntry | null;
  rightWeapon: WeaponHomepageEntry | null;
  comparisonRows: HomepageComparisonRow[];
  onClear: (slot: HomepageComparisonSlot) => void;
};

export const ComparisonZone = ({
  leftWeapon,
  rightWeapon,
  comparisonRows,
  onClear,
}: ComparisonZoneProps) => {
  return (
    <section className="comparison-zone mb-6 p-5 md:p-6">
      <div className="relative z-[1]">
        <div className="mb-6 flex flex-col items-stretch justify-center gap-0 md:flex-row">
          <ComparisonPanel onClear={onClear} side="left" weapon={leftWeapon} />
          <div className="z-[1] flex h-[50px] flex-none items-center justify-center md:h-auto md:w-[70px]">
            <div
              className={joinClassNames(
                "font-sc flex items-center justify-center rounded-full text-base font-bold tracking-[0.15em] md:text-[1.3rem]",
                "h-12 w-12 border-[3px] border-[var(--gold)] bg-[var(--royal-blue)] text-[var(--gold-bright)]",
                "shadow-[0_4px_16px_rgba(26,58,106,0.3),0_0_0_6px_rgba(196,160,32,0.15)] md:h-[62px] md:w-[62px]",
              )}
            >
              VS
            </div>
          </div>
          <ComparisonPanel onClear={onClear} side="right" weapon={rightWeapon} />
        </div>
        <MirroredStats
          comparisonRows={comparisonRows}
          hasLeftWeapon={Boolean(leftWeapon)}
          hasRightWeapon={Boolean(rightWeapon)}
        />
      </div>
    </section>
  );
};
