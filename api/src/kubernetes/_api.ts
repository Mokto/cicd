const Client = require('kubernetes-client').Client;
const config = require('kubernetes-client').config;

class K8S {
  public client = new Client({ config: config.getInCluster() });

  private ready = false;
  private callbacks: (() => void)[] = [];

  public constructor() {
    this.init();
  }

  private async init() {
    await this.client.loadSpec();
    this.ready = true;
    this.callbacks.forEach(cb => cb());
  }

  public async waitReady() {
    if (this.ready) {
      return;
    }
    return new Promise(resolve => {
      this.callbacks.push(resolve);
    });
  }
}

export const k8s = new K8S();
