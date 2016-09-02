"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var storage_1 = require('../helpers/storage');
/**
 * Helper for caching and managing OAuth Tokens.
 */
var TokenManager = (function (_super) {
    __extends(TokenManager, _super);
    /**
     * @constructor
    */
    function TokenManager() {
        _super.call(this, 'OAuth2Tokens', storage_1.StorageType.LocalStorage);
    }
    /**
     * Compute the expiration date based on the expires_in field in a OAuth token.
     */
    TokenManager.prototype.setExpiry = function (token) {
        var expire = function (seconds) {
            if (seconds === void 0) { seconds = 3600; }
            return new Date(new Date().getTime() + ~~seconds * 1000);
        };
        if (token == null)
            return null;
        if (token.expires_at == null) {
            token.expires_at = expire(token.expires_in);
        }
    };
    /**
     * Extends Storage's default add method
     * Adds a new OAuth Token after settings its expiry
     *
     * @param {string} provider Unique name of the corresponding OAuth Endpoint.
     * @param {object} config valid Token
     * @see {@link IEndpoint}.
     * @return {object} Returns the added endpoint.
     */
    TokenManager.prototype.add = function (provider, value) {
        value.provider = provider;
        this.setExpiry(value);
        return _super.prototype.add.call(this, provider, value);
    };
    /**
     * Extract the token from the URL
     *
     * @param {string} url The url to extract the token from.
     * @param {string} exclude Exclude a particlaur string from the url, such as a query param or specific substring.
     * @param {string} delimiter[optional] Delimiter used by OAuth provider to mark the beginning of token response. Defaults to #.
     * @return {object} Returns the extracted token.
     */
    TokenManager.getToken = function (url, exclude, delimiter) {
        if (delimiter === void 0) { delimiter = '#'; }
        if (exclude)
            url = url.replace(exclude, '');
        var parts = url.split(delimiter);
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
        return this._extractParams(rightPart);
    };
    /**
     * Check if the supplied url has either access_token or code or error
     */
    TokenManager.isTokenUrl = function (url) {
        var regex = /(access_token|code|error)/gi;
        return regex.test(url);
    };
    TokenManager._extractParams = function (segment) {
        var params = {}, regex = /([^&=]+)=([^&]*)/g, matches;
        while ((matches = regex.exec(segment)) !== null) {
            params[decodeURIComponent(matches[1])] = decodeURIComponent(matches[2]);
        }
        return params;
    };
    return TokenManager;
}(storage_1.Storage));
exports.TokenManager = TokenManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW4ubWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tYW5hZ2Vycy90b2tlbi5tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHdCQUFxQyxvQkFBb0IsQ0FBQyxDQUFBO0FBMEIxRDs7R0FFRztBQUNIO0lBQWtDLGdDQUFlO0lBQzdDOztNQUVFO0lBQ0Y7UUFDSSxrQkFBTSxjQUFjLEVBQUUscUJBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxnQ0FBUyxHQUFULFVBQVUsS0FBYTtRQUNuQixJQUFJLE1BQU0sR0FBRyxVQUFDLE9BQW1CO1lBQW5CLHVCQUFtQixHQUFuQixjQUFtQjtZQUFLLE9BQUEsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUFqRCxDQUFpRCxDQUFDO1FBQ3hGLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUM7WUFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQy9CLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUMzQixLQUFLLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDaEQsQ0FBQztJQUNMLENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNILDBCQUFHLEdBQUgsVUFBSSxRQUFnQixFQUFFLEtBQWE7UUFDL0IsS0FBSyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDMUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0QixNQUFNLENBQUMsZ0JBQUssQ0FBQyxHQUFHLFlBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0kscUJBQVEsR0FBZixVQUFnQixHQUFXLEVBQUUsT0FBZ0IsRUFBRSxTQUF1QjtRQUF2Qix5QkFBdUIsR0FBdkIsZUFBdUI7UUFDbEUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRTVDLElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDakMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUM7UUFFOUIsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4RCxTQUFTLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFdkMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEMsSUFBSSxTQUFTLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNyQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsSUFBSSxTQUFTLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQztnQkFBQyxNQUFNLENBQUM7WUFDaEQsU0FBUyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QixDQUFDO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksdUJBQVUsR0FBakIsVUFBa0IsR0FBVztRQUN6QixJQUFJLEtBQUssR0FBRyw2QkFBNkIsQ0FBQztRQUMxQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRWMsMkJBQWMsR0FBN0IsVUFBOEIsT0FBZTtRQUN6QyxJQUFJLE1BQU0sR0FBUSxFQUFFLEVBQ2hCLEtBQUssR0FBRyxtQkFBbUIsRUFDM0IsT0FBTyxDQUFDO1FBRVosT0FBTyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDOUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUUsQ0FBQztRQUVELE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUNMLG1CQUFDO0FBQUQsQ0FBQyxBQS9FRCxDQUFrQyxpQkFBTyxHQStFeEM7QUEvRVksb0JBQVksZUErRXhCLENBQUEifQ==