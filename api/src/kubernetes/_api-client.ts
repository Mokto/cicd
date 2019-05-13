
import {KubeConfig, Core_v1Api} from '@kubernetes/client-node';

const kubeConfig = new KubeConfig();
kubeConfig.loadFromDefault();
export const k8sApi = kubeConfig.makeApiClient(Core_v1Api);