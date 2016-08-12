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
/**
 * Helper for creating and querying Local Storage or Session Storage.
 * @see Uses {@link Dictionary} to create an in-memory copy of
 * the storage for faster reads. Writes update the actual storage.
 */
var Storage = (function (_super) {
    __extends(Storage, _super);
    /**
     * @constructor
     * @param {string} container Container name to be created in the LocalStorage.
     * @param {StorageType} type[optional] Storage Type to be used, defaults to Local Storage.
    */
    function Storage(_container, type) {
        _super.call(this);
        this._container = _container;
        this._storage = null;
        type = type || StorageType.LocalStorage;
        this.switchStorage(type);
    }
    /**
     * Switch the storage type
     * Switches the storage type and then reloads the in-memory collection
     *
     * @type {StorageType} type The desired storage to be used
     */
    Storage.prototype.switchStorage = function (type) {
        this._storage = type === StorageType.LocalStorage ? localStorage : sessionStorage;
        if (!this._storage.hasOwnProperty(this._container)) {
            this._storage[this._container] = null;
        }
        this._load();
    };
    /**
     * Add an item
     * Extends Dictionary's implementation with a save to the storage
     */
    Storage.prototype.add = function (item, value) {
        _super.prototype.insert.call(this, item, value);
        this._save();
        return value;
    };
    /**
     * Remove an item
     * Extends Dictionary's implementation with a save to the storage
     */
    Storage.prototype.remove = function (item) {
        var value = _super.prototype.remove.call(this, item);
        this._save();
        return value;
    };
    /**
     * Clear the storage
     * Extends Dictionary's implementation with a save to the storage
     */
    Storage.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this._storage[this._container] = null;
    };
    /**
     * Clear all storages
     * completely clears all storages
     */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL3N0b3JhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsMkJBQTJCLGNBQWMsQ0FBQyxDQUFBO0FBRTFDLFdBQVksV0FBVztJQUNuQiw2REFBWSxDQUFBO0lBQ1osaUVBQWMsQ0FBQTtBQUNsQixDQUFDLEVBSFcsbUJBQVcsS0FBWCxtQkFBVyxRQUd0QjtBQUhELElBQVksV0FBVyxHQUFYLG1CQUdYLENBQUE7QUFFRDs7OztHQUlHO0FBQ0g7SUFBZ0MsMkJBQWE7SUFHekM7Ozs7TUFJRTtJQUNGLGlCQUFvQixVQUFrQixFQUFFLElBQWtCO1FBQ3RELGlCQUFPLENBQUM7UUFEUSxlQUFVLEdBQVYsVUFBVSxDQUFRO1FBUDlCLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFTcEIsSUFBSSxHQUFHLElBQUksSUFBSSxXQUFXLENBQUMsWUFBWSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsK0JBQWEsR0FBYixVQUFjLElBQWlCO1FBQzNCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxLQUFLLFdBQVcsQ0FBQyxZQUFZLEdBQUcsWUFBWSxHQUFHLGNBQWMsQ0FBQztRQUNsRixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQzFDLENBQUM7UUFFRCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVEOzs7T0FHRztJQUNILHFCQUFHLEdBQUgsVUFBSSxJQUFZLEVBQUUsS0FBUTtRQUN0QixnQkFBSyxDQUFDLE1BQU0sWUFBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2IsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsd0JBQU0sR0FBTixVQUFPLElBQVk7UUFDZixJQUFJLEtBQUssR0FBRyxnQkFBSyxDQUFDLE1BQU0sWUFBQyxJQUFJLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDYixNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRDs7O09BR0c7SUFDSCx1QkFBSyxHQUFMO1FBQ0ksZ0JBQUssQ0FBQyxLQUFLLFdBQUUsQ0FBQztRQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLElBQUksQ0FBQztJQUMxQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksYUFBSyxHQUFaO1FBQ0ksTUFBTSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM1QixNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFFTyx1QkFBSyxHQUFiO1FBQ0ksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVPLHVCQUFLLEdBQWI7UUFDSSxnQkFBSyxDQUFDLEtBQUssV0FBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDeEQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUM7WUFBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUN4QyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBQ0wsY0FBQztBQUFELENBQUMsQUE3RUQsQ0FBZ0MsdUJBQVUsR0E2RXpDO0FBN0VZLGVBQU8sVUE2RW5CLENBQUEifQ==