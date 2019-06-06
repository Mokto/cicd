import { createJob } from '../kubernetes/createJob';
import { generateRandomHash } from '../../utils/random-hash';
import { sendPodWatcherToQueue } from '../../queues/watch-pods';

export const runDockerStep = async (containerSpec: any) => {
  const hash = await generateRandomHash();

  const jobName = `runner-${hash}`;

  await sendPodWatcherToQueue(jobName);

  return createJob(jobName, containerSpec);
};
