import git from 'simple-git/promise';
const remote = `https://github.com/hashicorp/docker-vault`;

import fs from 'fs';

export const getLatestOfGit = async () => {
    try {
        if (!fs.existsSync('./workdir')) {
            fs.mkdirSync('./workdir');
        }
        // if (fs.existsSync('./workdir/sales-ext')) {
        //     fs.rmdirSync('./workdir/sales-ext');
        // }
        const shouldClone = fs.existsSync('./workdir/vault');

        const repo: any = shouldClone ?
            git('./workdir/vault') :
            git('./workdir').silent(true).clone(remote, './vault')

        if (!shouldClone) {
            const status = await repo.status();    
        }
        
        // console.log(status);
        console.log('finished')
    } catch (e) {
        console.error(e);
    }
}