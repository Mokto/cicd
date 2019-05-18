
import fs from 'fs';

export const getWorkflows = (): string => {
    const workflow = fs.readFileSync('./src/main.workflow', 'utf8');

    return workflow;
}
