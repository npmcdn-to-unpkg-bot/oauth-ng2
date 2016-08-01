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