import express, { Router } from 'express';
import { initKanikoPod } from './kaniko/pod';
import { getLatestOfGit } from './git/latest';
// import { parseWorkflow } from './grpc';
// import { getWorkflows } from './utils/load-workflows';
import { watchKubernetes } from './kubernetes/watch';
import { generateRandomHash } from './utils/random-hash';


export const loadRoutes = (router: Router) => {

    // k8sClient
    watchKubernetes();





    router.post('/build', async (_, res) => {

        const hash = await generateRandomHash();
          
        await getLatestOfGit();
        await initKanikoPod(`kaniko-${hash}`);
        
        res.send({
            message: '!'
        })
    });

    return router;
}
