import { k8s } from './_api';
import { config } from '../config';
// @ts-ignore
import JSONStream from 'json-stream';
import { deleteJob } from './deleteJob';

export const watchPodFromJob = async (jobName: string) => {
  await k8s.waitReady();

  const stream = k8s.client.api.v1.watch.namespaces(config.namespace).pods.getStream({
    qs: {
      labelSelector: `job-name=${jobName}`,
    },
  });
  const jsonStream = new JSONStream();
  stream.pipe(jsonStream);

  let streamLogs: any;

  return new Promise(resolve => {
    jsonStream.on('data', (event: { type: string; object: any }) => {
      const podName = event.object.metadata.name;
      const phase = event.object.status.phase;
      console.log(podName, phase);

      if (phase === 'Running') {
        streamLogs = watchPodLogs(podName);
      }

      if (phase === 'Succeeded') {
        stream.abort();
        console.log(streamLogs);
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
      qs: { tailLines: 10, follow: true },
    });
  const jsonStream = new JSONStream();
  stream.pipe(jsonStream);

  jsonStream.on('data', (data: any) => {
    console.log(data);
  });

  return stream;
};

// export const watchAndDelete = async () => {
//   await k8s.waitReady();
//   const stream = k8s.client.api.v1.watch.namespaces(config.namespace).pods.getStream();
//   const jsonStream = new JSONStream()
//   stream.pipe(jsonStream);

//   console.log('----------')

//   jsonStream.on('data', (event: {type: string, object: any}) => {
//     const podName = event.object.metadata.name;
//     const jobName = event.object.metadata.labels['job-name'];
//     if (podName.indexOf('runner-') > -1) {
//       deleteJob(jobName, podName);
//     }
//   });
// }
