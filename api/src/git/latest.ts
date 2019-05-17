import git from 'simple-git/promise';
const remote = `https://github.com/Mokto/docker-kaniko-test.git`;

import fs from 'fs';

export const getLatestOfGit = async () => {
    try {
        if (!fs.existsSync('./workdir')) {
            fs.mkdirSync('./workdir');
        }
        // if (fs.existsSync('./workdir/sales-ext')) {
        //     fs.rmdirSync('./workdir/sales-ext');
        // }
        if (!fs.existsSync('./workdir/test')) {
            console.log('Cloning project');
            await git('./workdir').silent(true).clone(remote, './test')
        }

        const repo: any = git('./workdir/test');
        // const status = await repo.status();    
        // console.log(status);
        
        // console.log(status);
        console.log('finished')
    } catch (e) {
        console.error(e);
    }
}