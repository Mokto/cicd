interface Config {
  namespace: string;
  mongo: {
    host: string;
    port: number;
    database: string;
  };
}

export const config: Config = {
  namespace: 'cicd',
  mongo: {
    host: 'cicd-mongodb',
    port: 27017,
    database: 'default',
  },
};
