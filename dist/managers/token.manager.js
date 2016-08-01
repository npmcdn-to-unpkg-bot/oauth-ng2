"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var storage_1 = require('../helpers/storage');
var TokenManager = (function (_super) {
    __extends(TokenManager, _super);
    function TokenManager() {
        _super.call(this, 'OAuth2Tokens', storage_1.StorageType.LocalStorage);
    }
    TokenManager.prototype.setExpired = function (provider) {
        var token = this.get(provider);
        if (token == null)
            return null;
        if (token.expires_at == null) {
            token.expires_at = new Date(+token.expires_in - 5000);
        }
        console.log(token);
    };
    TokenManager.prototype.getToken = function (segment, endpoint, delimiter) {
        if (delimiter === void 0) { delimiter = '#'; }
        segment = segment.replace(endpoint.redirectUrl, '');
        var parts = segment.split(delimiter);
        if (parts.length <= 0)
            return;
        var rightPart = parts.length >= 2 ? parts[1] : parts[0];
        rightPart = rightPart.replace('/', '');
        if (rightPart.indexOf("?") !== -1) {
            var queryPart = rightPart.split("?");
            if (!queryPart || queryPart.length <= 0)
                return;
            rightPart = queryPart[1];
        }
        var params = this._extractParams(rightPart);
        params.provider = endpoint.provider;
        this.add(endpoint.provider, params);
        this.setExpired(endpoint.provider);
        return Promise.resolve(params);
    };
    TokenManager.prototype._extractParams = function (segment) {
        var params = {}, regex = /([^&=]+)=([^&]*)/g, matches;
        while ((matches = regex.exec(segment)) !== null) {
            params[decodeURIComponent(matches[1])] = decodeURIComponent(matches[2]);
        }
        return params;
    };
    return TokenManager;
}(storage_1.Storage));
exports.TokenManager = TokenManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW4ubWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tYW5hZ2Vycy90b2tlbi5tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLHdCQUFxQyxvQkFBb0IsQ0FBQyxDQUFBO0FBYTFEO0lBQWtDLGdDQUFlO0lBQzdDO1FBQ0ksa0JBQU0sY0FBYyxFQUFFLHFCQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVELGlDQUFVLEdBQVYsVUFBVyxRQUFnQjtRQUN2QixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9CLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUM7WUFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQy9CLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUMzQixLQUFLLENBQUMsVUFBVSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUMxRCxDQUFDO1FBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBRUQsK0JBQVEsR0FBUixVQUFTLE9BQWUsRUFBRSxRQUFtQixFQUFFLFNBQXVCO1FBQXZCLHlCQUF1QixHQUF2QixlQUF1QjtRQUNsRSxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRXBELElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDckMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUM7UUFFOUIsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4RCxTQUFTLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFdkMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEMsSUFBSSxTQUFTLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNyQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsSUFBSSxTQUFTLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQztnQkFBQyxNQUFNLENBQUM7WUFDaEQsU0FBUyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QixDQUFDO1FBRUQsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1QyxNQUFNLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUM7UUFDcEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ25DLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFTLE1BQU0sQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFTyxxQ0FBYyxHQUF0QixVQUF1QixPQUFlO1FBQ2xDLElBQUksTUFBTSxHQUFRLEVBQUUsRUFDaEIsS0FBSyxHQUFHLG1CQUFtQixFQUMzQixPQUFPLENBQUM7UUFFWixPQUFPLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztZQUM5QyxNQUFNLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1RSxDQUFDO1FBRUQsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBQ0wsbUJBQUM7QUFBRCxDQUFDLEFBaERELENBQWtDLGlCQUFPLEdBZ0R4QztBQWhEWSxvQkFBWSxlQWdEeEIsQ0FBQSJ9