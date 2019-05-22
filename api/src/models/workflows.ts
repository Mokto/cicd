export interface Action {
  Identifier: string;
  Uses: string;
  Needs: string | string[];
  Runs: string | string[];
  Args: string | string[];
  Env: {
    [key: string]: string;
  };
  Secrets: string[];
}

export interface Workflow {
  Identifier: string;
  On: 'push';
  Resolves: string | string[];
}

export interface WorkflowResponse {
  actions: Action[];
  workflows: Workflow[];
}
