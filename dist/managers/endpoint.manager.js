"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var storage_1 = require('../helpers/storage');
exports.DefaultEndpoints = {
    Google: 'Google',
    Microsoft: 'Microsoft',
    Facebook: 'Facebook'
};
var EndpointManager = (function (_super) {
    __extends(EndpointManager, _super);
    function EndpointManager() {
        _super.call(this, 'OAuth2Endpoints', storage_1.StorageType.LocalStorage);
    }
    Object.defineProperty(EndpointManager.prototype, "currentHost", {
        get: function () {
            if (this._currentHost == null) {
                this._currentHost = window.location.protocol + "//" + window.location.host;
            }
            return this._currentHost;
        },
        enumerable: true,
        configurable: true
    });
    EndpointManager.prototype.registerGoogleAuth = function (clientId, redirect_uri, scope) {
        var config = {
            provider: exports.DefaultEndpoints.Google,
            clientId: clientId,
            redirectUrl: redirect_uri || this.currentHost,
            profileUrl: 'https://www.googleapis.com/plus/v1/people/me',
            site: 'https://accounts.google.com',
            authorizeUrl: '/o/oauth2/v2/auth',
            resource: 'https://www.googleapis.com',
            responseType: 'token',
            scope: scope || 'https://www.googleapis.com/auth/plus.me'
        };
        this.add(config.provider, config);
    };
    ;
    EndpointManager.prototype.registerMicrosoftAuth = function (clientId, redirect_uri, scope) {
        var config = {
            provider: exports.DefaultEndpoints.Microsoft,
            clientId: clientId,
            redirectUrl: redirect_uri || this.currentHost,
            profileUrl: 'https://graph.microsoft.com/v1.0/me',
            site: 'https://login.microsoftonline.com/common/oauth2/v2.0',
            authorizeUrl: '/authorize',
            resource: 'https://graph.microsoft.com',
            responseType: 'id_token+token',
            scope: scope || 'openid https://graph.microsoft.com/user.read',
            extraParameters: '&response_mode=fragment'
        };
        this.add(config.provider, config);
    };
    ;
    EndpointManager.prototype.registerFacebookAuth = function (clientId, redirect_uri, scope) {
        var config = {
            provider: exports.DefaultEndpoints.Facebook,
            clientId: clientId,
            redirectUrl: redirect_uri || this.currentHost,
            profileUrl: 'https://graph.facebook.com/v2.5/me',
            site: 'https://www.facebook.com',
            authorizeUrl: '/dialog/oauth',
            resource: 'https://graph.facebook.com',
            responseType: 'token',
            scope: scope || 'public_profile'
        };
        this.add(config.provider, config);
    };
    ;
    EndpointManager.getLoginUrl = function (endpointConfig) {
        var rand = function (limit, start) {
            if (limit === void 0) { limit = 10; }
            if (start === void 0) { start = 0; }
            return Math.floor(Math.random() * limit + start);
        };
        var oAuthScope = (endpointConfig.scope) ? encodeURIComponent(endpointConfig.scope) : '', state = (endpointConfig.state) ? encodeURIComponent(endpointConfig.state) : rand(10000), nonce = (endpointConfig.nonce) ? encodeURIComponent(endpointConfig.nonce) : rand(10000), authPathHasQuery = (endpointConfig.authorizeUrl.indexOf('?') === -1) ? false : true, appendChar = (authPathHasQuery) ? '&' : '?', responseType = endpointConfig.responseType;
        var url = endpointConfig.site + endpointConfig.authorizeUrl + appendChar +
            'response_type=' + responseType + '&' +
            'client_id=' + encodeURIComponent(endpointConfig.clientId) + '&' +
            'redirect_uri=' + encodeURIComponent(endpointConfig.redirectUrl) + '&' +
            'scope=' + oAuthScope + '&' +
            'state=' + state + '&' +
            'nonce=' + nonce;
        return url;
    };
    return EndpointManager;
}(storage_1.Storage));
exports.EndpointManager = EndpointManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5kcG9pbnQubWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tYW5hZ2Vycy9lbmRwb2ludC5tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHdCQUFxQyxvQkFBb0IsQ0FBQyxDQUFBO0FBRTdDLHdCQUFnQixHQUFHO0lBQzVCLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLFNBQVMsRUFBRSxXQUFXO0lBQ3RCLFFBQVEsRUFBRSxVQUFVO0NBQ3ZCLENBQUM7QUFrQkY7SUFBcUMsbUNBQWtCO0lBQ25EO1FBQ0ksa0JBQU0saUJBQWlCLEVBQUUscUJBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBR0Qsc0JBQUksd0NBQVc7YUFBZjtZQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDNUIsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxJQUFJLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDL0UsQ0FBQztZQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQzdCLENBQUM7OztPQUFBO0lBRUQsNENBQWtCLEdBQWxCLFVBQW1CLFFBQWdCLEVBQUUsWUFBcUIsRUFBRSxLQUFjO1FBQ3RFLElBQUksTUFBTSxHQUFjO1lBQ3BCLFFBQVEsRUFBRSx3QkFBZ0IsQ0FBQyxNQUFNO1lBQ2pDLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFdBQVcsRUFBRSxZQUFZLElBQUksSUFBSSxDQUFDLFdBQVc7WUFDN0MsVUFBVSxFQUFFLDhDQUE4QztZQUMxRCxJQUFJLEVBQUUsNkJBQTZCO1lBQ25DLFlBQVksRUFBRSxtQkFBbUI7WUFDakMsUUFBUSxFQUFFLDRCQUE0QjtZQUN0QyxZQUFZLEVBQUUsT0FBTztZQUNyQixLQUFLLEVBQUUsS0FBSyxJQUFJLHlDQUF5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