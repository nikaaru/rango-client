import { execa } from 'execa';
import { detectChannel } from '../common/github.mjs';
import { VERCEL_ORG_ID, VERCEL_PACKAGES, VERCEL_TOKEN } from './config.mjs';
import { VercelError } from '../common/errors.mjs';

export function getVercelProjectId(packageName) {
  return VERCEL_PACKAGES[packageName];
}

export async function deployProjectsToVercel(pkgs) {
  await Promise.all(pkgs.map((pkg) => deploySingleProjectToVercel(pkg)));
}
export async function deploySingleProjectToVercel(pkg) {
  const deployTo = detectChannel() === 'prod' ? 'production' : 'preview';

  const env = {
    VERCEL_ORG_ID: VERCEL_ORG_ID,
    VERCEL_PROJECT_ID: getVercelProjectId(pkg.name),
  };

  if (!env.VERCEL_PROJECT_ID) {
    console.log(`::warning::Couldn't find PROJECT_ID env for ${pkg.name}`);
  }

  console.log(`start deploying ${pkg.name}...`);

  await execa(
    'yarn',
    [
      'vercel',
      'pull',
      '--cwd',
      pkg.location,
      '--environment',
      deployTo,
      '--token',
      VERCEL_TOKEN,
      '--yes',
    ],
    { env }
  );
  
  await execa(
    'yarn',
    ['vercel', 'build', '--cwd', pkg.location, '--token', VERCEL_TOKEN],
    { env }
  );

  const vercelResult = await execa(
    'yarn',
    ['vercel', pkg.location, '--prebuilt', '--token', VERCEL_TOKEN],
    { env }
  ).then((result) => result.stdout)
  .catch((err) => {
    throw new VercelError(
      `An error occurred on deploy ${pkg.name} package \n ${err.message} \n ${err.stderr}`
    );
  });

  // Run tail -1 on the stdout for get last line
  const URLPreview = await execa('tail', ['-1'], { input: vercelResult })
    .then(result => result.stdout)
    .catch((err) => {
      throw new VercelError(
        `An error occurred on get url preview for ${pkg.name} package \n ${err.message} \n ${err.stderr}`
      );
    });

  console.log(`${pkg.name}-url-preview:`, URLPreview);
  console.log(`${pkg.name} deployed.`);
}

export function groupPackagesForDeploy(packages) {
  const output = {
    npm: [],
    vercel: [],
  };

  packages.forEach((pkg) => {
    if (!!getVercelProjectId(pkg.name)) {
      output.vercel.push(pkg);
    } else if (!pkg.private) {
      // If getVercelProjectId returns undefined, it's possible to be added as npm package
      // So here we are making sure it's not a private package and can be published using npm
      output.npm.push(pkg);
    }
  });

  return output;
}
