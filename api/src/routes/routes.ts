import { Router } from 'express';
import { getLatestOfGit } from '../modules/git/latest';
import { parseWorkflow } from '../modules/grpc';
import { getWorkflows } from '../utils/load-workflows';
import { runKanikoStep } from '../modules/runners/kaniko';

export const loadRoutes = (router: Router) => {
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
