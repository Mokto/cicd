import { runDockerStep } from '../runDockerStep';
import { Build } from '@common/models/build';
import { patchBuildStep } from '../../builds/service';

export const runKanikoStep = async (build: Build, actionIdentifier: string, imageName: string) => {
  // console.log('run docker');
  // return new Promise(resolve => {
  //   setTimeout(() => {
  //     resolve();
  //   }, 5000);
  // });
  const jobResult = await runDockerStep({
    image: 'gcr.io/kaniko-project/executor:latest',
    args: [
      `--dockerfile=/mnt/${build._id}/Dockerfile`,
      `--context=dir://mnt/${build._id}`,
      `--destination=cicd-docker-registry:5000/${imageName}:1`,
      '--insecure',
      '--insecure-pull',
      '--reproducible',
      '--cache=true',
      // "--verbosity=debug"
    ],
  });

  build = await patchBuildStep(build, actionIdentifier, {
    jobName: jobResult.body.metadata.name,
    jobState: 'pending',
  });

  return jobResult;
};
