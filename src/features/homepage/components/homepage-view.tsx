"use client";

import { useDeferredValue, useState } from "react";

import {
  assignComparisonSlot,
  buildComparisonRows,
  clearComparisonSlot,
  filterHomepageEntries,
  getSummaryMetricBounds,
  getWeaponById,
  sortHomepageEntries,
} from "@/features/homepage/model/homepage.model";
import type {
  HomepageClassKey,
  HomepageComparisonSelection,
  HomepageComparisonSlot,
  HomepageSortKey,
  WeaponHomepageEntry,
} from "@/features/homepage/model/homepage.types";
import { ComparisonZone } from "@/features/homepage/components/comparison-zone";
import { CompendiumFooter } from "@/features/homepage/components/compendium-footer";
import { CompendiumHeader } from "@/features/homepage/components/compendium-header";
import { ControlsPanel } from "@/features/homepage/components/controls-panel";
import { WeaponCard } from "@/features/homepage/components/weapon-card";

type HomepageViewProps = {
  weapons: WeaponHomepageEntry[];
};

const getCountLabel = (count: number): string => {
  return `${count} ${count === 1 ? "Entry" : "Entries"} Catalogued`;
};

export const HomepageView = ({ weapons }: HomepageViewProps) => {
  const [searchValue, setSearchValue] = useState("");
  const deferredSearchTerm = useDeferredValue(searchValue);
  const [activeClass, setActiveClass] = useState<HomepageClassKey>("All");
  const [activeSubclass, setActiveSubclass] = useState("All");
  const [sortKey, setSortKey] = useState<HomepageSortKey>("name");
  const [selection, setSelection] = useState<HomepageComparisonSelection>({
    leftWeaponId: null,
    rightWeaponId: null,
  });

  const metricBounds = getSummaryMetricBounds(weapons);
  const filteredWeapons = filterHomepageEntries(weapons, {
    activeClass,
    activeSubclass,
    searchTerm: deferredSearchTerm,
  });
  const visibleWeapons = sortHomepageEntries(filteredWeapons, sortKey);
  const leftWeapon = getWeaponById(weapons, selection.leftWeaponId);
  const rightWeapon = getWeaponById(weapons, selection.rightWeaponId);
  const comparisonRows = buildComparisonRows(leftWeapon, rightWeapon, metricBounds);

  const handleClassChange = (value: HomepageClassKey) => {
    setActiveClass(value);
    setActiveSubclass("All");
  };

  const handleAssign = (slot: HomepageComparisonSlot, weaponId: string) => {
    setSelection((currentSelection) =>
      assignComparisonSlot(currentSelection, slot, weaponId),
    );
  };

  const handleClear = (slot: HomepageComparisonSlot) => {
    setSelection((currentSelection) =>
      clearComparisonSlot(currentSelection, slot),
    );
  };

  return (
    <main className="px-0 py-4 md:py-6">
      <div className="compendium-page">
        <div className="compendium-content">
          <CompendiumHeader />
          <ComparisonZone
            comparisonRows={comparisonRows}
            leftWeapon={leftWeapon}
            onClear={handleClear}
            rightWeapon={rightWeapon}
          />
          <div className="section-divider my-4 text-base">&#9884;</div>
          <ControlsPanel
            activeClass={activeClass}
            activeSubclass={activeSubclass}
            onClassChange={handleClassChange}
            onSearchChange={setSearchValue}
            onSortChange={setSortKey}
            onSubclassChange={setActiveSubclass}
            searchValue={searchValue}
            sortKey={sortKey}
          />
          <div
            className="font-ornate mb-4 text-center text-base font-semibold uppercase tracking-[0.2em] text-[var(--royal-blue)]"
            data-testid="count-bar"
          >
            &#9884; {getCountLabel(visibleWeapons.length)} &#9884;
          </div>
          <section
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
            data-testid="weapon-grid"
          >
            {visibleWeapons.map((weapon) => {
              return (
                <WeaponCard
                  isLeftSelected={selection.leftWeaponId === weapon.id}
                  isRightSelected={selection.rightWeaponId === weapon.id}
                  key={weapon.id}
                  metricBounds={metricBounds}
                  onAssign={handleAssign}
                  weapon={weapon}
                />
              );
            })}
          </section>
          <CompendiumFooter />
        </div>
      </div>
    </main>
  );
};
