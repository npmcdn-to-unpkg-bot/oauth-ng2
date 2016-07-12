"use strict";
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
var managers_1 = require('./managers');
var Authenticator = (function () {
    function Authenticator(_endpointManager, _tokenManager, _profileManager) {
        this._endpointManager = _endpointManager;
        this._tokenManager = _tokenManager;
        this._profileManager = _profileManager;
    }
    Authenticator.prototype.authenticate = function (provider) {
        var endpoint = this._endpointManager.get(provider);
        return this._openInPopup(endpoint);
    };
    Authenticator.prototype._openInPopup = function (endpoint) {
        var _this = this;
        var url = managers_1.EndpointManager.getLoginUrl(endpoint);
        var windowSize = endpoint.windowSize || "width=400,height=600";
        var windowFeatures = windowSize + ",menubar=no,toolbar=no,location=no,resizable=no,scrollbars=yes,status=no";
        var popupWindow = window.open(url, endpoint.provider.toUpperCase(), windowFeatures);
        return new Promise(function (resolve, reject) {
            try {
                var interval_1 = setInterval(function () {
                    try {
                        if (popupWindow.document.URL.indexOf(endpoint.redirectUrl) !== -1) {
                            clearInterval(interval_1);
                            var token = _this._tokenManager.getToken(popupWindow.document.URL, endpoint);
                            popupWindow.close();
                            resolve(token);
                        }
                    }
                    catch (exception) {
                        if (!popupWindow) {
                            clearInterval(interval_1);
                            reject(exception);
                        }
                    }
                }, 400);
            }
            catch (exception) {
                popupWindow.close();
                reject(exception);
            }
        });
    };
    Authenticator = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [managers_1.EndpointManager, managers_1.TokenManager, managers_1.ProfileManager])
    ], Authenticator);
    return Authenticator;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Authenticator;
//# sourceMappingURL=authenticator.js.map