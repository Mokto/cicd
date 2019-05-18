import { K8S } from "./_api";

export const createJob = async (namespace: string, metadata: any, containers: any[], volumes: any[] = []) => {
    await K8S.waitReady();

    try {
        await K8S.client.apis.batch.v1.namespaces(namespace).jobs.delete(metadata.name);
    } catch{
        console.log('Cannot delete')
    }
    
    setTimeout(async () => {
        // console.log
        await K8S.client.apis.batch.v1.namespaces(namespace).jobs.post({
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
    }, 5000);
}