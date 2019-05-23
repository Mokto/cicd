import { Build } from '../../models/build';
import { mongo } from '../../db/mongodb';
import { ObjectId } from 'bson';

export const insertOneBuild = async (build: Partial<Build>): Promise<Build> => {
  build.createdAt = new Date();
  build.updatedAt = new Date();
  const res = await mongo.db.collection('builds').insertOne(build);
  return res.ops[0];
};

export const findOneBuildById = async (_id: string): Promise<Build> => {
  return mongo.db.collection('builds').findOne({ _id: new ObjectId(_id) });
};

export const findOneBuildByJobName = async (jobName: string): Promise<Build> => {
  return mongo.db.collection('builds').findOne({ buildActions: { $elemMatch: { jobName } } });
};

export const patchOneBuild = async (_id: string, updateValue: any): Promise<Build> => {
  const res = await mongo.db.collection('builds').findOneAndUpdate(
    { _id: new ObjectId(_id) },
    {
      $set: {
        updatedAt: new Date(),
        ...updateValue,
      },
    },
    { returnOriginal: false },
  );
  return res.value;
};
