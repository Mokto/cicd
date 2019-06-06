import { k8s } from './_api';
import { config } from '../../config';
// @ts-ignore
import JSONStream from 'json-stream';
import { deleteJob } from './deleteJob';
import { findOneBuildByJobName } from '../builds/dao';
import { patchBuildStep } from '../builds/service';
import { sendBuildToQueue } from '../../queues/watch-build';

export const watchPodFromJob = async (jobName: string) => {
  await k8s.waitReady();

  const stream = k8s.client.api.v1.watch.namespaces(config.namespace).pods.getStream({
    qs: {
      labelSelector: `job-name=${jobName}`,
    },
  });
  const jsonStream = new JSONStream();
  stream.pipe(jsonStream);

  return new Promise(resolve => {
    jsonStream.on('data', async (event: { type: string; object: any }) => {
      const podName = event.object.metadata.name;
      const phase = event.object.status.phase;
      const jobName = podName
        .split('-')
        .slice(0, -1)
        .join('-');

      const build = await findOneBuildByJobName(jobName);
      const actionIdentifier = build.buildActions.find(b => b.jobName === jobName).actionIdentifier;

      console.log(`${actionIdentifier} //// ${phase}`);
      await patchBuildStep(build, actionIdentifier, {
        jobName,
        podName,
        jobState: phase,
      });

      if (phase === 'Running') {
        watchPodLogs(podName);
      }

      if (phase === 'Succeeded') {
        await patchBuildStep(build, actionIdentifier, {
          state: 'completed',
        });
        stream.abort();
        await sendBuildToQueue(build._id);
        deleteJob(jobName, podName);
        resolve();
      }
    });
  });
};

export const watchPodLogs = async (podName: string) => {
  await k8s.waitReady();

  const stream = k8s.client.api.v1
    .namespaces(config.namespace)
    .pods(podName)
    .log.getStream({
      qs: { follow: true },
    });

  stream.on('data', (data: any) => {
    console.log(data);
    // console.log(data.toString('utf8').replace(/\n/g, ''));
  });
};
