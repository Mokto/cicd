import { K8S } from "./_api";
import {config} from "../config";
// @ts-ignore
import JSONStream from 'json-stream';

export const watchKubernetes = async () => {
    await K8S.waitReady();

    const stream = K8S.client.api.v1.watch.namespaces(config.namespace).pods.getStream();

      const jsonStream = new JSONStream()
      stream.pipe(jsonStream)
      jsonStream.on('data', (event: {type: string, object: any}) => {
        const podName = event.object.metadata.name;
        if (podName.indexOf('runner-') === -1) {
          return;
        }

        const phase = event.object.status.phase;
        if (phase === 'Succeeded') {
          console.log('To delete');
        }
      });

      console.log('LISTENING')
}