var PROTO_PATH = __dirname + '/github-actions.proto';

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const fs = require('fs');

const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
const protos = grpc.loadPackageDefinition(packageDefinition).protos;
const client = new protos.GithubActions('go-service:7777', grpc.credentials.createInsecure());

export const parse = () => {
    const protos = require('./github-actions_pb');

    const workflow = fs.readFileSync(__dirname + '/../main.workflow', 'utf8');
    // const client = new protos.GithubActions('localhost:7777', grpc.credentials.createInsecure())

    // console.log(workflow)
    const req = new protos.WorkflowRequest();
    req.setFilecontent('workflow')

    client.ParseWorkflow({fileContent: workflow}, (err, res) => {
        if (err) {

            console.log('Error');
            console.log(err);
            return;
        }
        console.log(res)
    })
}