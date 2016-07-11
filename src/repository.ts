import {IDictionary, IProvider} from './types';

export class Repository<T extends IProvider> {
    data: IDictionary<T> = {};

    constructor(initialize?: T[]) {
        if (initialize) {
            this.add(initialize);
        }
    }

    all(): T[] {
        if (!this.data) return;
        return _.values(this.data);
    }

    get(provider: string): T {
        if (!this.data) return;
        return this.data[provider];
    }

    add(config: T): T;
    add(config: T[]): T[];
    add(config): any {
        if (!config) return;

        if (_.isObject(config)) {
            this.data[config.provider] = config;
            return this.data[config.provider];
        }

        if (_.isArray(config)) {
            return _.map(config, (value: T) => {
                this.data[value.provider] = value;
                return this.data[value.provider];
            });
        }
    }

    remove(provider: string): T {
        if (!(!!this.data)) return;
        let value = this.data[provider];
        delete this.data[provider];
        return value;
    }
}