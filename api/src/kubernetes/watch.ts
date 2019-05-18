import { K8S } from "./_api";
import {config} from "../config";
// @ts-ignore
import JSONStream from 'json-stream';

export const watchPodFromJob = async (jobName: string) => {
    await K8S.waitReady();

    const stream = K8S.client.api.v1.watch.namespaces(config.namespace).pods.getStream({
      qs:  {
        labelSelector: `job-name=${jobName}`
      }
    });
    const jsonStream = new JSONStream()
    stream.pipe(jsonStream)

    return new Promise((resolve, reject) => {
      jsonStream.on('data', (event: {type: string, object: any}) => {
        const podName = event.object.metadata.name;
        const phase = event.object.status.phase;
        console.log(podName, phase);
        if (phase === 'Succeeded') {
          resolve();
        }
      });
    });
}