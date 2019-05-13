import express, { Router } from 'express';
import {KubeConfig, Core_v1Api, V1Pod, V1ObjectMeta, V1PodSpec, V1Container} from '@kubernetes/client-node';
import { createPod } from './kubernetes/pod';

const kc = new KubeConfig();
kc.loadFromDefault();
const k8sApi = kc.makeApiClient(Core_v1Api);

module.exports = (): Router => {
    const router = express.Router();

    router.get('/', async (_, res) => {
          
        try {
            const {body} = await createPod('default', [{
                name: 'kaniko',
                image: 'gcr.io/kaniko-project/executor:latest',
                args: [
                    "--dockerfile=/git/official-images/Dockerfile",
                    "--context=dir://git/official-images",
                    "--destination=cicd-docker-registry:5000/test/develop:1", 
                    "--insecure",
                    "--insecure-pull",
                    "--reproducible",
                    "--cache=true",
                    "--verbosity=debug"
                ]
            }], {
                name: 'kaniko'
            });
        } catch (e) {
            // console.error(e);
        }
        
        
        res.send({
            message: 'Pod created'
        })
    });

    return router;
}