"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var storage_1 = require('../helpers/storage');
var ProfileManager = (function (_super) {
    __extends(ProfileManager, _super);
    function ProfileManager(_endpointManager, _tokenManager) {
        _super.call(this, 'OAuth2Profiles', storage_1.StorageType.LocalStorage);
        this._endpointManager = _endpointManager;
        this._tokenManager = _tokenManager;
    }
    ProfileManager.prototype.load = function (provider, force) {
        var _this = this;
        if (force === void 0) { force = false; }
        var cached = this.get(provider);
        if (cached != null && !force) {
            return Promise.resolve(cached);
        }
        var token = this._tokenManager.get(provider);
        var endpoint = this._endpointManager.get(provider);
        if (endpoint.profileUrl == null)
            return Promise.resolve(null);
        var xhr = $.ajax(endpoint.profileUrl, {
            dataType: 'json',
            headers: { 'Authorization': 'Bearer ' + token.access_token }
        }).then(function (response) {
            var json = response;
            if (json == null)
                return json;
            return _this.add(provider, json);
        });
        return xhr;
    };
    return ProfileManager;
}(storage_1.Storage));
exports.ProfileManager = ProfileManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS5tYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21hbmFnZXJzL3Byb2ZpbGUubWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSx3QkFBcUMsb0JBQW9CLENBQUMsQ0FBQTtBQUkxRDtJQUFvQyxrQ0FBWTtJQUM1Qyx3QkFDWSxnQkFBaUMsRUFDakMsYUFBMkI7UUFFbkMsa0JBQU0sZ0JBQWdCLEVBQUUscUJBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUgxQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBQ2pDLGtCQUFhLEdBQWIsYUFBYSxDQUFjO0lBR3ZDLENBQUM7SUFFRCw2QkFBSSxHQUFKLFVBQUssUUFBZ0IsRUFBRSxLQUFzQjtRQUE3QyxpQkFvQkM7UUFwQnNCLHFCQUFzQixHQUF0QixhQUFzQjtRQUN6QyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzNCLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25DLENBQUM7UUFFRCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM3QyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ25ELEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDO1lBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFOUQsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFO1lBQ2xDLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLE9BQU8sRUFBRSxFQUFFLGVBQWUsRUFBRSxTQUFTLEdBQUcsS0FBSyxDQUFDLFlBQVksRUFBRTtTQUMvRCxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsUUFBUTtZQUNaLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQztZQUNwQixFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDO2dCQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDOUIsTUFBTSxDQUFDLEtBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3BDLENBQUMsQ0FBUSxDQUFDO1FBRVYsTUFBTSxDQUFDLEdBQVUsQ0FBQztJQUN0QixDQUFDO0lBQ0wscUJBQUM7QUFBRCxDQUFDLEFBN0JELENBQW9DLGlCQUFPLEdBNkIxQztBQTdCWSxzQkFBYyxpQkE2QjFCLENBQUEifQ==