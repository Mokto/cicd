import axios from 'axios';
import { IWorkflowResponse } from '../../../api/src/models/workflows';

export const startBuildApi = async (workflowIdentifier: string) => {
    return axios('http://localhost:8080/build', {
        method: 'POST',
        data: {
            workflowIdentifier
        }
    });
}

export const getWorkflowsApi = async (): Promise<IWorkflowResponse> => {
    const response = await axios('http://localhost:8080/workflows');
    return response.data;
}