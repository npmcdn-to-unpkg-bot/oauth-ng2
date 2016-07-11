System.register(['../helpers'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var helpers_1;
    var StorageType, Storage;
    return {
        setters:[
            function (helpers_1_1) {
                helpers_1 = helpers_1_1;
            }],
        execute: function() {
            (function (StorageType) {
                StorageType[StorageType["LocalStorage"] = 0] = "LocalStorage";
                StorageType[StorageType["SessionStorage"] = 1] = "SessionStorage";
            })(StorageType || (StorageType = {}));
            exports_1("StorageType", StorageType);
            Storage = (function (_super) {
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
                        this._storage[this._container] = "";
                    }
                    this._load();
                };
                Storage.prototype.add = function (item, value) {
                    _super.prototype.add.call(this, item, value);
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
                    this._storage[this._container] = "";
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
                    if (this._storage[this._container] == null)
                        return;
                    this.items = JSON.parse(this._storage[this._container]);
                };
                return Storage;
            }(helpers_1.Dictionary));
            exports_1("Storage", Storage);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlbHBlcnMvc3RvcmFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O1lBRUEsV0FBWSxXQUFXO2dCQUNuQiw2REFBWSxDQUFBO2dCQUNaLGlFQUFjLENBQUE7WUFDbEIsQ0FBQyxFQUhXLFdBQVcsS0FBWCxXQUFXLFFBR3RCO2tEQUFBO1lBRUQ7Z0JBQWdDLDJCQUFhO2dCQUd6QyxpQkFBb0IsVUFBa0IsRUFBRSxJQUFrQjtvQkFDdEQsaUJBQU8sQ0FBQztvQkFEUSxlQUFVLEdBQVYsVUFBVSxDQUFRO29CQUY5QixhQUFRLEdBQUcsSUFBSSxDQUFDO29CQUlwQixJQUFJLEdBQUcsSUFBSSxJQUFJLFdBQVcsQ0FBQyxZQUFZLENBQUM7b0JBQ3hDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzdCLENBQUM7Z0JBRUQsK0JBQWEsR0FBYixVQUFjLElBQWlCO29CQUMzQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksS0FBSyxXQUFXLENBQUMsWUFBWSxHQUFHLFlBQVksR0FBRyxjQUFjLENBQUM7b0JBQ2xGLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDakQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDO29CQUN4QyxDQUFDO29CQUVELElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDakIsQ0FBQztnQkFFRCxxQkFBRyxHQUFILFVBQUksSUFBWSxFQUFFLEtBQVE7b0JBQ3RCLGdCQUFLLENBQUMsR0FBRyxZQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztvQkFDdkIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUNiLE1BQU0sQ0FBQyxLQUFLLENBQUM7Z0JBQ2pCLENBQUM7Z0JBRUQsd0JBQU0sR0FBTixVQUFPLElBQVk7b0JBQ2YsSUFBSSxLQUFLLEdBQUcsZ0JBQUssQ0FBQyxNQUFNLFlBQUMsSUFBSSxDQUFDLENBQUM7b0JBQy9CLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDYixNQUFNLENBQUMsS0FBSyxDQUFDO2dCQUNqQixDQUFDO2dCQUVELHVCQUFLLEdBQUw7b0JBQ0ksZ0JBQUssQ0FBQyxLQUFLLFdBQUUsQ0FBQztvQkFDZCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUM7Z0JBQ3hDLENBQUM7Z0JBRU0sYUFBSyxHQUFaO29CQUNJLE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBQzVCLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ2xDLENBQUM7Z0JBRU8sdUJBQUssR0FBYjtvQkFDSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDaEUsQ0FBQztnQkFFTyx1QkFBSyxHQUFiO29CQUNJLGdCQUFLLENBQUMsS0FBSyxXQUFFLENBQUM7b0JBQ2QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksSUFBSSxDQUFDO3dCQUFDLE1BQU0sQ0FBQztvQkFDbkQsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQzVELENBQUM7Z0JBQ0wsY0FBQztZQUFELENBakRBLEFBaURDLENBakQrQixvQkFBVSxHQWlEekM7WUFqREQsNkJBaURDLENBQUEiLCJmaWxlIjoic3JjL2hlbHBlcnMvc3RvcmFnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGljdGlvbmFyeX0gZnJvbSAnLi4vaGVscGVycyc7XG5cbmV4cG9ydCBlbnVtIFN0b3JhZ2VUeXBlIHtcbiAgICBMb2NhbFN0b3JhZ2UsXG4gICAgU2Vzc2lvblN0b3JhZ2Vcbn1cblxuZXhwb3J0IGNsYXNzIFN0b3JhZ2U8VD4gZXh0ZW5kcyBEaWN0aW9uYXJ5PFQ+e1xuICAgIHByaXZhdGUgX3N0b3JhZ2UgPSBudWxsO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfY29udGFpbmVyOiBzdHJpbmcsIHR5cGU/OiBTdG9yYWdlVHlwZSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0eXBlID0gdHlwZSB8fCBTdG9yYWdlVHlwZS5Mb2NhbFN0b3JhZ2U7XG4gICAgICAgIHRoaXMuc3dpdGNoU3RvcmFnZSh0eXBlKTtcbiAgICB9XG5cbiAgICBzd2l0Y2hTdG9yYWdlKHR5cGU6IFN0b3JhZ2VUeXBlKSB7XG4gICAgICAgIHRoaXMuX3N0b3JhZ2UgPSB0eXBlID09PSBTdG9yYWdlVHlwZS5Mb2NhbFN0b3JhZ2UgPyBsb2NhbFN0b3JhZ2UgOiBzZXNzaW9uU3RvcmFnZTtcbiAgICAgICAgaWYgKCF0aGlzLl9zdG9yYWdlLmhhc093blByb3BlcnR5KHRoaXMuX2NvbnRhaW5lcikpIHtcbiAgICAgICAgICAgIHRoaXMuX3N0b3JhZ2VbdGhpcy5fY29udGFpbmVyXSA9IFwiXCI7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9sb2FkKCk7XG4gICAgfVxuXG4gICAgYWRkKGl0ZW06IHN0cmluZywgdmFsdWU6IFQpOiBUIHtcbiAgICAgICAgc3VwZXIuYWRkKGl0ZW0sIHZhbHVlKTtcbiAgICAgICAgdGhpcy5fc2F2ZSgpO1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgcmVtb3ZlKGl0ZW06IHN0cmluZykge1xuICAgICAgICB2YXIgdmFsdWUgPSBzdXBlci5yZW1vdmUoaXRlbSk7XG4gICAgICAgIHRoaXMuX3NhdmUoKTtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIGNsZWFyKCkge1xuICAgICAgICBzdXBlci5jbGVhcigpO1xuICAgICAgICB0aGlzLl9zdG9yYWdlW3RoaXMuX2NvbnRhaW5lcl0gPSBcIlwiO1xuICAgIH1cblxuICAgIHN0YXRpYyBjbGVhcigpIHtcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5jbGVhcigpO1xuICAgICAgICB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UuY2xlYXIoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9zYXZlKCkge1xuICAgICAgICB0aGlzLl9zdG9yYWdlW3RoaXMuX2NvbnRhaW5lcl0gPSBKU09OLnN0cmluZ2lmeSh0aGlzLml0ZW1zKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9sb2FkKCkge1xuICAgICAgICBzdXBlci5jbGVhcigpO1xuICAgICAgICBpZiAodGhpcy5fc3RvcmFnZVt0aGlzLl9jb250YWluZXJdID09IG51bGwpIHJldHVybjtcbiAgICAgICAgdGhpcy5pdGVtcyA9IEpTT04ucGFyc2UodGhpcy5fc3RvcmFnZVt0aGlzLl9jb250YWluZXJdKTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
