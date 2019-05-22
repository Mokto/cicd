import git from 'simple-git/promise';

import fs from 'fs';

export const cloneGithubProject = async (directoryName: string, githubRepo: string) => {
  console.log('Cloning project...');
  if (!fs.existsSync('./workdir')) {
    fs.mkdirSync('./workdir');
  }
  const remote = `https://github.com/${githubRepo}.git`;

  await git('./workdir')
    .silent(true)
    .clone(remote, `./${directoryName}`);

  console.log('Clone project done.');
};
