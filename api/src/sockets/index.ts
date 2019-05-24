import * as WebSocket from 'ws';
import { notifyBuildChange } from '../modules/builds/dao';

const connections: WebSocket[] = [];

export const loadWebsocketServer = () => {
  const wss = new WebSocket.Server({
    port: 8081,
    //   perMessageDeflate: {
    //     zlibDeflateOptions: {
    //       // See zlib defaults.
    //       chunkSize: 1024,
    //       memLevel: 7,
    //       level: 3
    //     },
    //     zlibInflateOptions: {
    //       chunkSize: 10 * 1024
    //     },
    //     // Other options settable:
    //     clientNoContextTakeover: true, // Defaults to negotiated value.
    //     serverNoContextTakeover: true, // Defaults to negotiated value.
    //     serverMaxWindowBits: 10, // Defaults to negotiated value.
    //     // Below options specified as default values.
    //     concurrencyLimit: 10, // Limits zlib concurrency for perf.
    //     threshold: 1024 // Size (in bytes) below which messages
    //     // should not be compressed.
    //   }
  });

  wss.on('connection', ws => {
    connections.push(ws);

    ws.onclose = () => {
      connections.splice(connections.indexOf(ws), 1);
    };

    notifyBuildChange(ws);
  });

  console.log('Websocket server started on port 8081');
};

export const sendWebsocketMessage = (eventName: string, data: any, ws?: WebSocket) => {
  const dataSent = JSON.stringify({ eventName, data });

  if (ws) {
    return ws.send(dataSent);
  }
  connections.forEach(c => c.send(dataSent));
};
