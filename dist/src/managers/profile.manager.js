System.register(['@angular/core', 'rxjs/Rx', '@angular/http'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, Rx_1, http_1;
    var ProfileManager;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            ProfileManager = (function () {
                function ProfileManager(_http) {
                    this._http = _http;
                }
                ProfileManager.prototype.load = function (profileUrl, token) {
                    if (profileUrl == null)
                        return Rx_1.Observable.fromPromise(Promise.resolve(null));
                    var headers = new http_1.Headers();
                    headers.append('Authorization', 'Bearer ' + token.access_token);
                    var options = new http_1.RequestOptions({
                        headers: headers
                    });
                    return this._http.get(profileUrl, options).map(function (response) { return response.json(); });
                };
                ProfileManager = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], ProfileManager);
                return ProfileManager;
            }());
            exports_1("ProfileManager", ProfileManager);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1hbmFnZXJzL3Byb2ZpbGUubWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQU1BO2dCQUNJLHdCQUFvQixLQUFXO29CQUFYLFVBQUssR0FBTCxLQUFLLENBQU07Z0JBQUksQ0FBQztnQkFFcEMsNkJBQUksR0FBSixVQUFLLFVBQWtCLEVBQUUsS0FBYTtvQkFDbEMsRUFBRSxDQUFDLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQzt3QkFBQyxNQUFNLENBQUMsZUFBVSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBRTdFLElBQUksT0FBTyxHQUFZLElBQUksY0FBTyxFQUFFLENBQUM7b0JBQ3JDLE9BQU8sQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLFNBQVMsR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7b0JBQ2hFLElBQUksT0FBTyxHQUFHLElBQUkscUJBQWMsQ0FBQzt3QkFDN0IsT0FBTyxFQUFFLE9BQU87cUJBQ25CLENBQUMsQ0FBQztvQkFFSCxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFBLFFBQVEsSUFBSSxPQUFBLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBZixDQUFlLENBQUMsQ0FBQztnQkFDaEYsQ0FBQztnQkFkTDtvQkFBQyxpQkFBVSxFQUFFOztrQ0FBQTtnQkFlYixxQkFBQztZQUFELENBZEEsQUFjQyxJQUFBO1lBZEQsMkNBY0MsQ0FBQSIsImZpbGUiOiJzcmMvbWFuYWdlcnMvcHJvZmlsZS5tYW5hZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCB7SHR0cCwgUmVxdWVzdE9wdGlvbnMsIEhlYWRlcnN9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHtJRW5kcG9pbnQsIElUb2tlbn0gZnJvbSAnLi4vaGVscGVycyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQcm9maWxlTWFuYWdlciB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfaHR0cDogSHR0cCkgeyB9XG5cbiAgICBsb2FkKHByb2ZpbGVVcmw6IHN0cmluZywgdG9rZW46IElUb2tlbik6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIGlmIChwcm9maWxlVXJsID09IG51bGwpIHJldHVybiBPYnNlcnZhYmxlLmZyb21Qcm9taXNlKFByb21pc2UucmVzb2x2ZShudWxsKSk7XG5cbiAgICAgICAgbGV0IGhlYWRlcnM6IEhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xuICAgICAgICBoZWFkZXJzLmFwcGVuZCgnQXV0aG9yaXphdGlvbicsICdCZWFyZXIgJyArIHRva2VuLmFjY2Vzc190b2tlbik7XG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHtcbiAgICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnNcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2h0dHAuZ2V0KHByb2ZpbGVVcmwsIG9wdGlvbnMpLm1hcChyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpO1xuICAgIH1cbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
