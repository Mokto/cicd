import { createJob } from '../kubernetes/createJob';
import { generateRandomHash } from '../../utils/random-hash';
import { rabbitMQ } from '../../db/rabbitmq';
import { watchPodsQueueName } from '../../queues/watch-pods';

export const runDockerStep = async (containerSpec: any) => {
  const hash = await generateRandomHash();

  const jobName = `runner-${hash}`;

  await rabbitMQ.db.sendToQueue(
    watchPodsQueueName,
    Buffer.from(
      JSON.stringify({
        jobName,
      }),
    ),
    {
      persistent: true,
    },
  );

  return createJob(jobName, containerSpec);
};
