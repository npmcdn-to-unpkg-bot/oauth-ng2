System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Dictionary;
    return {
        setters:[],
        execute: function() {
            Dictionary = (function () {
                function Dictionary(items) {
                    this.items = items;
                    if (this.items == null)
                        this.items = {};
                }
                Dictionary.prototype.get = function (key) {
                    if (!this.contains(key))
                        throw new Error('Key not found.');
                    return this.items[key];
                };
                Dictionary.prototype.add = function (key, value) {
                    if (this.contains(key))
                        throw new Error('Key already exists.');
                    return this.insert(key, value);
                };
                ;
                Dictionary.prototype.first = function () {
                    if (this == null)
                        throw new Error('Dictionary isn\'t initialized. Call \'new\' first.');
                    var key = this.keys()[0];
                    if (key != null)
                        return this.items[key];
                };
                Dictionary.prototype.insert = function (key, value) {
                    if (this == null)
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
                    if (this == null)
                        throw new Error('Dictionary isn\'t initialized. Call \'new\' first.');
                    return this.items.hasOwnProperty(key);
                };
                Dictionary.prototype.keys = function () {
                    if (this == null)
                        throw new Error('Dictionary isn\'t initialized. Call \'new\' first.');
                    return Object.keys(this);
                };
                Dictionary.prototype.values = function () {
                    if (this == null)
                        throw new Error('Dictionary isn\'t initialized. Call \'new\' first.');
                    return Array.map(this.keys(), function (key) {
                        return this.items[key];
                    });
                };
                Dictionary.prototype.lookup = function () {
                    return this.items;
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
            exports_1("Dictionary", Dictionary);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,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QUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzFDLENBQUM7Z0JBRUQseUJBQUksR0FBSjtvQkFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDO3dCQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsb0RBQW9ELENBQUMsQ0FBQztvQkFDeEYsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzdCLENBQUM7Z0JBRUQsMkJBQU0sR0FBTjtvQkFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDO3dCQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsb0RBQW9ELENBQUMsQ0FBQztvQkFDeEYsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLFVBQVUsR0FBRzt3QkFDdkMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQzNCLENBQUMsQ0FBQyxDQUFDO2dCQUNQLENBQUM7Z0JBRUQsMkJBQU0sR0FBTjtvQkFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDdEIsQ0FBQztnQkFFRCxzQkFBSSw2QkFBSzt5QkFBVDt3QkFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQztvQkFDaEMsQ0FBQzs7O21CQUFBOztnQkFDTCxpQkFBQztZQUFELENBaEVBLEFBZ0VDLElBQUE7WUFoRUQsbUNBZ0VDLENBQUEiLCJmaWxlIjoic3JjL2hlbHBlcnMvZGljdGlvbmFyeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBEaWN0aW9uYXJ5PFQ+IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBpdGVtcz86IHsgW2luZGV4OiBzdHJpbmddOiBUIH0pIHtcclxuICAgICAgICBpZiAodGhpcy5pdGVtcyA9PSBudWxsKSB0aGlzLml0ZW1zID0ge307XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0KGtleTogc3RyaW5nKTogVCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNvbnRhaW5zKGtleSkpIHRocm93IG5ldyBFcnJvcignS2V5IG5vdCBmb3VuZC4nKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pdGVtc1trZXldO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZChrZXk6IHN0cmluZywgdmFsdWU6IFQpOiBUIHtcclxuICAgICAgICBpZiAodGhpcy5jb250YWlucyhrZXkpKSB0aHJvdyBuZXcgRXJyb3IoJ0tleSBhbHJlYWR5IGV4aXN0cy4nKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnNlcnQoa2V5LCB2YWx1ZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGZpcnN0KCkge1xyXG4gICAgICAgIGlmICh0aGlzID09IG51bGwpIHRocm93IG5ldyBFcnJvcignRGljdGlvbmFyeSBpc25cXCd0IGluaXRpYWxpemVkLiBDYWxsIFxcJ25ld1xcJyBmaXJzdC4nKTtcclxuICAgICAgICB2YXIga2V5ID0gdGhpcy5rZXlzKClbMF07XHJcbiAgICAgICAgaWYgKGtleSAhPSBudWxsKSByZXR1cm4gdGhpcy5pdGVtc1trZXldO1xyXG4gICAgfVxyXG5cclxuICAgIGluc2VydChrZXk6IHN0cmluZywgdmFsdWU6IFQpOiBUIHtcclxuICAgICAgICBpZiAodGhpcyA9PSBudWxsKSB0aHJvdyBuZXcgRXJyb3IoJ0RpY3Rpb25hcnkgaXNuXFwndCBpbml0aWFsaXplZC4gQ2FsbCBcXCduZXdcXCcgZmlyc3QuJyk7XHJcbiAgICAgICAgaWYgKHZhbHVlID09IG51bGwpIHRocm93IG5ldyBFcnJvcignVmFsdWUgZXhwZWN0ZWQuIEdvdCAnICsgdmFsdWUpO1xyXG4gICAgICAgIHRoaXMuaXRlbXNba2V5XSA9IHZhbHVlO1xyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmUoa2V5OiBzdHJpbmcpOiBUIHtcclxuICAgICAgICBpZiAoIXRoaXMuY29udGFpbnMoa2V5KSkgdGhyb3cgbmV3IEVycm9yKCdLZXkgbm90IGZvdW5kLicpO1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IHRoaXMuaXRlbXNba2V5XTtcclxuICAgICAgICBkZWxldGUgdGhpcy5pdGVtc1trZXldO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluc2VydChrZXksIHZhbHVlKTtcclxuICAgIH07XHJcblxyXG4gICAgY2xlYXIoKSB7XHJcbiAgICAgICAgdGhpcy5pdGVtcyA9IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnRhaW5zKGtleTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKGtleSA9PSBudWxsKSB0aHJvdyBuZXcgRXJyb3IoJ0tleSBjYW5ub3QgYmUgbnVsbCBvciB1bmRlZmluZWQnKTtcclxuICAgICAgICBpZiAodGhpcyA9PSBudWxsKSB0aHJvdyBuZXcgRXJyb3IoJ0RpY3Rpb25hcnkgaXNuXFwndCBpbml0aWFsaXplZC4gQ2FsbCBcXCduZXdcXCcgZmlyc3QuJyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbXMuaGFzT3duUHJvcGVydHkoa2V5KTtcclxuICAgIH1cclxuXHJcbiAgICBrZXlzKCk6IHN0cmluZ1tdIHtcclxuICAgICAgICBpZiAodGhpcyA9PSBudWxsKSB0aHJvdyBuZXcgRXJyb3IoJ0RpY3Rpb25hcnkgaXNuXFwndCBpbml0aWFsaXplZC4gQ2FsbCBcXCduZXdcXCcgZmlyc3QuJyk7XHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhbHVlcygpOiBUW10ge1xyXG4gICAgICAgIGlmICh0aGlzID09IG51bGwpIHRocm93IG5ldyBFcnJvcignRGljdGlvbmFyeSBpc25cXCd0IGluaXRpYWxpemVkLiBDYWxsIFxcJ25ld1xcJyBmaXJzdC4nKTtcclxuICAgICAgICByZXR1cm4gQXJyYXkubWFwKHRoaXMua2V5cygpLCBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLml0ZW1zW2tleV07XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbG9va3VwKCk6IHsgW2tleTogc3RyaW5nXTogVCB9IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pdGVtcztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgY291bnQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZXMoKS5sZW5ndGg7XHJcbiAgICB9O1xyXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
