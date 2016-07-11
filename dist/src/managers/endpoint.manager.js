System.register(['@angular/core', '../helpers'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
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
    var core_1, helpers_1;
    var EndpointManager;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (helpers_1_1) {
                helpers_1 = helpers_1_1;
            }],
        execute: function() {
            EndpointManager = (function (_super) {
                __extends(EndpointManager, _super);
                function EndpointManager() {
                    _super.call(this, 'OAuth2Endpoints', helpers_1.StorageType.LocalStorage);
                }
                Object.defineProperty(EndpointManager.prototype, "currentHost", {
                    get: function () {
                        if (this._currentHost == null) {
                            this._currentHost = window.location.protocol + "//" + window.location.host;
                        }
                        return this._currentHost;
                    },
                    enumerable: true,
                    configurable: true
                });
                EndpointManager.prototype.registerGoogleAuth = function (clientId, redirect_uri, scope) {
                    var config = {
                        provider: 'Google',
                        clientId: clientId,
                        redirectUrl: redirect_uri || this.currentHost,
                        profileUrl: 'https://www.googleapis.com/plus/v1/people/me',
                        site: 'https://accounts.google.com',
                        authorizeUrl: '/o/oauth2/v2/auth',
                        resource: 'https://www.googleapis.com',
                        responseType: 'token',
                        scope: scope || 'https://www.googleapis.com/auth/plus.me'
                    };
                    this.add(config.provider, config);
                };
                ;
                EndpointManager.prototype.registerMicrosoftAuth = function (clientId, redirect_uri, scope) {
                    var config = {
                        provider: 'Microsoft',
                        clientId: clientId,
                        redirectUrl: redirect_uri || this.currentHost,
                        profileUrl: 'https://graph.microsoft.com/v1.0/me',
                        site: 'https://login.microsoftonline.com/common/oauth2/v2.0',
                        authorizeUrl: '/authorize',
                        resource: 'https://login.live.com',
                        responseType: 'token',
                        scope: scope || 'https://graph.microsoft.com/user.read',
                        extraParameters: '&response_mode=fragment'
                    };
                    this.add(config.provider, config);
                };
                ;
                EndpointManager.prototype.registerFacebookAuth = function (clientId, redirect_uri, scope) {
                    var config = {
                        provider: 'Facebook',
                        clientId: clientId,
                        redirectUrl: redirect_uri || this.currentHost,
                        profileUrl: 'https://graph.facebook.com/v2.5/me',
                        site: 'https://www.facebook.com',
                        authorizeUrl: '/dialog/oauth',
                        resource: 'https://graph.facebook.com',
                        responseType: 'token',
                        scope: scope || 'public_profile'
                    };
                    this.add(config.provider, config);
                };
                ;
                EndpointManager.getLoginUrl = function (endpointConfig) {
                    var oAuthScope = (endpointConfig.scope) ? encodeURIComponent(endpointConfig.scope) : '', state = (endpointConfig.state) ? encodeURIComponent(endpointConfig.state) : '', authPathHasQuery = (endpointConfig.authorizeUrl.indexOf('?') === -1) ? false : true, appendChar = (authPathHasQuery) ? '&' : '?', responseType = (endpointConfig.responseType) ? encodeURIComponent(endpointConfig.responseType) : '';
                    var url = endpointConfig.site + endpointConfig.authorizeUrl + appendChar +
                        'response_type=' + responseType + '&' +
                        'client_id=' + encodeURIComponent(endpointConfig.clientId) + '&' +
                        'redirect_uri=' + encodeURIComponent(endpointConfig.redirectUrl) + '&' +
                        'scope=' + oAuthScope + '&' +
                        'state=' + state;
                    var random = new Uint16Array(1);
                    crypto.getRandomValues(random);
                    url = url + '&nounce=' + random[0];
                    return url;
                };
                EndpointManager = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], EndpointManager);
                return EndpointManager;
            }(helpers_1.Storage));
            exports_1("EndpointManager", EndpointManager);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1hbmFnZXJzL2VuZHBvaW50Lm1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQUlBO2dCQUFxQyxtQ0FBa0I7Z0JBQ25EO29CQUNJLGtCQUFNLGlCQUFpQixFQUFFLHFCQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ3ZELENBQUM7Z0JBR0Qsc0JBQUksd0NBQVc7eUJBQWY7d0JBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDOzRCQUM1QixJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLElBQUksR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQzt3QkFDL0UsQ0FBQzt3QkFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztvQkFDN0IsQ0FBQzs7O21CQUFBO2dCQUVELDRDQUFrQixHQUFsQixVQUFtQixRQUFnQixFQUFFLFlBQXFCLEVBQUUsS0FBYztvQkFDdEUsSUFBSSxNQUFNLEdBQWM7d0JBQ3BCLFFBQVEsRUFBRSxRQUFRO3dCQUNsQixRQUFRLEVBQUUsUUFBUTt3QkFDbEIsV0FBVyxFQUFFLFlBQVksSUFBSSxJQUFJLENBQUMsV0FBVzt3QkFDN0MsVUFBVSxFQUFFLDhDQUE4Qzt3QkFDMUQsSUFBSSxFQUFFLDZCQUE2Qjt3QkFDbkMsWUFBWSxFQUFFLG1CQUFtQjt3QkFDakMsUUFBUSxFQUFFLDRCQUE0Qjt3QkFDdEMsWUFBWSxFQUFFLE9BQU87d0JBQ3JCLEtBQUssRUFBRSxLQUFLLElBQUkseUNBQXlDO3FCQUM1RCxDQUFDO29CQUVGLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDdEMsQ0FBQzs7Z0JBRUQsK0NBQXFCLEdBQXJCLFVBQXNCLFFBQWdCLEVBQUUsWUFBcUIsRUFBRSxLQUFjO29CQUN6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c3JjL21hbmFnZXJzL2VuZHBvaW50Lm1hbmFnZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5pbXBvcnQge1N0b3JhZ2UsIFN0b3JhZ2VUeXBlLCBJRW5kcG9pbnR9IGZyb20gJy4uL2hlbHBlcnMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRW5kcG9pbnRNYW5hZ2VyIGV4dGVuZHMgU3RvcmFnZTxJRW5kcG9pbnQ+IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoJ09BdXRoMkVuZHBvaW50cycsIFN0b3JhZ2VUeXBlLkxvY2FsU3RvcmFnZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY3VycmVudEhvc3Q6IHN0cmluZztcbiAgICBnZXQgY3VycmVudEhvc3QoKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHRoaXMuX2N1cnJlbnRIb3N0ID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRIb3N0ID0gd2luZG93LmxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgd2luZG93LmxvY2F0aW9uLmhvc3Q7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudEhvc3Q7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJHb29nbGVBdXRoKGNsaWVudElkOiBzdHJpbmcsIHJlZGlyZWN0X3VyaT86IHN0cmluZywgc2NvcGU/OiBzdHJpbmcpIHtcbiAgICAgICAgdmFyIGNvbmZpZyA9IDxJRW5kcG9pbnQ+e1xuICAgICAgICAgICAgcHJvdmlkZXI6ICdHb29nbGUnLFxuICAgICAgICAgICAgY2xpZW50SWQ6IGNsaWVudElkLFxuICAgICAgICAgICAgcmVkaXJlY3RVcmw6IHJlZGlyZWN0X3VyaSB8fCB0aGlzLmN1cnJlbnRIb3N0LFxuICAgICAgICAgICAgcHJvZmlsZVVybDogJ2h0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL3BsdXMvdjEvcGVvcGxlL21lJyxcbiAgICAgICAgICAgIHNpdGU6ICdodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20nLFxuICAgICAgICAgICAgYXV0aG9yaXplVXJsOiAnL28vb2F1dGgyL3YyL2F1dGgnLFxuICAgICAgICAgICAgcmVzb3VyY2U6ICdodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbScsXG4gICAgICAgICAgICByZXNwb25zZVR5cGU6ICd0b2tlbicsXG4gICAgICAgICAgICBzY29wZTogc2NvcGUgfHwgJ2h0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvcGx1cy5tZSdcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmFkZChjb25maWcucHJvdmlkZXIsIGNvbmZpZyk7XG4gICAgfTtcblxuICAgIHJlZ2lzdGVyTWljcm9zb2Z0QXV0aChjbGllbnRJZDogc3RyaW5nLCByZWRpcmVjdF91cmk/OiBzdHJpbmcsIHNjb3BlPzogc3RyaW5nKSB7XG4gICAgICAgIHZhciBjb25maWcgPSA8SUVuZHBvaW50PntcbiAgICAgICAgICAgIHByb3ZpZGVyOiAnTWljcm9zb2Z0JyxcbiAgICAgICAgICAgIGNsaWVudElkOiBjbGllbnRJZCxcbiAgICAgICAgICAgIHJlZGlyZWN0VXJsOiByZWRpcmVjdF91cmkgfHwgdGhpcy5jdXJyZW50SG9zdCxcbiAgICAgICAgICAgIHByb2ZpbGVVcmw6ICdodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20vdjEuMC9tZScsXG4gICAgICAgICAgICBzaXRlOiAnaHR0cHM6Ly9sb2dpbi5taWNyb3NvZnRvbmxpbmUuY29tL2NvbW1vbi9vYXV0aDIvdjIuMCcsXG4gICAgICAgICAgICBhdXRob3JpemVVcmw6ICcvYXV0aG9yaXplJyxcbiAgICAgICAgICAgIHJlc291cmNlOiAnaHR0cHM6Ly9sb2dpbi5saXZlLmNvbScsXG4gICAgICAgICAgICByZXNwb25zZVR5cGU6ICd0b2tlbicsXG4gICAgICAgICAgICBzY29wZTogc2NvcGUgfHwgJ2h0dHBzOi8vZ3JhcGgubWljcm9zb2Z0LmNvbS91c2VyLnJlYWQnLFxuICAgICAgICAgICAgZXh0cmFQYXJhbWV0ZXJzOiAnJnJlc3BvbnNlX21vZGU9ZnJhZ21lbnQnXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5hZGQoY29uZmlnLnByb3ZpZGVyLCBjb25maWcpO1xuICAgIH07XG5cbiAgICByZWdpc3RlckZhY2Vib29rQXV0aChjbGllbnRJZDogc3RyaW5nLCByZWRpcmVjdF91cmk/OiBzdHJpbmcsIHNjb3BlPzogc3RyaW5nKSB7XG4gICAgICAgIHZhciBjb25maWcgPSA8SUVuZHBvaW50PntcbiAgICAgICAgICAgIHByb3ZpZGVyOiAnRmFjZWJvb2snLFxuICAgICAgICAgICAgY2xpZW50SWQ6IGNsaWVudElkLFxuICAgICAgICAgICAgcmVkaXJlY3RVcmw6IHJlZGlyZWN0X3VyaSB8fCB0aGlzLmN1cnJlbnRIb3N0LFxuICAgICAgICAgICAgcHJvZmlsZVVybDogJ2h0dHBzOi8vZ3JhcGguZmFjZWJvb2suY29tL3YyLjUvbWUnLFxuICAgICAgICAgICAgc2l0ZTogJ2h0dHBzOi8vd3d3LmZhY2Vib29rLmNvbScsXG4gICAgICAgICAgICBhdXRob3JpemVVcmw6ICcvZGlhbG9nL29hdXRoJyxcbiAgICAgICAgICAgIHJlc291cmNlOiAnaHR0cHM6Ly9ncmFwaC5mYWNlYm9vay5jb20nLFxuICAgICAgICAgICAgcmVzcG9uc2VUeXBlOiAndG9rZW4nLFxuICAgICAgICAgICAgc2NvcGU6IHNjb3BlIHx8ICdwdWJsaWNfcHJvZmlsZSdcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmFkZChjb25maWcucHJvdmlkZXIsIGNvbmZpZyk7XG4gICAgfTtcblxuICAgIHN0YXRpYyBnZXRMb2dpblVybChlbmRwb2ludENvbmZpZzogSUVuZHBvaW50KTogc3RyaW5nIHtcbiAgICAgICAgdmFyIG9BdXRoU2NvcGUgPSAoZW5kcG9pbnRDb25maWcuc2NvcGUpID8gZW5jb2RlVVJJQ29tcG9uZW50KGVuZHBvaW50Q29uZmlnLnNjb3BlKSA6ICcnLFxuICAgICAgICAgICAgc3RhdGUgPSAoZW5kcG9pbnRDb25maWcuc3RhdGUpID8gZW5jb2RlVVJJQ29tcG9uZW50KGVuZHBvaW50Q29uZmlnLnN0YXRlKSA6ICcnLFxuICAgICAgICAgICAgYXV0aFBhdGhIYXNRdWVyeSA9IChlbmRwb2ludENvbmZpZy5hdXRob3JpemVVcmwuaW5kZXhPZignPycpID09PSAtMSkgPyBmYWxzZSA6IHRydWUsXG4gICAgICAgICAgICBhcHBlbmRDaGFyID0gKGF1dGhQYXRoSGFzUXVlcnkpID8gJyYnIDogJz8nLFxuICAgICAgICAgICAgcmVzcG9uc2VUeXBlID0gKGVuZHBvaW50Q29uZmlnLnJlc3BvbnNlVHlwZSkgPyBlbmNvZGVVUklDb21wb25lbnQoZW5kcG9pbnRDb25maWcucmVzcG9uc2VUeXBlKSA6ICcnO1xuXG4gICAgICAgIHZhciB1cmwgPSBlbmRwb2ludENvbmZpZy5zaXRlICsgZW5kcG9pbnRDb25maWcuYXV0aG9yaXplVXJsICsgYXBwZW5kQ2hhciArXG4gICAgICAgICAgICAncmVzcG9uc2VfdHlwZT0nICsgcmVzcG9uc2VUeXBlICsgJyYnICtcbiAgICAgICAgICAgICdjbGllbnRfaWQ9JyArIGVuY29kZVVSSUNvbXBvbmVudChlbmRwb2ludENvbmZpZy5jbGllbnRJZCkgKyAnJicgK1xuICAgICAgICAgICAgJ3JlZGlyZWN0X3VyaT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KGVuZHBvaW50Q29uZmlnLnJlZGlyZWN0VXJsKSArICcmJyArXG4gICAgICAgICAgICAnc2NvcGU9JyArIG9BdXRoU2NvcGUgKyAnJicgK1xuICAgICAgICAgICAgJ3N0YXRlPScgKyBzdGF0ZTtcblxuICAgICAgICB2YXIgcmFuZG9tID0gbmV3IFVpbnQxNkFycmF5KDEpO1xuICAgICAgICBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKHJhbmRvbSk7XG4gICAgICAgIHVybCA9IHVybCArICcmbm91bmNlPScgKyByYW5kb21bMF07XG5cbiAgICAgICAgcmV0dXJuIHVybDtcbiAgICB9XG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
