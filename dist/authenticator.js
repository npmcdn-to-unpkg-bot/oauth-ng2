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
            return window.hasOwnProperty('Office') &&
                (window.hasOwnProperty('Word') ||
                    window.hasOwnProperty('Excel') ||
                    window.hasOwnProperty('PowerPoint') ||
                    window.hasOwnProperty('OneNote'));
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