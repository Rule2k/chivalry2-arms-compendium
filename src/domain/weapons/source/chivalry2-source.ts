import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

import {
  CHIVALRY2_SOURCE_PROVIDER,
  type Chivalry2RawWeapon,
  type Chivalry2SourcePackageMeta,
  type Chivalry2SourceWeaponEntry,
} from "./chivalry2-source.types";

export const resolveChivalry2PackageRoot = (projectRoot: string): string => {
  return path.resolve(projectRoot, "node_modules", CHIVALRY2_SOURCE_PROVIDER);
};

export const resolveChivalry2WeaponsDirectory = (projectRoot: string): string => {
  return path.resolve(
    resolveChivalry2PackageRoot(projectRoot),
    "dist",
    "weapons",
  );
};

export const readChivalry2SourcePackageMeta = async (
  projectRoot: string,
): Promise<Chivalry2SourcePackageMeta> => {
  const packageRoot = resolveChivalry2PackageRoot(projectRoot);
  const packageJsonPath = path.resolve(packageRoot, "package.json");
  const packageJson = JSON.parse(
    await readFile(packageJsonPath, "utf8"),
  ) as { version: string };

  return {
    provider: CHIVALRY2_SOURCE_PROVIDER,
    version: packageJson.version,
    packageRoot,
    weaponsDirectory: resolveChivalry2WeaponsDirectory(projectRoot),
  };
};

export const loadChivalry2SourceWeapons = async (
  weaponsDirectory: string,
): Promise<Chivalry2SourceWeaponEntry[]> => {
  const fileNames = (await readdir(weaponsDirectory))
    .filter((fileName: string) => fileName.endsWith(".json"))
    .sort((left: string, right: string) => left.localeCompare(right));

  return Promise.all(
    fileNames.map(async (fileName: string) => {
      const filePath = path.resolve(weaponsDirectory, fileName);
      const weapon = JSON.parse(
        await readFile(filePath, "utf8"),
      ) as Chivalry2RawWeapon;

      return {
        weaponKey: path.basename(fileName, ".json"),
        weapon,
      };
    }),
  );
};
