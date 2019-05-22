import { runDockerStep } from '../runDockerStep';

export const runKanikoStep = (projectPath: string, imageName: string) => {
  // console.log('run docker');
  // return new Promise(resolve => {
  //   setTimeout(() => {
  //     resolve();
  //   }, 5000);
  // });
  return runDockerStep({
    image: 'gcr.io/kaniko-project/executor:latest',
    args: [
      `--dockerfile=/mnt/${projectPath}/Dockerfile`,
      `--context=dir://mnt/${projectPath}`,
      `--destination=cicd-docker-registry:5000/${imageName}:1`,
      '--insecure',
      '--insecure-pull',
      '--reproducible',
      '--cache=true',
      // "--verbosity=debug"
    ],
  });
};
