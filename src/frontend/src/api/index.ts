import axios from 'axios';
import { WorkflowResponse } from '../../../common/models/workflows';

export const startBuildApi = async (workflowIdentifier: string) => {
  return axios('http://localhost:8080/build', {
    method: 'POST',
    data: {
      workflowIdentifier,
    },
  });
};

export const getWorkflowsApi = async (): Promise<WorkflowResponse> => {
  const response = await axios('http://localhost:8080/workflows');
  return response.data;
};
