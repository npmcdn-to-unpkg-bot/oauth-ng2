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
        return this._openInPopup(endpoint)
            .catch(function (error) { return _this._isTokenExpired(error); });
    };
    Authenticator.prototype._isTokenExpired = function (error) {
    };
    Authenticator.prototype._openInPopup = function (endpoint) {
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
    return Authenticator;
}());
exports.Authenticator = Authenticator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aGVudGljYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9hdXRoZW50aWNhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxpQkFBK0QsSUFBSSxDQUFDLENBQUE7QUFFcEU7SUFDSSx1QkFDWSxnQkFBaUMsRUFDakMsYUFBMkI7UUFEM0IscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtRQUNqQyxrQkFBYSxHQUFiLGFBQWEsQ0FBYztJQUV2QyxDQUFDO0lBRUQsb0NBQVksR0FBWixVQUFhLFFBQWdCLEVBQUUsS0FBc0I7UUFBckQsaUJBT0M7UUFQOEIscUJBQXNCLEdBQXRCLGFBQXNCO1FBQ2pELElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzdDLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUM7WUFBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUzRCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ25ELE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQzthQUM3QixLQUFLLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxFQUEzQixDQUEyQixDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVPLHVDQUFlLEdBQXZCLFVBQXdCLEtBQUs7SUFFN0IsQ0FBQztJQUVPLG9DQUFZLEdBQXBCLFVBQXFCLFFBQW1CO1FBQXhDLGlCQThCQztRQTdCRyxJQUFJLEdBQUcsR0FBRyxrQkFBZSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoRCxJQUFJLFVBQVUsR0FBRyxRQUFRLENBQUMsVUFBVSxJQUFJLHNCQUFzQixDQUFDO1FBQy9ELElBQUksY0FBYyxHQUFHLFVBQVUsR0FBRywwRUFBMEUsQ0FBQztRQUM3RyxJQUFJLFdBQVcsR0FBVyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBRTVGLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBUyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ3ZDLElBQUksQ0FBQztnQkFDRCxJQUFJLFVBQVEsR0FBRyxXQUFXLENBQUM7b0JBQ3ZCLElBQUksQ0FBQzt3QkFDRCxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDaEUsYUFBYSxDQUFDLFVBQVEsQ0FBQyxDQUFDOzRCQUN4QixJQUFJLEtBQUssR0FBRyxLQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQTs0QkFDM0UsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDOzRCQUNwQixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ25CLENBQUM7b0JBQ0wsQ0FDQTtvQkFBQSxLQUFLLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO3dCQUNmLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQzs0QkFDZixhQUFhLENBQUMsVUFBUSxDQUFDLENBQUM7NEJBQ3hCLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQzt3QkFDdEIsQ0FBQztvQkFDTCxDQUFDO2dCQUNMLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNaLENBQ0E7WUFBQSxLQUFLLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNmLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDcEIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3RCLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDTCxvQkFBQztBQUFELENBQUMsQUFuREQsSUFtREM7QUFuRFkscUJBQWEsZ0JBbUR6QixDQUFBIn0=