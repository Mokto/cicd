
import fs from 'fs';

export const getWorkflows = (): string => {
    const workflow = fs.readFileSync(__dirname + '/../main.workflow', 'utf8');

    return workflow;
}
