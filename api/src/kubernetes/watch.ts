import { K8S } from "./_api";
const JSONStream = require('json-stream')

export const testKubernetes = async () => {
    await K8S.waitReady();

        
    const stream = await K8S.client.api.v1.namespaces('cicd').pods.getStream();

      const jsonStream = new JSONStream()
      stream.pipe(jsonStream)
      jsonStream.on('data', (object: any) => {
          console.log(object.items.map(i => i.metadata.name));
        //   console.log('Event');
        //   console.log(object);
      });

      console.log('LISTENING')
    
    // const stream = await K8S.client.api.v1.watch.namespaces('cicd').pods('kaniko-*').get({
    //     qs: {
    //       container: 'kaniko'
    //     }
    //   });

    //   const jsonStream = new JSONStream()
    //   stream.pipe(jsonStream)
    //   jsonStream.on('data', (object: any) => {
    //       console.log('Event');
    //       console.log(object);
    //   });

    //   console.log('LISTENING')
}