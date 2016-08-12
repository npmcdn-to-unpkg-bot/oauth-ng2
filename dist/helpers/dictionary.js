"use strict";
/**
 * Helper for creating and querying Dictionaries.
 * A rudimentary alternative to ES6 Maps.
 */
var Dictionary = (function () {
    /**
     * @constructor
     * @param {object} items Initial seed of items.
    */
    function Dictionary(items) {
        this.items = items;
        if (this.items == null)
            this.items = {};
    }
    /**
     * Gets an item from the dictionary.
     *
     * @param {string} key The key of the item.
     * @return {object} Returns an item if found, else returns null.
     */
    Dictionary.prototype.get = function (key) {
        if (this.items == null)
            throw new Error('Dictionary isn\'t initialized. Call \'new\' first.');
        if (!this.contains(key))
            return null;
        return this.items[key];
    };
    /**
     * Adds an item into the dictionary.
     * If the key already exists, then it will throw.
     *
     * @param {string} key The key of the item.
     * @param {object} value The item to be added.
     * @return {object} Returns the added item.
     */
    Dictionary.prototype.add = function (key, value) {
        if (this.contains(key))
            throw new Error('Key already exists.');
        return this.insert(key, value);
    };
    ;
    /**
     * Gets the first time of the dictionary
     *
     * @return {object} Returns the first item in the dictionary.
     */
    Dictionary.prototype.first = function () {
        if (this.items == null)
            throw new Error('Dictionary isn\'t initialized. Call \'new\' first.');
        var key = this.keys()[0];
        if (key != null)
            return this.items[key];
    };
    /**
     * Inserts an item into the dictionary.
     *
     * @param {string} key The key of the item.
     * @param {object} value The item to be added.
     * @return {object} Returns the added item.
     */
    Dictionary.prototype.insert = function (key, value) {
        if (this.items == null)
            throw new Error('Dictionary isn\'t initialized. Call \'new\' first.');
        if (value == null)
            throw new Error('Value expected. Got ' + value);
        this.items[key] = value;
        return value;
    };
    /**
     * Removes an item from the dictionary.
     * If the key doesnt exist, then it will throw.
     *
     * @param {string} key The key of the item.
     * @return {object} Returns the deleted item.
     */
    Dictionary.prototype.remove = function (key) {
        if (!this.contains(key))
            throw new Error('Key not found.');
        var value = this.items[key];
        delete this.items[key];
        return this.insert(key, value);
    };
    ;
    /**
     * Clears the dictionary.
     */
    Dictionary.prototype.clear = function () {
        this.items = {};
    };
    /**
     * Check if the dictionary contains the given key.
     *
     * @param {string} key The key of the item.
     * @return {boolean} Returns true if the key was found.
     */
    Dictionary.prototype.contains = function (key) {
        if (key == null)
            throw new Error('Key cannot be null or undefined');
        if (this.items == null)
            throw new Error('Dictionary isn\'t initialized. Call \'new\' first.');
        return this.items.hasOwnProperty(key);
    };
    /**
     * Lists all the keys in the dictionary.
     *
     * @return {array} Returns all the keys.
     */
    Dictionary.prototype.keys = function () {
        if (this == null)
            throw new Error('Dictionary isn\'t initialized. Call \'new\' first.');
        return Object.keys(this.items);
    };
    /**
     * Lists all the values in the dictionary.
     *
     * @return {array} Returns all the values.
     */
    Dictionary.prototype.values = function () {
        if (this == null)
            throw new Error('Dictionary isn\'t initialized. Call \'new\' first.');
        return Object.values(this.items);
    };
    /**
     * Get the dictionary.
     *
     * @return {object} Returns the dictionary if it contains data else null.
     */
    Dictionary.prototype.lookup = function () {
        return this.keys().length ? this.items : null;
    };
    Object.defineProperty(Dictionary.prototype, "count", {
        /**
         * Number of items in the dictionary.
         *
         * @return {number} Returns the number of items in the dictionary
         */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGljdGlvbmFyeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL2RpY3Rpb25hcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7R0FHRztBQUNIO0lBQ0k7OztNQUdFO0lBQ0Ysb0JBQXNCLEtBQThCO1FBQTlCLFVBQUssR0FBTCxLQUFLLENBQXlCO1FBQ2hELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDO1lBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7SUFDNUMsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsd0JBQUcsR0FBSCxVQUFJLEdBQVc7UUFDWCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQztZQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsb0RBQW9ELENBQUMsQ0FBQztRQUM5RixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ3JDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsd0JBQUcsR0FBSCxVQUFJLEdBQVcsRUFBRSxLQUFRO1FBQ3JCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7WUFBQyxNQUFNLElBQUksS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDL0QsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ25DLENBQUM7O0lBRUQ7Ozs7T0FJRztJQUNILDBCQUFLLEdBQUw7UUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQztZQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMs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