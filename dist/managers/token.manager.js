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
var TokenManager = (function (_super) {
    __extends(TokenManager, _super);
    function TokenManager() {
        _super.call(this, 'OAuth2Tokens', helpers_1.StorageType.LocalStorage);
    }
    TokenManager.prototype.setExpired = function (provider) {
        // return (this._tokens.endpo && this.token.expires_at && this.token.expires_at < new Date());
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
        return Promise.resolve(params);
    };
    TokenManager.prototype._extractParams = function (segment) {
        var params = {}, regex = /([^&=]+)=([^&]*)/g, matches;
        while ((matches = regex.exec(segment)) !== null) {
            params[decodeURIComponent(matches[1])] = decodeURIComponent(matches[2]);
        }
        return params;
    };
    TokenManager = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], TokenManager);
    return TokenManager;
}(helpers_1.Storage));
exports.TokenManager = TokenManager;
//# sourceMappingURL=token.manager.js.map