import {V1Pod, V1ObjectMeta, V1PodSpec, V1Container, V1Volume, V1PersistentVolumeClaim, V1PersistentVolumeClaimVolumeSource} from '@kubernetes/client-node';
import {k8sApi} from './_api-client';

export const createPod = async (namespace: string, metadata: any, containers: any[], volumes: any[] = []) => {
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
                container[key] = containerObj[key];
            });
            pod.spec.containers.push(container);
        });

        pod.spec.volumes = [];
        volumes.forEach(volumeObj => {
            const volume = new V1Volume();
            volume.name = volumeObj.name;
            volume.persistentVolumeClaim = new V1PersistentVolumeClaimVolumeSource();
            volume.persistentVolumeClaim.claimName = volumeObj.persistentVolumeClaim.claimName;
            pod.spec.volumes.push(volume);
        });
          
        // console.log(pod.toString());
        return k8sApi.createNamespacedPod(namespace, pod);
}
