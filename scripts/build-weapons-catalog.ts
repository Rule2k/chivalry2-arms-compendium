import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { buildWeaponCatalogV1 } from "../src/domain/weapons/catalog/build-catalog";
import {
  loadChivalry2SourceWeapons,
  readChivalry2SourcePackageMeta,
} from "../src/domain/weapons/source/chivalry2-source";

const projectRoot = process.cwd();
const outputDirectory = path.resolve(projectRoot, "data", "weapons");
const mappingVersion = "weapon-v1-mapping";

const main = async (): Promise<void> => {
  const sourceMeta = await readChivalry2SourcePackageMeta(projectRoot);
  const sourceWeapons = await loadChivalry2SourceWeapons(
    sourceMeta.weaponsDirectory,
  );
  const catalog = buildWeaponCatalogV1(sourceWeapons, {
    libraryVersion: sourceMeta.version,
    mappingVersion,
  });
  const generatedAt = new Date().toISOString();

  await mkdir(outputDirectory, { recursive: true });
  await writeFile(
    path.resolve(outputDirectory, "catalog.v1.json"),
    `${JSON.stringify(catalog.weapons, null, 2)}\n`,
    "utf8",
  );
  await writeFile(
    path.resolve(outputDirectory, "catalog.v1.exclusions.json"),
    `${JSON.stringify(
      {
        excluded: catalog.excluded,
        excludedCount: catalog.excluded.length,
        generatedAt,
        includedCount: catalog.weapons.length,
        mappingVersion,
        sourceVersion: sourceMeta.version,
      },
      null,
      2,
    )}\n`,
    "utf8",
  );

  console.log(
    `Generated ${catalog.weapons.length} normalized V1 weapons and ${catalog.excluded.length} exclusions from ${sourceMeta.provider}@${sourceMeta.version}.`,
  );
};

await main();
