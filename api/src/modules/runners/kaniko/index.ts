import { runDockerStep } from '../runDockerStep';

export const runKanikoStep = (projectPath: string) => {
  return runDockerStep({
    image: 'gcr.io/kaniko-project/executor:latest',
    args: [
      `--dockerfile=/mnt/${projectPath}/Dockerfile`,
      `--context=dir://mnt/${projectPath}`,
      '--destination=cicd-docker-registry:5000/test/develop:1',
      '--insecure',
      '--insecure-pull',
      '--reproducible',
      '--cache=true',
      // "--verbosity=debug"
    ],
  });
};
