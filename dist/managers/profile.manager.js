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
var Rx_1 = require('rxjs/Rx');
var http_1 = require('@angular/http');
var storage_1 = require('../helpers/storage');
var token_manager_1 = require('../managers/token.manager');
var endpoint_manager_1 = require('../managers/endpoint.manager');
var ProfileManager = (function (_super) {
    __extends(ProfileManager, _super);
    function ProfileManager(_http, _tokenManager, _endpointManager) {
        _super.call(this, 'OAuth2Profiles', storage_1.StorageType.LocalStorage);
        this._http = _http;
        this._tokenManager = _tokenManager;
        this._endpointManager = _endpointManager;
    }
    ProfileManager.prototype.load = function (provider, force) {
        var _this = this;
        if (force === void 0) { force = false; }
        var cached = this.get(provider);
        if (cached != null && !force) {
            return Rx_1.Observable.of(cached);
        }
        var token = this._tokenManager.get(provider);
        var endpoint = this._endpointManager.get(provider);
        if (endpoint.profileUrl == null)
            return Rx_1.Observable.fromPromise(Promise.resolve(null));
        var headers = new http_1.Headers();
        headers.append('Authorization', 'Bearer ' + token.access_token);
        var options = new http_1.RequestOptions({
            headers: headers
        });
        return this._http.get(endpoint.profileUrl, options)
            .map(function (response) {
            var json = response.json();
            if (json == null)
                return json;
            return _this.add(provider, json);
        });
    };
    ProfileManager = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, token_manager_1.TokenManager, endpoint_manager_1.EndpointManager])
    ], ProfileManager);
    return ProfileManager;
}(storage_1.Storage));
exports.ProfileManager = ProfileManager;
//# sourceMappingURL=profile.manager.js.map