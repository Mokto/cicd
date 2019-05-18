import express, { Router } from 'express';
import { initKanikoPod } from './kaniko/pod';
import { getLatestOfGit } from './git/latest';
// import { parseWorkflow } from './grpc';
// import { getWorkflows } from './utils/load-workflows';
import { testKubernetes } from './kubernetes/watch';

export const loadRoutes = (router: Router) => {

    // k8sClient
    testKubernetes();

    initKanikoPod('cicd');

    getLatestOfGit();
    // watchNamespace();
    testKubernetes();

    // const a = async () => {
    //     const workflow = getWorkflows();
    //     const workflowResponse = await parseWorkflow(workflow);
    //     console.log(workflowResponse.Actions)
    // }
    // a();

    router.get('/', async (_, res) => {
          
        try {
            await initKanikoPod('cicd');
            console.log('Pod inited');
        } catch (e) {
            console.error(e);
            return res.send({error: e.message || e})
        }
        
        res.send({
            message: 'Pod created'
        })
    });

    router.get('/logs', async (_, res) => {
          
        // try {
        //     const {body} = await initKanikoPod('cicd');
        //     console.log(body);
        // } catch (e) {
        //     console.error(e);
        //     return res.send({error: e.message || e})
        // }
        
        res.send({
            message: '!'
        })
    });

    return router;
}
