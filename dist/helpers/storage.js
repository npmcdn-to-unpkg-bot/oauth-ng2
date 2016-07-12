"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var dictionary_1 = require('./dictionary');
(function (StorageType) {
    StorageType[StorageType["LocalStorage"] = 0] = "LocalStorage";
    StorageType[StorageType["SessionStorage"] = 1] = "SessionStorage";
})(exports.StorageType || (exports.StorageType = {}));
var StorageType = exports.StorageType;
var Storage = (function (_super) {
    __extends(Storage, _super);
    function Storage(_container, type) {
        _super.call(this);
        this._container = _container;
        this._storage = null;
        type = type || StorageType.LocalStorage;
        this.switchStorage(type);
    }
    Storage.prototype.switchStorage = function (type) {
        this._storage = type === StorageType.LocalStorage ? localStorage : sessionStorage;
        if (!this._storage.hasOwnProperty(this._container)) {
            this._storage[this._container] = null;
        }
        this._load();
    };
    Storage.prototype.add = function (item, value) {
        _super.prototype.insert.call(this, item, value);
        this._save();
        return value;
    };
    Storage.prototype.remove = function (item) {
        var value = _super.prototype.remove.call(this, item);
        this._save();
        return value;
    };
    Storage.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this._storage[this._container] = null;
    };
    Storage.clear = function () {
        window.localStorage.clear();
        window.sessionStorage.clear();
    };
    Storage.prototype._save = function () {
        this._storage[this._container] = JSON.stringify(this.items);
    };
    Storage.prototype._load = function () {
        _super.prototype.clear.call(this);
        this.items = JSON.parse(this._storage[this._container]);
        if (this.items == null)
            this.items = {};
        return this.items;
    };
    return Storage;
}(dictionary_1.Dictionary));
exports.Storage = Storage;
//# sourceMappingURL=storage.js.map