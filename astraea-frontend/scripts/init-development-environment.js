const force =
  process.argv.length > 2 &&
  process.argv.slice(2).find((arg) => arg === "-f" || arg === "--force");
const empty =
  process.argv.length > 2 &&
  process.argv.slice(2).find((arg) => arg === "--empty");

const envDevFile = `src/environments/environment.development.ts`;

const fs = require("fs");

if (empty) {
  console.log("writing empty " + envDevFile);

  fs.writeFileSync(
    envDevFile,
    `import { Environment } from './environment.model';

export const overrides: Partial<Environment> = {};
`
  );
} else if (!fs.existsSync(envDevFile) || force) {
  if (fs.existsSync(envDevFile)) {
    const environmentLocalBackupPath = envDevFile + ".bak";
    console.log("creating backup " + environmentLocalBackupPath);
    fs.renameSync(envDevFile, environmentLocalBackupPath);
  }

  console.log("writing " + envDevFile);

  fs.writeFileSync(
    envDevFile,
    `import { Environment } from './environment.model';


export const overrides: Partial<Environment> = {};
`
  );
} else {
  console.log("not overwriting existing " + envDevFile);
}
