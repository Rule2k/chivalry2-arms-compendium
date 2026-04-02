import {
  HOMEPAGE_CLASS_HIERARCHY,
  assignComparisonSlot,
  buildComparisonRows,
  clearComparisonSlot,
  filterHomepageEntries,
  formatMetricValue,
  getSummaryMetricMaximums,
  getVisibleSubclassOptions,
  sortHomepageEntries,
} from "@/features/homepage/model/homepage.model";
import { homepageWeapons } from "@/features/homepage/data/homepage.fixtures";

describe("homepage helpers", () => {
  it("creates homepage entries with joined labels", () => {
    expect(homepageWeapons[0]?.weaponTypesLabel).toBe("Sword, Two Handed");
    expect(homepageWeapons[0]?.subclassAccessLabel).toBe("Officer");
  });

  it("returns visible subclasses for a selected class", () => {
    expect(getVisibleSubclassOptions("Knight")).toEqual([
      "Officer",
      "Guardian",
      "Crusader",
    ]);
    expect(getVisibleSubclassOptions("All")).toEqual([]);
  });

  it("filters by class, subclass, and name search", () => {
    expect(
      filterHomepageEntries(homepageWeapons, {
        activeClass: "Knight",
        activeSubclass: "All",
        searchTerm: "",
      }).map((weapon) => weapon.name),
    ).toEqual(["Greatsword"]);

    expect(
      filterHomepageEntries(homepageWeapons, {
        activeClass: "Footman",
        activeSubclass: "Man at Arms",
        searchTerm: "mace",
      }).map((weapon) => weapon.name),
    ).toEqual(["Mace"]);
  });

  it("sorts metrics with speed ascending and other metrics descending", () => {
    expect(
      sortHomepageEntries(homepageWeapons, "avgHeavyDamage").map(
        (weapon) => weapon.name,
      ),
    ).toEqual(["Greatsword", "Battle Axe", "Mace"]);
    expect(
      sortHomepageEntries(homepageWeapons, "avgSpeed").map(
        (weapon) => weapon.name,
      ),
    ).toEqual(["Mace", "Battle Axe", "Greatsword"]);
  });

  it("formats metric values with compact decimals", () => {
    expect(formatMetricValue(150)).toBe("150");
    expect(formatMetricValue(150.25)).toBe("150.3");
  });

  it("assigns and clears comparison slots with prototype swap behavior", () => {
    const afterLeft = assignComparisonSlot(
      { leftWeaponId: null, rightWeaponId: "battle-axe" },
      "left",
      "battle-axe",
    );

    expect(afterLeft).toEqual({
      leftWeaponId: "battle-axe",
      rightWeaponId: null,
    });

    expect(clearComparisonSlot(afterLeft, "left")).toEqual({
      leftWeaponId: null,
      rightWeaponId: null,
    });
  });

  it("builds comparison rows with lower-is-better speed logic", () => {
    const maximums = getSummaryMetricMaximums(homepageWeapons);
    const rows = buildComparisonRows(homepageWeapons[0], homepageWeapons[1], maximums);
    const speedRow = rows.find((row) => row.key === "avgSpeed");
    const rangeRow = rows.find((row) => row.key === "avgRange");

    expect(speedRow?.leftState).toBe("loser");
    expect(speedRow?.rightState).toBe("winner");
    expect(rangeRow?.leftState).toBe("winner");
    expect(rangeRow?.rightState).toBe("loser");
  });

  it("keeps class fixtures aligned with the homepage hierarchy", () => {
    expect(homepageWeapons[0]?.subclassAccess).toEqual(
      HOMEPAGE_CLASS_HIERARCHY.Knight.slice(0, 1),
    );
  });
});
