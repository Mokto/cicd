import { K8S } from "./_api";
import { config } from "../config";

export const deleteJob = async (jobName: string, podName: string) => {
    await K8S.waitReady();

    await K8S.client.apis.batch.v1.namespaces(config.namespace).jobs(jobName).delete();
    return K8S.client.api.v1.namespaces(config.namespace).pods(podName).delete();
}