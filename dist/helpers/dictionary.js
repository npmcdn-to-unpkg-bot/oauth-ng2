"use strict";
var Dictionary = (function () {
    function Dictionary(items) {
        this.items = items;
        if (this.items == null)
            this.items = {};
    }
    Dictionary.prototype.get = function (key) {
        if (!this.contains(key))
            return null;
        return this.items[key];
    };
    Dictionary.prototype.add = function (key, value) {
        if (this.contains(key))
            throw new Error('Key already exists.');
        return this.insert(key, value);
    };
    ;
    Dictionary.prototype.first = function () {
        if (this.items == null)
            throw new Error('Dictionary isn\'t initialized. Call \'new\' first.');
        var key = this.keys()[0];
        if (key != null)
            return this.items[key];
    };
    Dictionary.prototype.insert = function (key, value) {
        if (this.items == null)
            throw new Error('Dictionary isn\'t initialized. Call \'new\' first.');
        if (value == null)
            throw new Error('Value expected. Got ' + value);
        this.items[key] = value;
        return value;
    };
    Dictionary.prototype.remove = function (key) {
        if (!this.contains(key))
            throw new Error('Key not found.');
        var value = this.items[key];
        delete this.items[key];
        return this.insert(key, value);
    };
    ;
    Dictionary.prototype.clear = function () {
        this.items = {};
    };
    Dictionary.prototype.contains = function (key) {
        if (key == null)
            throw new Error('Key cannot be null or undefined');
        if (this.items == null)
            throw new Error('Dictionary isn\'t initialized. Call \'new\' first.');
        return this.items.hasOwnProperty(key);
    };
    Dictionary.prototype.keys = function () {
        if (this == null)
            throw new Error('Dictionary isn\'t initialized. Call \'new\' first.');
        return Object.keys(this.items);
    };
    Dictionary.prototype.values = function () {
        if (this == null)
            throw new Error('Dictionary isn\'t initialized. Call \'new\' first.');
        return Array.map(this.keys(), function (key) {
            return this.items[key];
        });
    };
    Dictionary.prototype.lookup = function () {
        return this.keys().length ? this.items : null;
    };
    Object.defineProperty(Dictionary.prototype, "count", {
        get: function () {
            return this.values().length;
        },
        enumerable: true,
        configurable: true
    });
    ;
    return Dictionary;
}());
exports.Dictionary = Dictionary;
//# sourceMappingURL=dictionary.js.map