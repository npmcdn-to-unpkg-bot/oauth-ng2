"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var storage_1 = require('../helpers/storage');
// Underscore.js implementation of extend
// https://github.com/jashkenas/underscore/blob/master/underscore.js
var extend = function (obj) {
    var defaults = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        defaults[_i - 1] = arguments[_i];
    }
    var length = arguments.length;
    if (length < 2 || obj == null)
        return obj; // if there are no objects to extend then return the current object
    if (defaults)
        obj = Object(obj); // create a new object to extend if there are any extensions
    for (var index = 1; index < length; index++) {
        var source = arguments[index]; // foreach object
        if (source == null)
            continue; // move on if the object is null or undefined
        var keys = Object.keys(source), // get all the keys
        l = keys.length; // cache the length
        for (var i = 0; i < l; i++) {
            var key = keys[i]; // for each key
            if (!defaults || obj[key] === void 0)
                obj[key] = source[key]; // replace values
        }
    }
    return obj;
};
exports.DefaultEndpoints = {
    Google: 'Google',
    Microsoft: 'Microsoft',
    Facebook: 'Facebook'
};
/**
 * Helper for creating and registering OAuth Endpoints.
 */
var EndpointManager = (function (_super) {
    __extends(EndpointManager, _super);
    /**
     * @constructor
    */
    function EndpointManager() {
        _super.call(this, 'OAuth2Endpoints', storage_1.StorageType.LocalStorage);
    }
    Object.defineProperty(EndpointManager.prototype, "currentHost", {
        /**
         * Gets the current url to be specified as the default redirect url.
         */
        get: function () {
            if (this._currentHost == null) {
                this._currentHost = window.location.protocol + "//" + window.location.host;
            }
            return this._currentHost;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Extends Storage's default add method
     * Registers a new OAuth Endpoint
     *
     * @param {string} provider Unique name for the registered OAuth Endpoint.
     * @param {object} config Valid Endpoint configuration
     * @see {@link IEndpoint}.
     * @return {object} Returns the added endpoint.
     */
    EndpointManager.prototype.add = function (provider, config) {
        if (config.redirectUrl == null)
            config.redirectUrl = this.currentHost;
        config.provider = provider;
        return _super.prototype.add.call(this, provider, config);
    };
    /**
     * Register Google Implicit OAuth
     * The default scope is limited to basic profile
     *
     * @param {string} clientId ClientID for the Google App
     * @param {object} config Valid Endpoint configuration to override the defaults
     * @return {object} Returns the added endpoint.
     */
    EndpointManager.prototype.registerGoogleAuth = function (clientId, overrides) {
        var defaults = {
            clientId: clientId,
            baseUrl: 'https://accounts.google.com',
            authorizeUrl: '/o/oauth2/v2/auth',
            resource: 'https://www.googleapis.com',
            responseType: 'token',
            scope: 'https://www.googleapis.com/auth/plus.me'
        };
        var config = extend({}, defaults, overrides);
        return this.add(exports.DefaultEndpoints.Google, config);
    };
    ;
    /**
     * Register Microsoft Implicit OAuth
     * The default scope is limited to basic profile
     *
     * @param {string} clientId ClientID for the Microsoft App
     * @param {object} config Valid Endpoint configuration to override the defaults
     * @return {object} Returns the added endpoint.
     */
    EndpointManager.prototype.registerMicrosoftAuth = function (clientId, overrides) {
        var defaults = {
            clientId: clientId,
            baseUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0',
            authorizeUrl: '/authorize',
            resource: 'https://graph.microsoft.com',
            responseType: 'id_token+token',
            scope: 'openid https://graph.microsoft.com/user.read',
            extraParameters: '&response_mode=fragment',
            nonce: true,
            state: true
        };
        var config = extend({}, defaults, overrides);
        this.add(exports.DefaultEndpoints.Microsoft, config);
    };
    ;
    /**
     * Register Facebook Implicit OAuth
     * The default scope is limited to basic profile
     *
     * @param {string} clientId ClientID for the Facebook App
     * @param {object} config Valid Endpoint configuration to override the defaults
     * @return {object} Returns the added endpoint.
     */
    EndpointManager.prototype.registerFacebookAuth = function (clientId, overrides) {
        var defaults = {
            clientId: clientId,
            baseUrl: 'https://www.facebook.com',
            authorizeUrl: '/dialog/oauth',
            resource: 'https://graph.facebook.com',
            responseType: 'token',
            scope: 'public_profile',
            nonce: true,
            state: true
        };
        var config = extend({}, defaults, overrides);
        this.add(exports.DefaultEndpoints.Facebook, config);
    };
    ;
    /**
     * Helper to generate the OAuth login url
     *
     * @param {object} config Valid Endpoint configuration
     * @return {object} Returns the added endpoint.
     */
    EndpointManager.getLoginUrl = function (endpointConfig) {
        var rand = function (limit, start) {
            if (limit === void 0) { limit = 10; }
            if (start === void 0) { start = 0; }
            return Math.floor(Math.random() * limit + start);
        };
        var oAuthScope = (endpointConfig.scope) ? encodeURIComponent(endpointConfig.scope) : '', state = endpointConfig.state && rand(10000), nonce = endpointConfig.nonce && rand(10000);
        var urlSegments = [
            'response_type=' + endpointConfig.responseType,
            'client_id=' + encodeURIComponent(endpointConfig.clientId),
            'redirect_uri=' + encodeURIComponent(endpointConfig.redirectUrl),
            'scope=' + oAuthScope
        ];
        if (state)
            urlSegments.push('state=' + state);
        if (nonce)
            urlSegments.push('nonce=' + nonce);
        if (endpointConfig)
            urlSegments.push(endpointConfig.extraQueryParameters);
        return endpointConfig.baseUrl + endpointConfig.authorizeUrl + '?' + urlSegments.join('&');
    };
    return EndpointManager;
}(storage_1.Storage));
exports.EndpointManager = EndpointManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5kcG9pbnQubWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tYW5hZ2Vycy9lbmRwb2ludC5tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHdCQUFxQyxvQkFBb0IsQ0FBQyxDQUFBO0FBRTFELHlDQUF5QztBQUN6QyxvRUFBb0U7QUFDcEUsSUFBSSxNQUFNLEdBQUcsVUFBVSxHQUFHO0lBQUUsa0JBQVc7U0FBWCxXQUFXLENBQVgsc0JBQVcsQ0FBWCxJQUFXO1FBQVgsaUNBQVc7O0lBQ25DLElBQUksTUFBTSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUM7SUFDOUIsRUFBRSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDO1FBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLG1FQUFtRTtJQUM5RyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUM7UUFBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsNERBQTREO0lBRTdGLEdBQUcsQ0FBQyxDQUFDLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUM7UUFDMUMsSUFBSSxNQUFNLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsaUJBQWlCO1FBQ2hELEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUM7WUFBQyxRQUFRLENBQUMsQ0FBQyw2Q0FBNkM7UUFDM0UsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxtQkFBbUI7UUFDL0MsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxtQkFBbUI7UUFDeEMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFF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