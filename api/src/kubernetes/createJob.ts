import { K8S } from "./_api";
import { config } from "../config";

export const createJob = async (name: string, containerSpec: any) => {
    await K8S.waitReady();
    return K8S.client.apis.batch.v1.namespaces(config.namespace).jobs.post({
        body: {
            apiVersion: 'batch/v1',
            kind: 'Job',
            metadata: {
                name,
            },
            spec: {
                backoffLimit: 0,
                template: {
                    spec: {
                        containers: [{
                            name: 'runner',
                            volumeMounts: [{
                                name: "mounted-volume",
                                mountPath: "/mnt"
                            }],
                            ...containerSpec
                        }],
                        volumes: [{
                            name: 'mounted-volume',
                            persistentVolumeClaim: {
                                claimName: 'pvc-workdir'
                            }
                        }],
                        restartPolicy: "Never"
                    }
                }
            }
        }
    });
}