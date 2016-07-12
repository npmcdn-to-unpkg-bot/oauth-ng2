"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var helpers_1 = require('../helpers');
var EndpointManager = (function (_super) {
    __extends(EndpointManager, _super);
    function EndpointManager() {
        _super.call(this, 'OAuth2Endpoints', helpers_1.StorageType.LocalStorage);
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
            provider: 'Google',
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
            provider: 'Microsoft',
            clientId: clientId,
            redirectUrl: redirect_uri || this.currentHost,
            profileUrl: 'https://graph.microsoft.com/v1.0/me',
            site: 'https://login.microsoftonline.com/common/oauth2/v2.0',
            authorizeUrl: '/authorize',
            resource: 'https://login.live.com',
            responseType: 'token',
            scope: scope || 'https://graph.microsoft.com/user.read',
            extraParameters: '&response_mode=fragment'
        };
        this.add(config.provider, config);
    };
    ;
    EndpointManager.prototype.registerFacebookAuth = function (clientId, redirect_uri, scope) {
        var config = {
            provider: 'Facebook',
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
        var oAuthScope = (endpointConfig.scope) ? encodeURIComponent(endpointConfig.scope) : '', state = (endpointConfig.state) ? encodeURIComponent(endpointConfig.state) : '', authPathHasQuery = (endpointConfig.authorizeUrl.indexOf('?') === -1) ? false : true, appendChar = (authPathHasQuery) ? '&' : '?', responseType = (endpointConfig.responseType) ? encodeURIComponent(endpointConfig.responseType) : '';
        var url = endpointConfig.site + endpointConfig.authorizeUrl + appendChar +
            'response_type=' + responseType + '&' +
            'client_id=' + encodeURIComponent(endpointConfig.clientId) + '&' +
            'redirect_uri=' + encodeURIComponent(endpointConfig.redirectUrl) + '&' +
            'scope=' + oAuthScope + '&' +
            'state=' + state;
        var random = new Uint16Array(1);
        crypto.getRandomValues(random);
        url = url + '&nounce=' + random[0];
        return url;
    };
    EndpointManager = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], EndpointManager);
    return EndpointManager;
}(helpers_1.Storage));
exports.EndpointManager = EndpointManager;
//# sourceMappingURL=endpoint.manager.js.map