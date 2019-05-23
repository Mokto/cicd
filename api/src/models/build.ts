import { Workflow, Action } from './workflows';

export interface Build {
  _id: string;
  state: 'running' | 'completed' | 'failed';
  createdAt: Date;
  updatedAt: Date;
  workflow: Workflow;
  actions: Action[];
  workflowIdentifier: string;
  buildActions: BuildAction[];
}

export interface BuildAction {
  actionIdentifier: string;
  state: 'pending' | 'running' | 'completed' | 'failed';
  jobName?: string;
  podName?: string;
  jobState?: 'Pending' | 'Running' | 'Succeeded';
  // logs: string;
}
