import express, { Router } from 'express';
import { initKanikoPod } from './kaniko/pod';
import { getLatestOfGit } from './git/latest';
import { parse } from './grpc';

module.exports = (): Router => {
    const router = express.Router();

    getLatestOfGit();

    parse();

    router.get('/', async (_, res) => {
          
        try {
            const {body} = await initKanikoPod('cicd');
            console.log(body);
        } catch (e) {
            console.error(e);
            return res.send({error: e.message || e})
        }
        
        
        res.send({
            message: 'Pod created'
        })
    });

    return router;
}