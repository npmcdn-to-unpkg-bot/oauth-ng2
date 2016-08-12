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
    TokenManager.prototype.setExpired = function (token) {
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
        this.setExpired(value);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW4ubWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tYW5hZ2Vycy90b2tlbi5tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHdCQUFxQyxvQkFBb0IsQ0FBQyxDQUFBO0FBYzFEOztHQUVHO0FBQ0g7SUFBa0MsZ0NBQWU7SUFDN0M7O01BRUU7SUFDRjtRQUNJLGtCQUFNLGNBQWMsRUFBRSxxQkFBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRDs7T0FFRztJQUNILGlDQUFVLEdBQVYsVUFBVyxLQUFhO1FBQ3BCLElBQUksTUFBTSxHQUFHLFVBQUMsT0FBbUI7WUFBbkIsdUJBQW1CLEdBQW5CLGNBQW1CO1lBQUssT0FBQSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQWpELENBQWlELENBQUM7UUFDeEYsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQztZQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDL0IsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzNCLEtBQUssQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNoRCxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0gsMEJBQUcsR0FBSCxVQUFJLFFBQWdCLEVBQUUsS0FBYTtRQUMvQixLQUFLLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUMxQixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZCLE1BQU0sQ0FBQyxnQkFBSyxDQUFDLEdBQUcsWUFBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSSxxQkFBUSxHQUFmLFVBQWdCLEdBQVcsRUFBRSxPQUFnQixFQUFFLFNBQXVCO1FBQXZCLHlCQUF1QixHQUF2QixlQUF1QjtRQUNsRSxFQUFFLENBQUEsQ0FBQyxPQUFPLENBQUM7WUFBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFM0MsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNqQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQztRQUU5QixJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hELFNBQVMsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUV2QyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoQyxJQUFJLFNBQVMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3JDLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxJQUFJLFNBQVMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO2dCQUFDLE1BQU0sQ0FBQztZQUNoRCxTQUFTLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdCLENBQUM7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRWMsMkJBQWMsR0FBN0IsVUFBOEIsT0FBZTtRQUN6QyxJQUFJLE1BQU0sR0FBUSxFQUFFLEVBQ2hCLEtBQUssR0FBRyxtQkFBbUIsRUFDM0IsT0FBTyxDQUFDO1FBRVosT0FBTyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDOUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUUsQ0FBQztRQUVELE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUNMLG1CQUFDO0FBQUQsQ0FBQyxBQXZFRCxDQUFrQyxpQkFBTyxHQXVFeEM7QUF2RVksb0JBQVksZUF1RXhCLENBQUEifQ==