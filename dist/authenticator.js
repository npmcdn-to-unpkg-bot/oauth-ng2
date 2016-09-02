"use strict";
var endpoint_manager_1 = require('./managers/endpoint.manager');
var token_manager_1 = require('./managers/token.manager');
/**
 * Enumeration for the supported modes of Authentication.
 * Either dialog or redirection.
 */
(function (AuthenticationMode) {
    /**
     * Opens a the authorize url inside of a dialog.
     */
    AuthenticationMode[AuthenticationMode["Dialog"] = 0] = "Dialog";
    /**
     * Redirects the current window to the authorize url.
     */
    AuthenticationMode[AuthenticationMode["Redirect"] = 1] = "Redirect";
})(exports.AuthenticationMode || (exports.AuthenticationMode = {}));
var AuthenticationMode = exports.AuthenticationMode;
/**
 * Helper for performing Implicit OAuth Authentication with registered endpoints.
 */
var Authenticator = (function () {
    /**
     * @constructor
     *
     * @param endpointManager Depends on an instance of EndpointManager
     * @param TokenManager Depends on an instance of TokenManager
    */
    function Authenticator(_endpointManager, _tokenManager) {
        this._endpointManager = _endpointManager;
        this._tokenManager = _tokenManager;
        if (_endpointManager == null)
            throw 'Please pass an instance of EndpointManager.';
        if (_tokenManager == null)
            throw 'Please pass an instance of TokenManager.';
        if (_endpointManager.count == 0)
            throw 'No registered Endpoints could be found. Either use the default endpoint registrations or add one manually';
    }
    /**
     * Authenticate based on the given provider
     * Either uses DialogAPI or Window Popups based on where its being called from
     * viz. Add-in or Web.
     * If the token was cached, the it retrieves the cached token.
     *
     * WARNING: you have to manually check the expires_in or expires_at property to determine
     * if the token has expired. Not all OAuth providers support refresh token flows.
     *
     * @param {string} provider Link to the provider.
     * @param {boolean} force Force re-authentication.
     * @return {Promise<IToken>} Returns a promise of the token.
     */
    Authenticator.prototype.authenticate = function (provider, force) {
        if (force === void 0) { force = false; }
        var token = this._tokenManager.get(provider);
        if (token != null && !force)
            return Promise.resolve(token);
        var endpoint = this._endpointManager.get(provider);
        if (Authenticator.mode == AuthenticationMode.Redirect) {
            var url = endpoint_manager_1.EndpointManager.getLoginUrl(endpoint);
            location.replace(url);
            return Promise.reject('AUTH_REDIRECT');
        }
        else {
            var auth;
            if (Authenticator.isAddin)
                auth = this._openInDialog(endpoint);
            else
                auth = this._openInWindowPopup(endpoint);
            return auth.catch(function (error) { return console.error(error); });
        }
    };
    Object.defineProperty(Authenticator, "isDialog", {
        /**
         * Check if the currrent url is running inside of a Dialog that contains an access_token or code or error.
         * If true then it calls messageParent by extracting the token information.
         *
         * @return {boolean}
         * Returns false if the code is running inside of a dialog without the requried information
         * or is not running inside of a dialog at all.
         */
        get: function () {
            if (!Authenticator.isAddin)
                return false;
            else {
                if (!token_manager_1.TokenManager.isTokenUrl(location.href))
                    return false;
                var token = token_manager_1.TokenManager.getToken(location.href, location.origin);
                Office.context.ui.messageParent(JSON.stringify(token));
                return true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Authenticator, "isAddin", {
        get: function () {
            if (Authenticator._isAddin == null) {
                Authenticator._isAddin =
                    window.hasOwnProperty('Office') &&
                        (window.hasOwnProperty('Word') ||
                            window.hasOwnProperty('Excel') ||
                            window.hasOwnProperty('OneNote'));
            }
            return Authenticator._isAddin;
        },
        set: function (value) {
            Authenticator._isAddin = value;
        },
        enumerable: true,
        configurable: true
    });
    Authenticator.prototype._openInWindowPopup = function (endpoint) {
        var _this = this;
        var url = endpoint_manager_1.EndpointManager.getLoginUrl(endpoint);
        var windowSize = endpoint.windowSize || "width=400,height=600";
        var windowFeatures = windowSize + ",menubar=no,toolbar=no,location=no,resizable=no,scrollbars=yes,status=no";
        var popupWindow = window.open(url, endpoint.provider.toUpperCase(), windowFeatures);
        return new Promise(function (resolve, reject) {
            try {
                var interval_1 = setInterval(function () {
                    try {
                        if (popupWindow.document.URL.indexOf(endpoint.redirectUrl) !== -1) {
                            clearInterval(interval_1);
                            var result = token_manager_1.TokenManager.getToken(popupWindow.document.URL, endpoint.redirectUrl);
                            if (result == null)
                                reject('No access_token or code could be parsed.');
                            else if ('code' in result) {
                                popupWindow.close();
                                resolve(result);
                            }
                            else if ('access_token' in result) {
                                _this._tokenManager.add(endpoint.provider, result);
                                popupWindow.close();
                                resolve(result);
                            }
                            else {
                                reject(result);
                            }
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
    Authenticator.prototype._openInDialog = function (endpoint) {
        var _this = this;
        var url = endpoint_manager_1.EndpointManager.getLoginUrl(endpoint);
        var options = {
            height: 35,
            width: 35,
            requireHTTPS: true
        };
        return new Promise(function (resolve, reject) {
            Office.context.ui.displayDialogAsync(url, options, function (result) {
                var dialog = result.value;
                dialog.addEventHandler(Office.EventType.DialogMessageReceived, function (args) {
                    dialog.close();
                    try {
                        if (args.message == null || args.message === '')
                            reject('No access_token or code could be parsed.');
                        var json = JSON.parse(args.message);
                        if ('code' in json) {
                            resolve(json);
                        }
                        else if ('access_token' in json) {
                            _this._tokenManager.add(endpoint.provider, json);
                            resolve(json);
                        }
                        else {
                            reject(json);
                        }
                    }
                    catch (exception) {
                        reject(exception);
                    }
                });
            });
        });
    };
    /**
     * Controls the way the authentication should take place.
     * Either by using dialog or by redirecting the current window.
     * Defaults to the dialog flow.
     */
    Authenticator.mode = AuthenticationMode.Dialog;
    return Authenticator;
}());
exports.Authenticator = Authenticator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aGVudGljYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9hdXRoZW50aWNhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxpQ0FBeUMsNkJBQTZCLENBQUMsQ0FBQTtBQUN2RSw4QkFBa0QsMEJBQTBCLENBQUMsQ0FBQTtBQUU3RTs7O0dBR0c7QUFDSCxXQUFZLGtCQUFrQjtJQUMxQjs7T0FFRztJQUNILCtEQUFNLENBQUE7SUFFTjs7T0FFRztJQUNILG1FQUFRLENBQUE7QUFDWixDQUFDLEVBVlcsMEJBQWtCLEtBQWxCLDBCQUFrQixRQVU3QjtBQVZELElBQVksa0JBQWtCLEdBQWxCLDBCQVVYLENBQUE7QUFFRDs7R0FFRztBQUNIO0lBQ0k7Ozs7O01BS0U7SUFDRix1QkFDWSxnQkFBaUMsRUFDakMsYUFBMkI7UUFEM0IscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtRQUNqQyxrQkFBYSxHQUFiLGFBQWEsQ0FBYztRQUVuQyxFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJLENBQUM7WUFBQyxNQUFNLDZDQUE2QyxDQUFDO1FBQ2xGLEVBQUUsQ0FBQyxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUM7WUFBQyxNQUFNLDBDQUEwQyxDQUFDO1FBQzVFLEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLEtBQUssSUFBSSxDQUFDLENBQUM7WUFBQyxNQUFNLDJHQUEyRyxDQUFDO0lBQ3ZKLENBQUM7SUFTRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxvQ0FBWSxHQUFaLFVBQWEsUUFBZ0IsRUFBRSxLQUFzQjtRQUF0QixxQkFBc0IsR0FBdEIsYUFBc0I7UUFDakQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0MsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQztZQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMs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