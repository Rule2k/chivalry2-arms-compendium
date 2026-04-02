import { loadWeaponCatalogV1 } from "@/domain/weapons/catalog/load-catalog";
import { createWeaponHomepageEntries } from "@/features/homepage/model/homepage.model";
import { HomepageView } from "@/features/homepage/components/homepage-view";

export const HomepagePage = () => {
  const weaponCatalog = loadWeaponCatalogV1();
  const homepageEntries = createWeaponHomepageEntries(weaponCatalog);

  return <HomepageView weapons={homepageEntries} />;
};
