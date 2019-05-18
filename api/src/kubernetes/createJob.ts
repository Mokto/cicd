import { K8S } from "./_api";
import { config } from "../config";

export const createJob = async (metadata: any, containers: any[], volumes: any[] = []) => {
    await K8S.waitReady();
    await K8S.client.apis.batch.v1.namespaces(config.namespace).jobs.post({
        body: {
            apiVersion: 'batch/v1',
            kind: 'Job',
            metadata,
            spec: {
                backoffLimit: 0,
                template: {
                    spec: {
                        containers,
                        volumes,
                        restartPolicy: "Never"
                    }
                }
            }
        }
    });
}