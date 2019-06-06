import { k8s } from './_api';
import { config } from '../../config';

export const deleteJob = async (jobName: string, podName: string) => {
  await k8s.waitReady();

  await k8s.client.apis.batch.v1
    .namespaces(config.namespace)
    .jobs(jobName)
    .delete();
  return k8s.client.api.v1
    .namespaces(config.namespace)
    .pods(podName)
    .delete();
};
