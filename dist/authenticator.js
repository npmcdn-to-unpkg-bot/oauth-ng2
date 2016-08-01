"use strict";
var _1 = require('./');
var Authenticator = (function () {
    function Authenticator(_endpointManager, _tokenManager) {
        this._endpointManager = _endpointManager;
        this._tokenManager = _tokenManager;
    }
    Authenticator.prototype.authenticate = function (provider, force) {
        var _this = this;
        if (force === void 0) { force = false; }
        var token = this._tokenManager.get(provider);
        if (token != null && !force)
            return Promise.resolve(token);
        var endpoint = this._endpointManager.get(provider);
        var auth;
        if (window.hasOwnProperty('Office'))
            auth = this._openInDialog(endpoint);
        else
            auth = this._openInWindowPopup(endpoint);
        return auth.catch(function (error) { return _this._isTokenExpired(error); });
    };
    Authenticator.prototype._isTokenExpired = function (error) {
    };
    Authenticator.prototype._openInWindowPopup = function (endpoint) {
        var _this = this;
        var url = _1.EndpointManager.getLoginUrl(endpoint);
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
    Authenticator.prototype._openInDialog = function (endpoint) {
        var _this = this;
        var url = _1.EndpointManager.getLoginUrl(endpoint);
        var options = {
            height: 60,
            width: 40,
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
                        token.provider = endpoint.provider;
                        _this._tokenManager.add(endpoint.provider, token);
                        _this._tokenManager.setExpired(endpoint.provider);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aGVudGljYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9hdXRoZW50aWNhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxpQkFBK0QsSUFBSSxDQUFDLENBQUE7QUFHcEU7SUFDSSx1QkFDWSxnQkFBaUMsRUFDakMsYUFBMkI7UUFEM0IscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtRQUNqQyxrQkFBYSxHQUFiLGFBQWEsQ0FBYztJQUV2QyxDQUFDO0lBRUQsb0NBQVksR0FBWixVQUFhLFFBQWdCLEVBQUUsS0FBc0I7UUFBckQsaUJBV0M7UUFYOEIscUJBQXNCLEdBQXRCLGFBQXNCO1FBQ2pELElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzdDLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUM7WUFBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUzRCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRW5ELElBQUksSUFBSSxDQUFDO1FBQ1QsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUFDLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3pFLElBQUk7WUFBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTlDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsRUFBM0IsQ0FBMkIsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFTyx1Q0FBZSxHQUF2QixVQUF3QixLQUFL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