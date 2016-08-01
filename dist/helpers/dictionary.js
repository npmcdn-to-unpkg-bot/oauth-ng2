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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGljdGlvbmFyeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL2RpY3Rpb25hcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0lBQ0ksb0JBQXNCLEtBQThCO1FBQTlCLFVBQUssR0FBTCxLQUFLLENBQXlCO1FBQ2hELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDO1lBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7SUFDNUMsQ0FBQztJQUVELHdCQUFHLEdBQUgsVUFBSSxHQUFXO1FBQ1gsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNyQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRUQsd0JBQUcsR0FBSCxVQUFJLEdBQVcsRUFBRSxLQUFRO1FBQ3JCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7WUFBQyxNQUFNLElBQUksS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDL0QsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ25DLENBQUM7O0lBRUQsMEJBQUssR0FBTDtRQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDO1lBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxvREFBb0QsQ0FBQyxDQUFDO1FBQzlGLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6QixFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDO1lBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxD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