import { Router } from 'express';
import { getLatestOfGit } from './git/latest';
// import { parseWorkflow } from './grpc';
// import { getWorkflows } from './utils/load-workflows';
import { runKanikoStep } from './runners/kaniko';
import { loadWatcher } from './queues/watch-pods';
// import { watchAndDelete } from './kubernetes/watch';


export const loadRoutes = (router: Router) => {

    // k8sClient
    // watchKubernetes();

    if (process.env.NODE_ENV !== 'production') {
        loadWatcher();
        // watchAndDelete();
    }

    router.post('/build', async (_, res) => {
        await getLatestOfGit();
        await runKanikoStep('test');
        
        res.send({
            message: '!'
        })
    });

    return router;
}
