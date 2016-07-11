import {Inject, Injectable} from 'angular2/core'
import {Repository} from './repository';
import {IProvider, StorageTypes} from './types';

@Injectable()
export default class StorageManager<T extends IProvider> extends Repository<T> {
    private _storage: Storage;

    constructor(type: StorageTypes = StorageTypes.LocalStorage) {
        super();
        this.switchStorage(type);
        console.log(Date.now() + ': Storage service constructed');
    }

    private _serialize(data: any): string {
        return JSON.stringify(data);
    }

    private _deserialize<T>(data: string): T {
        return JSON.parse(data) as T;
    }

    load() {
        let count = 0;
        _.each(this._storage, (item: T) => {
            if (!item) return;
            count++;
            console.log(item);
            super.add(item);
        });

        console.log("Loaded " + count + " Tokens from storage");
    }

    switchStorage(type: StorageTypes) {
        this._storage = type === StorageTypes.LocalStorage ? localStorage : sessionStorage;
        this.load();
    }

    get(provider: string): T {
        let localData: T = super.get(provider);
        if (localData) return localData;

        localData = this._deserialize<T>(this._storage.getItem(provider));
        return super.add(localData);
    }

    add(config: T);
    add(config: T[])
    add(config): any {
        if (!config || !config.provider) return null;
        this._storage.setItem((config as T).provider, this._serialize(config));
        return super.add(config);
    }

    remove(provider: string): T {
        this._storage.removeItem(provider);
        return super.remove(provider);
    }
}