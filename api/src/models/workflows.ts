export interface Action {
  Identifier: string;
  uses: string;
  needs: string | string[];
  runs: string | string[];
  args: string | string[];
  env: {
    [key: string]: string;
  };
  secrets: string[];
}

export interface Workflow {
  Identifier: string;
  on: 'push';
  resolves: string | string[];
}

export interface WorkflowResponse {
  actions: Action[];
  workflows: Workflow[];
}
