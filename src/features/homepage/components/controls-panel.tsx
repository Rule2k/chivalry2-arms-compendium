import {
  HOMEPAGE_CLASS_OPTIONS,
  HOMEPAGE_SORT_OPTIONS,
  getVisibleSubclassOptions,
} from "@/features/homepage/model/homepage.model";
import type {
  HomepageClassKey,
  HomepageSortKey,
} from "@/features/homepage/model/homepage.types";
import { Button } from "@/common/components/button";

type ControlsPanelProps = {
  activeClass: HomepageClassKey;
  activeSubclass: string;
  onClassChange: (value: HomepageClassKey) => void;
  onSearchChange: (value: string) => void;
  onSortChange: (value: HomepageSortKey) => void;
  onSubclassChange: (value: string) => void;
  searchValue: string;
  sortKey: HomepageSortKey;
};

export const ControlsPanel = ({
  activeClass,
  activeSubclass,
  onClassChange,
  onSearchChange,
  onSortChange,
  onSubclassChange,
  searchValue,
  sortKey,
}: ControlsPanelProps) => {
  const subclassOptions = getVisibleSubclassOptions(activeClass);

  return (
    <section className="controls-shell mb-5 rounded-[2px]">
      <div className="flex flex-col gap-3 px-5 py-4 md:flex-row md:items-center">
        <input
          aria-label="Search weapons by name"
          className="search-input w-full min-w-0 flex-1 rounded-[1px] border border-[var(--border-gold)] bg-[var(--royal-cream)] px-[14px] py-[8px] text-[0.95rem] text-[var(--ink)] placeholder:text-[#a09080] md:min-w-[180px]"
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search the compendium..."
          type="text"
          value={searchValue}
        />
        <select
          aria-label="Sort weapons"
          className="sort-select font-ornate w-full rounded-[1px] border-2 border-[var(--border-gold)] bg-[var(--royal-cream)] px-4 py-[7px] pr-7 text-[0.9rem] font-semibold uppercase tracking-[0.08em] text-[var(--royal-blue)] md:w-[220px]"
          onChange={(event) => onSortChange(event.target.value as HomepageSortKey)}
          value={sortKey}
        >
          {HOMEPAGE_SORT_OPTIONS.map((option) => {
            return (
              <option key={option.key} value={option.key}>
                {option.label}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex flex-wrap items-center gap-2 border-t border-[rgba(184,144,64,0.25)] px-5 py-[10px]">
        <span className="font-ornate mr-2 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[var(--royal-blue-light)]">
          Class
        </span>
        {HOMEPAGE_CLASS_OPTIONS.map((classOption) => {
          return (
            <Button
              active={activeClass === classOption}
              key={classOption}
              onClick={() => onClassChange(classOption)}
              variant="filter"
            >
              {classOption}
            </Button>
          );
        })}
      </div>
      {subclassOptions.length > 0 ? (
        <div className="flex flex-wrap items-center gap-2 border-t border-[rgba(184,144,64,0.25)] bg-[rgba(26,58,106,0.02)] px-5 py-[10px]">
          <span className="font-ornate mr-2 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[var(--royal-blue-light)]">
            Subclass
          </span>
          <Button
            active={activeSubclass === "All"}
            onClick={() => onSubclassChange("All")}
            variant="filter"
          >
            All {activeClass}
          </Button>
          {subclassOptions.map((subclassOption) => {
            return (
              <Button
                active={activeSubclass === subclassOption}
                key={subclassOption}
                onClick={() => onSubclassChange(subclassOption)}
                variant="filter"
              >
                {subclassOption}
              </Button>
            );
          })}
        </div>
      ) : null}
    </section>
  );
};
