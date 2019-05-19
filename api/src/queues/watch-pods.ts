import { rabbitMQ } from '../db/rabbitmq';
import { ConsumeMessage } from 'amqplib';
import { watchPodFromJob } from '../kubernetes/watch';

export const watchPodsQueueName = 'watchPods2';

export const assertQueue = async () => {
  await rabbitMQ.db.assertQueue(watchPodsQueueName, { durable: true });
};

const listen = async () => {
  await assertQueue();

  rabbitMQ.db.consume(watchPodsQueueName, async (message: ConsumeMessage) => {
    const content = JSON.parse(message.content.toString('utf-8'));

    await watchPodFromJob(content.jobName);

    console.log('ACK');
    rabbitMQ.db.ack(message);
  });

  console.debug(`Worker started`);
};

export const loadWatcher = async () => {
  rabbitMQ.onReconnect(() => listen());

  await rabbitMQ.waitReady();
  listen();
};
