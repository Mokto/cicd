import { getWorkflows } from '../../utils/load-workflows';
import { parseWorkflow } from '../grpc';
import { Action } from '../../models/workflows';
import { BuildAction, Build } from '../../models/build';
import { cloneGithubProject } from '../git/latest';
import { runKanikoStep } from '../runners/kaniko';
import { patchOneBuild, insertOneBuild } from './dao';
import { rabbitMQ } from '../../db/rabbitmq';
import { watchBuildQueueName } from '../../queues/watch-build';

export const getWorkflowsInformations = async () => {
  const workflowsString = await getWorkflows();
  return await parseWorkflow(workflowsString);
};

export const initBuild = async (workflowIdentifier: string) => {
  const { workflows, actions } = await getWorkflowsInformations();
  const workflow = workflows.find(w => w.Identifier === workflowIdentifier);

  const build = await insertOneBuild({
    actions,
    workflow,
    workflowIdentifier,
    state: 'running',
    buildActions: actions.map(action => ({
      actionIdentifier: action.Identifier,
      state: 'pending',
    })),
  });

  await rabbitMQ.db.sendToQueue(
    watchBuildQueueName,
    Buffer.from(
      JSON.stringify({
        buildId: build._id,
      }),
    ),
    {
      persistent: true,
    },
  );

  return build;
};

const runBuildAction = async (build: Build, buildAction: BuildAction) => {
  const action = build.actions.find(action => buildAction.actionIdentifier === action.Identifier);
  const buildActionIndex = build.buildActions.findIndex(b => b.actionIdentifier === buildAction.actionIdentifier);

  build = await patchOneBuild(build._id, {
    [`buildActions.${buildActionIndex}.state`]: 'running',
  });

  let built = false;
  switch (action.Uses) {
    case '@github/clone':
      await cloneGithubProject(build._id, action.Args[0]);
      built = true;
      break;
    case '@docker/build':
      await runKanikoStep(build._id, action.Args[0]);
      break;

    default:
      console.log(action.Uses);
      throw new Error('This action does not exist');
  }

  if (built === true) {
    build = await patchOneBuild(build._id, {
      [`buildActions.${buildActionIndex}.state`]: 'completed',
    });
    await continueWorkflow(build);
  }
};

export const continueWorkflow = async (build: Build) => {
  const nextBuildActions = getNextActions(build);

  if (nextBuildActions.length === 0) {
    await patchOneBuild(build._id, {
      state: 'completed',
    });
    return;
  }

  await Promise.all(
    nextBuildActions.map(action =>
      runBuildAction(build, build.buildActions.find(buildAction => buildAction.actionIdentifier === action.Identifier)),
    ),
  );
};

const getNextActions = (build: Build): Action[] => {
  if (build.buildActions.every(buildAction => buildAction.state === 'pending')) {
    return getInitialBuildActions(build);
  }

  const doneBuildActions = build.buildActions.filter(action => action.state === 'completed');
  const doneBuildActionsIdentifiers = doneBuildActions.map(a => a.actionIdentifier);
  const undoneBuildActions = build.actions.filter(
    action => doneBuildActionsIdentifiers.indexOf(action.Identifier) === -1,
  );
  return undoneBuildActions.filter(buildAction => {
    if (typeof buildAction.Needs === 'string') {
      buildAction.Needs = [buildAction.Needs];
    }
    return buildAction.Needs.every(need => doneBuildActionsIdentifiers.indexOf(need) > -1);
  });
};

const getInitialBuildActions = (build: Build): Action[] => {
  if (typeof build.workflow.Resolves === 'string') {
    build.workflow.Resolves = [build.workflow.Resolves];
  }
  return build.workflow.Resolves.map(actionIdentifier => build.actions.find(a => a.Identifier === actionIdentifier));
};
