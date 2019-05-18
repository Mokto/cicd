import { Router } from 'express';
import { getLatestOfGit } from './git/latest';
// import { parseWorkflow } from './grpc';
// import { getWorkflows } from './utils/load-workflows';
import { runKanikoStep } from './runners/kaniko';
import { loadWatcher } from './queues/watch-pods';


export const loadRoutes = (router: Router) => {

    // k8sClient
    // watchKubernetes();


    loadWatcher();


    router.post('/build', async (_, res) => {
        await getLatestOfGit();
        await runKanikoStep('test');
        
        res.send({
            message: '!'
        })
    });

    return router;
}
