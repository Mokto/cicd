import {KubeConfig, Core_v1Api, Watch} from '@kubernetes/client-node';
import { kubeConfig } from './_api-client';

const watch = new Watch(kubeConfig);

export const watchNamespace = () => {
    console.log('Watch pods in namespace cicd');
    watch.watch('/api/v1/namespaces/cicd/pods', {}, (type, obj) => {
        // type
        // 'ADDED'
        // 'MODIFIED'
        // 'DELETED'
        const name = obj.metadata.name; 

        if (type === 'ADDED' && name.indexOf('api-') > -1) {
            watchPodLogs(name);
            // console.log(name);
        }
    }, (err) => {
        console.log(err);
    });

        
}


const watchPodLogs = (name: string) => {
    console.log(name);
    // watch.watch(`/api/v1/namespaces/cicd/pods/${name}/log`, {}, () => {
    //     console.log('LOG FOUND')
    // }, (err) => {
    //     console.log(err);
    // });
    // console.log('Now watching...');
}
