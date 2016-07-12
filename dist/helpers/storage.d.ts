import { Dictionary } from './dictionary';
export declare enum StorageType {
    LocalStorage = 0,
    SessionStorage = 1,
}
export declare class Storage<T> extends Dictionary<T> {
    private _container;
    private _storage;
    constructor(_container: string, type?: StorageType);
    switchStorage(type: StorageType): void;
    add(item: string, value: T): T;
    remove(item: string): T;
    clear(): void;
    static clear(): void;
    private _save();
    private _load();
}
