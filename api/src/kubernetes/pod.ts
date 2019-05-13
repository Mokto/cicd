import {V1Pod, V1ObjectMeta, V1PodSpec, V1Container} from '@kubernetes/client-node';
import {k8sApi} from './_api-client';

export const createPod = async (namespace: string, containers: any[], metadata: any) => {
    const pod = new V1Pod();
        pod.apiVersion = 'v1';
        pod.kind = 'Pod';
        pod.metadata = new V1ObjectMeta();
        Object.keys(metadata).forEach(key => {
            //@ts-ignore
            pod.metadata[key] = metadata[key];
        });
        pod.spec = new V1PodSpec();
        pod.spec.containers = []
        containers.forEach(containerObj => {
            const container = new V1Container();
            Object.keys(containerObj).forEach(key => {
                //@ts-ignore
                container[value] = containerObj[key];
            });
            pod.spec.containers.push(container);
        });
          
        return k8sApi.createNamespacedPod(namespace, pod);
}
