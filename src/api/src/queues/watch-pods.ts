import { rabbitMQ } from '../db/rabbitmq';
import { ConsumeMessage } from 'amqplib';
import { watchPodFromJob } from '../modules/kubernetes/watch';

export const watchPodsQueueName = 'watchPods2';

export const assertQueue = async () => {
  await rabbitMQ.db.assertQueue(watchPodsQueueName, { durable: true });
};

const listen = async () => {
  await assertQueue();

  rabbitMQ.db.consume(watchPodsQueueName, async (message: ConsumeMessage) => {
    const content = JSON.parse(message.content.toString('utf-8'));

    await watchPodFromJob(content.jobName);

    console.log('ACK WATCH POD');
    rabbitMQ.db.ack(message);
  });

  console.debug(`Worker started`);
};

export const loadWatcher = async () => {
  rabbitMQ.onReconnect(() => listen());

  await rabbitMQ.waitReady();
  listen();
};

export const sendPodWatcherToQueue = async (jobName: string) => {
  return rabbitMQ.db.sendToQueue(
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
};
