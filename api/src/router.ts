import { Router } from 'express';
import { getLatestOfGit } from './git/latest';
import { parseWorkflow } from './grpc';
import { getWorkflows } from './utils/load-workflows';
import { runKanikoStep } from './runners/kaniko';
import { loadWatcher } from './queues/watch-pods';
import { loadWebsocketServer } from './sockets';
// import { watchAndDelete } from './kubernetes/watch';

export const loadRoutes = (router: Router) => {
  // k8sClient
  // watchKubernetes();

  if (process.env.NODE_ENV !== 'production') {
    loadWatcher();
    loadWebsocketServer();
  }

  router.get('/workflows', async (_, res) => {
    const workflowsString = await getWorkflows();
    const workflows = await parseWorkflow(workflowsString);

    res.send({ ...workflows });
  });

  router.post('/build', async (req, res) => {
    const { workflowIdentifier } = req.body;

    const workflowsString = await getWorkflows();
    const { workflows } = await parseWorkflow(workflowsString);
    const workflow = workflows.find(w => w.Identifier === workflowIdentifier);

    console.log(workflow);
    await getLatestOfGit();
    await runKanikoStep('test');

    res.send();
  });

  return router;
};
