import { createPod } from "../kubernetes/pod";

export const initKanikoPod = (namespace: string) => {
    return createPod(namespace, {
        name: 'kaniko'
    }, [{
        name: 'kaniko',
        image: 'gcr.io/kaniko-project/executor:latest',
        args: [
            "--dockerfile=/git/vault/0.X/Dockerfile",
            "--context=dir://git/vault/0.X",
            "--destination=cicd-docker-registry:5000/test/develop:1", 
            "--insecure",
            "--insecure-pull",
            "--reproducible",
            "--cache=true",
            // "--verbosity=debug"
        ],
        volumeMounts: [{
            name: "git-volume",
            mountPath: "/git"
        }]
    }], [{
        name: 'git-volume',
        persistentVolumeClaim: {
            claimName: 'pvc-workdir'
        }
    }])
}