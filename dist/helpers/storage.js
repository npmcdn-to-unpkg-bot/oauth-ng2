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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL3N0b3JhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsMkJBQTJCLGNBQWMsQ0FBQyxDQUFBO0FBRTFDLFdBQVksV0FBVztJQUNuQiw2REFBWSxDQUFBO0lBQ1osaUVBQWMsQ0FBQTtBQUNsQixDQUFDLEVBSFcsbUJBQVcsS0FBWCxtQkFBVyxRQUd0QjtBQUhELElBQVksV0FBVyxHQUFYLG1CQUdYLENBQUE7QUFFRDtJQUFnQywyQkFBYTtJQUd6QyxpQkFBb0IsVUFBa0IsRUFBRSxJQUFrQjtRQUN0RCxpQkFBTyxDQUFDO1FBRFEsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUY5QixhQUFRLEdBQUcsSUFBSSxDQUFDO1FBSXBCLElBQUksR0FBRyxJQUFJLElBQUksV0FBVyxDQUFDLFlBQVksQ0FBQztRQUN4QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRCwrQkFBYSxHQUFiLFVBQWMsSUFBaUI7UUFDM0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLEtBQUssV0FBVyxDQUFDLFlBQVksR0FBRyxZQUFZLEdBQUcsY0FBYyxDQUFDO1FBQ2xGLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDMUMsQ0FBQztRQUVELElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUQscUJBQUcsR0FBSCxVQUFJLElBQVksRUFBRSxLQUFRO1FBQ3RCLGdCQUFLLENBQUMsTUFBTSxZQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDYixNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRCx3QkFBTSxHQUFOLFVBQU8sSUFBWTtRQUNmLElBQUksS0FBSyxHQUFHLGdCQUFLLENBQUMsTUFBTSxZQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNiLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVELHVCQUFLLEdBQUw7UUFDSSxnQkFBSyxDQUFDLEtBQUssV0FBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQzFDLENBQUM7SUFFTSxhQUFLLEdBQVo7UUFDSSxNQUFNLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzVCLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDbEMsQ0FBQztJQUVPLHVCQUFLLEdBQWI7UUFDSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRU8sdUJBQUssR0FBYjtRQUNJLGdCQUFLLENBQUMsS0FBSyxXQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUN4RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQztZQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ3hDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFDTCxjQUFDO0FBQUQsQ0FBQyxBQWxERCxDQUFnQyx1QkFBVSxHQWtEekM7QUFsRFksZUFBTyxVQWtEbkIsQ0FBQSJ9