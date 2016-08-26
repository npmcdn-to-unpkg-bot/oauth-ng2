"use strict";
var endpoint_manager_1 = require('./managers/endpoint.manager');
var token_manager_1 = require('./managers/token.manager');
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
        var auth;
        if (Authenticator.isAddin)
            auth = this._openInDialog(endpoint);
        else
            auth = this._openInWindowPopup(endpoint);
        return auth.catch(function (error) { return console.error(error); });
    };
    /**
     * Check if the supplied url has either access_token or code or error
     */
    Authenticator.isTokenUrl = function (url) {
        var regex = /(access_token|code|error)/gi;
        return regex.test(url);
    };
    Object.defineProperty(Authenticator, "isAddin", {
        get: function () {
            Authenticator._isAddin =
                window.hasOwnProperty('Office') &&
                    (window.hasOwnProperty('Word') ||
                        window.hasOwnProperty('Excel') ||
                        window.hasOwnProperty('OneNote'));
            return Authenticator._isAddin;
        },
        set: function (value) {
            Authenticator._isAddin = true;
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
                            var token = token_manager_1.TokenManager.getToken(popupWindow.document.URL, endpoint.redirectUrl);
                            _this._tokenManager.add(endpoint.provider, token);
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
                dialog.addEventHandler(Microsoft.Office.WebExtension.EventType.DialogMessageReceived, function (args) {
                    dialog.close();
                    try {
                        if (args.message == '' || args.message == null) {
                            reject("No token received");
                        }
                        if (args.message.indexOf('access_token') == -1) {
                            reject(JSON.parse(args.message));
                        }
                        var token = JSON.parse(args.message);
                        _this._tokenManager.add(endpoint.provider, token);
                        resolve(token);
                    }
                    catch (exception) {
                        reject(exception);
                    }
                });
            });
        });
    };
    return Authenticator;
}());
exports.Authenticator = Authenticator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aGVudGljYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9hdXRoZW50aWNhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxpQ0FBeUMsNkJBQTZCLENBQUMsQ0FBQTtBQUN2RSw4QkFBbUMsMEJBQTBCLENBQUMsQ0FBQTtBQUk5RDs7R0FFRztBQUNIO0lBQ0k7Ozs7O01BS0U7SUFDRix1QkFDWSxnQkFBaUMsRUFDakMsYUFBMkI7UUFEM0IscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtRQUNqQyxrQkFBYSxHQUFiLGFBQWEsQ0FBYztJQUV2QyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsb0NBQVksR0FBWixVQUFhLFFBQWdCLEVBQUUsS0FBc0I7UUFBdEIscUJBQXNCLEdBQXRCLGFBQXNCO1FBQ2pELElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzdDLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUM7WUFBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUzRCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRW5ELElBQUksSUFBSSxDQUFDO1FBQ1QsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQztZQUFDLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9ELElBQUk7WUFBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTlDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBcEIsQ0FB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