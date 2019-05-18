export interface IAction {
    Identifier: string;
    uses: string;
    needs: string | string[];
    runs: string | string[];
    args: string | string[];
    env: {
        [key: string]: string;
    };
    secrets:  string[];
}

export interface IWorkflow {
    Identifier: string;
    on: 'push';
    resolves: string | string[];
}

export interface IWorkflowResponse {
    actions: IAction[];
    workflows: IWorkflow[];
}