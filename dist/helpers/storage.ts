import {Dictionary} from '../helpers';

export enum StorageType {
    LocalStorage,
    SessionStorage
}

export class Storage<T> extends Dictionary<T>{
    private _storage = null;

    constructor(private _container: string, type?: StorageType) {
        super();
        type = type || StorageType.LocalStorage;
        this.switchStorage(type);
    }

    switchStorage(type: StorageType) {
        this._storage = type === StorageType.LocalStorage ? localStorage : sessionStorage;
        if (!this._storage.hasOwnProperty(this._container)) {
            this._storage[this._container] = "";
        }

        this._load();
    }

    add(item: string, value: T): T {
        super.add(item, value);
        this._save();
        return value;
    }

    remove(item: string) {
        var value = super.remove(item);
        this._save();
        return value;
    }

    clear() {
        super.clear();
        this._storage[this._container] = "";
    }

    static clear() {
        window.localStorage.clear();
        window.sessionStorage.clear();
    }

    private _save() {
        this._storage[this._container] = JSON.stringify(this.items);
    }

    private _load() {
        super.clear();
        if (this._storage[this._container] == null) return;
        this.items = JSON.parse(this._storage[this._container]);
    }
}
