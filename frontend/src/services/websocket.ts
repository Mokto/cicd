type onCallback = (data: any) => void;

class WebsocketClient {
  public websocket!: WebSocket;
  private isConnected = false;
  private listeners: {
    [eventName: string]: onCallback[];
  } = {};

  public constructor() {
    this.initializeWebSocket();
  }

  public send(message: string) {
    this.websocket.send(message);
  }

  public on(eventName: string, cb: onCallback) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(cb);
  }

  private initializeWebSocket() {
    this.websocket = new WebSocket('ws://localhost:8081');
    this.websocket.onmessage = this.onMessage;
    this.websocket.onopen = this.onOpen;
    this.websocket.onclose = this.onClose;
    // this.websocket.onerror = e => {
    //   console.log('Error', e);
    // };
  }

  private onMessage = (ev: MessageEvent) => {
    const data = JSON.parse(ev.data);
    const eventName = data.eventName;

    if (this.listeners[eventName]) {
      this.listeners[eventName].forEach(cb => cb(data.data));
    }
  };

  private onOpen = () => {
    this.isConnected = true;
  };

  private onClose = () => {
    this.isConnected = false;
    setTimeout(() => {
      this.initializeWebSocket();
    }, 100);
  };
}

export const websocket = new WebsocketClient();
