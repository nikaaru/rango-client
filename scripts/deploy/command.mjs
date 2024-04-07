#!/usr/bin/env node
'use strict';
import process from 'node:process';
import { workspacePackages } from '../common/utils.mjs';
import { build } from '../publish/build.mjs';
import { logAsSection } from '../publish/utils.mjs';
import { deployProjectsToVercel, getVercelProjectId } from './utils.mjs';
import { ENABLE_PREVIEW_DEPLOY } from './config.mjs';

// TODO: Working directory should be empty.
async function run() {

  /*
    Deploys packages based on the state of the `ENABLE_PREVIEW_DEPLOY` environment variable.
    if ENABLE_PREVIEW_DEPLOY is enabled only packages that has project id in workflow environments will be deployed.
    else private packages will be deployed.
 */


    const name1 = 'app_url';
    const name2 = 'playground_url';
    const value1 = 'https://nik1.com';
    const value2 = 'https://nik2.com';

    await execa.command(`echo "${name1}=${value1}" >> $GITHUB_OUTPUT`, { shell: true });
    await execa.command(`echo "${name2}=${value2}" >> $GITHUB_OUTPUT`, { shell: true });

    return;

  // Detect last relase and what packages has changed since then.
  const packages = await workspacePackages();

  const privatePackages = packages.filter((pkg) => {
    if (ENABLE_PREVIEW_DEPLOY) {
      const hasProjectId = getVercelProjectId(pkg.name) && getVercelProjectId(pkg.name) !== 'NOT SET' ;
      return pkg.private && hasProjectId;
    } 
    else {
      return pkg.private;
    }
  });


  if(ENABLE_PREVIEW_DEPLOY){
    console.log('preview deployment is enabled.');
    console.log('these packages will be deployed:', privatePackages.map(pkg=>pkg.name).join(', '));
    console.log('note: if you need add more packages to be deployed, first you need to add vercel project id to workflow environments then follow documentation there.');
  }
  else{
    console.log('preview deployment is disabled.');
    console.log('these packages will be deployed:', privatePackages.map(pkg=>pkg.name).join(', '));
  }
  logAsSection('[x] Check Environment');

  
  await build(privatePackages).catch((e) => {
    console.log(
      '[-] BUILD FAILED. Ignore it to workflow run the rest of tasks.'
    );
    console.log(e);
  });
  logAsSection('[x] Build for VERCEL');
  await deployProjectsToVercel(privatePackages).catch((e) => {
    console.log(
      '[-] DEPLOY FAILED. Ignore it to workflow run the rest of tasks.'
    );
    console.log(e);
  });
  logAsSection('[x] Deploy to VERCEL');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
