import { WorkflowResponse } from '../../../../common/models/workflows';

import * as grpc from 'grpc';
import * as protoLoader from '@grpc/proto-loader';

const packageDefinition = protoLoader.loadSync(`./src/modules/grpc/github-actions.proto`, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const protos = grpc.loadPackageDefinition(packageDefinition).protos as any;
const client = new protos.GithubActions('go-service:7777', grpc.credentials.createInsecure());

export const parseWorkflow = async (fileContent: string): Promise<WorkflowResponse> => {
  return new Promise((resolve, reject) => {
    client.ParseWorkflow({ fileContent }, (err: Error, res: WorkflowResponse) => {
      if (err) {
        return reject(err);
      }
      resolve(res);
    });
  });
};
