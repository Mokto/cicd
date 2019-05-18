const Client = require('kubernetes-client').Client;
const config = require('kubernetes-client').config;

export class K8S {
    static client = new Client({ config: config.getInCluster() });

    static ready = false;
    static callbacks: Array<() => void> = [];

    static async init() {
        await K8S.client.loadSpec();
        this.ready = true;
        this.callbacks.forEach(cb => cb());
    }

    static async waitReady() {
        if (this.ready) {
            return;
        }
        return new Promise(resolve => {
            this.callbacks.push(resolve);
        });
    }
}

K8S.init();