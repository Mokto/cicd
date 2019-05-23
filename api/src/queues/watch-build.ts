import { rabbitMQ } from '../db/rabbitmq';
import { ConsumeMessage } from 'amqplib';
import { findOneBuildById } from '../modules/builds/dao';
import { continueWorkflow } from '../modules/builds/service';

export const watchBuildQueueName = 'watch';

export const assertQueue = async () => {
  await rabbitMQ.db.assertQueue(watchBuildQueueName, { durable: true });
};

const listen = async () => {
  await assertQueue();

  rabbitMQ.db.consume(watchBuildQueueName, async (message: ConsumeMessage) => {
    const content = JSON.parse(message.content.toString('utf-8'));

    const build = await findOneBuildById(content.buildId);
    await continueWorkflow(build);

    console.log('ACK BUILD');
    rabbitMQ.db.ack(message);
  });

  console.debug(`Worker started`);
};

export const loadBuildWatcher = async () => {
  rabbitMQ.onReconnect(() => listen());

  await rabbitMQ.waitReady();
  listen();
};

export const sendBuildToQueue = async (buildId: string) => {
  return rabbitMQ.db.sendToQueue(
    watchBuildQueueName,
    Buffer.from(
      JSON.stringify({
        buildId,
      }),
    ),
    {
      persistent: true,
    },
  );
};
