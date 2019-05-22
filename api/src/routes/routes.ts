import { Router } from 'express';
import { parseWorkflow } from '../modules/grpc';
import { getWorkflows } from '../utils/load-workflows';
import { initBuild } from '../modules/builds/service';

export const loadRoutes = (router: Router) => {
  router.get('/workflows', async (_, res) => {
    const workflowsString = await getWorkflows();
    const workflows = await parseWorkflow(workflowsString);

    res.send({ ...workflows });
  });

  router.post('/build', async (req, res) => {
    const { workflowIdentifier } = req.body;

    const build = initBuild(workflowIdentifier);

    res.send(build);
  });

  return router;
};
