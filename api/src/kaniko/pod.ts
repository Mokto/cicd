import { createJob } from "../kubernetes/createJob";

export const initKanikoPod = (name: string) => {
    return createJob({
        name: `runner-${name}`
    }, [{
        name: 'kaniko',
        image: 'gcr.io/kaniko-project/executor:latest',
        args: [
            "--dockerfile=/git/test/Dockerfile",
            "--context=dir://git/test",
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