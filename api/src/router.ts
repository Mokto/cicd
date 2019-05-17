import express, { Router } from 'express';
import { initKanikoPod } from './kaniko/pod';
// import { getLatestOfGit } from './git/latest';
// import { parseWorkflow } from './grpc';
// import { getWorkflows } from './utils/load-workflows';
import { watchNamespace } from './kubernetes/watch';

export const loadRoutes = (router: Router) => {

    // getLatestOfGit();
    watchNamespace();

    // const a = async () => {
    //     const workflow = getWorkflows();
    //     const workflowResponse = await parseWorkflow(workflow);
    //     console.log(workflowResponse.Actions)
    // }
    // a();

    router.get('/', async (_, res) => {
          
        try {
            const {body} = await initKanikoPod('cicd');
            console.log(body);
        } catch (e) {
            console.error(e);
            return res.send({error: e.message || e})
        }
        
        res.send({
            message: 'Pod created'
        })
    });

    router.get('/logs', async (_, res) => {
          
        try {
            const {body} = await initKanikoPod('cicd');
            console.log(body);
        } catch (e) {
            console.error(e);
            return res.send({error: e.message || e})
        }
        
        res.send({
            message: 'Pod created'
        })
    });

    return router;
}
