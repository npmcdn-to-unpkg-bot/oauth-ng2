System.register(['@angular/core', './managers'], function(exports_1, context_1) {
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
    var core_1, managers_1;
    var Authenticator;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (managers_1_1) {
                managers_1 = managers_1_1;
            }],
        execute: function() {
            Authenticator = (function () {
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
            exports_1("default", Authenticator);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1dGhlbnRpY2F0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFLQTtnQkFDSSx1QkFDWSxnQkFBaUMsRUFDakMsYUFBMkIsRUFDM0IsZUFBK0I7b0JBRi9CLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7b0JBQ2pDLGtCQUFhLEdBQWIsYUFBYSxDQUFjO29CQUMzQixvQkFBZSxHQUFmLGVBQWUsQ0FBZ0I7Z0JBRTNDLENBQUM7Z0JBRUQsb0NBQVksR0FBWixVQUFhLFFBQWdCO29CQUN6QixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUNuRCxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDdkMsQ0FBQztnQkFFTyxvQ0FBWSxHQUFwQixVQUFxQixRQUFtQjtvQkFBeEMsaUJBOEJDO29CQTdCRyxJQUFJLEdBQUcsR0FBRywwQkFBZSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDaEQsSUFBSSxVQUFVLEdBQUcsUUFBUSxDQUFDLFVBQVUsSUFBSSxzQkFBc0IsQ0FBQztvQkFDL0QsSUFBSSxjQUFjLEdBQUcsVUFBVSxHQUFHLDBFQUEwRSxDQUFDO29CQUM3RyxJQUFJLFdBQVcsR0FBVyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxFQUFFLGNBQWMsQ0FBQyxDQUFDO29CQUU1RixNQUFNLENBQUMsSUFBSSxPQUFPLENBQVMsVUFBQyxPQUFPLEVBQUUsTUFBTTt3QkFDdkMsSUFBSSxDQUFDOzRCQUNELElBQUksVUFBUSxHQUFHLFdBQVcsQ0FBQztnQ0FDdkIsSUFBSSxDQUFDO29DQUNELEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dDQUNoRSxhQUFhLENBQUMsVUFBUSxDQUFDLENBQUM7d0NBQ3hCLElBQUksS0FBSyxHQUFHLEtBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFBO3dDQUMzRSxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7d0NBQ3BCLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztvQ0FDbkIsQ0FBQztnQ0FDTCxDQUNBO2dDQUFBLEtBQUssQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7b0NBQ2YsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO3dDQUNmLGFBQWEsQ0FBQyxVQUFRLENBQUMsQ0FBQzt3Q0FDeEIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29DQUN0QixDQUFDO2dDQUNMLENBQUM7NEJBQ0wsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO3dCQUNaLENBQ0E7d0JBQUEsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzs0QkFDZixXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7NEJBQ3BCLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQzt3QkFDdEIsQ0FBQztvQkFDTCxDQUFDLENBQUMsQ0FBQztnQkFDUCxDQUFDO2dCQTVDTDtvQkFBQyxpQkFBVSxFQUFFOztpQ0FBQTtnQkE2Q2Isb0JBQUM7WUFBRCxDQTVDQSxBQTRDQyxJQUFBO1lBNUNELG1DQTRDQyxDQUFBIiwiZmlsZSI6InNyYy9hdXRoZW50aWNhdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RW5kcG9pbnRNYW5hZ2VyLCBUb2tlbk1hbmFnZXIsIFByb2ZpbGVNYW5hZ2VyfSBmcm9tICcuL21hbmFnZXJzJztcbmltcG9ydCB7SVRva2VuLCBJRW5kcG9pbnR9IGZyb20gJy4vaGVscGVycyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEF1dGhlbnRpY2F0b3Ige1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIF9lbmRwb2ludE1hbmFnZXI6IEVuZHBvaW50TWFuYWdlcixcbiAgICAgICAgcHJpdmF0ZSBfdG9rZW5NYW5hZ2VyOiBUb2tlbk1hbmFnZXIsXG4gICAgICAgIHByaXZhdGUgX3Byb2ZpbGVNYW5hZ2VyOiBQcm9maWxlTWFuYWdlclxuICAgICkge1xuICAgIH1cblxuICAgIGF1dGhlbnRpY2F0ZShwcm92aWRlcjogc3RyaW5nKTogUHJvbWlzZTxJVG9rZW4+IHtcbiAgICAgICAgbGV0IGVuZHBvaW50ID0gdGhpcy5fZW5kcG9pbnRNYW5hZ2VyLmdldChwcm92aWRlcik7XG4gICAgICAgIHJldHVybiB0aGlzLl9vcGVuSW5Qb3B1cChlbmRwb2ludCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfb3BlbkluUG9wdXAoZW5kcG9pbnQ6IElFbmRwb2ludCkge1xuICAgICAgICBsZXQgdXJsID0gRW5kcG9pbnRNYW5hZ2VyLmdldExvZ2luVXJsKGVuZHBvaW50KTtcbiAgICAgICAgbGV0IHdpbmRvd1NpemUgPSBlbmRwb2ludC53aW5kb3dTaXplIHx8IFwid2lkdGg9NDAwLGhlaWdodD02MDBcIjtcbiAgICAgICAgbGV0IHdpbmRvd0ZlYXR1cmVzID0gd2luZG93U2l6ZSArIFwiLG1lbnViYXI9bm8sdG9vbGJhcj1ubyxsb2NhdGlvbj1ubyxyZXNpemFibGU9bm8sc2Nyb2xsYmFycz15ZXMsc3RhdHVzPW5vXCI7XG4gICAgICAgIGxldCBwb3B1cFdpbmRvdzogV2luZG93ID0gd2luZG93Lm9wZW4odXJsLCBlbmRwb2ludC5wcm92aWRlci50b1VwcGVyQ2FzZSgpLCB3aW5kb3dGZWF0dXJlcyk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPElUb2tlbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocG9wdXBXaW5kb3cuZG9jdW1lbnQuVVJMLmluZGV4T2YoZW5kcG9pbnQucmVkaXJlY3RVcmwpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0b2tlbiA9IHRoaXMuX3Rva2VuTWFuYWdlci5nZXRUb2tlbihwb3B1cFdpbmRvdy5kb2N1bWVudC5VUkwsIGVuZHBvaW50KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvcHVwV2luZG93LmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0b2tlbik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGV4Y2VwdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFwb3B1cFdpbmRvdykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChleGNlcHRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgNDAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChleGNlcHRpb24pIHtcbiAgICAgICAgICAgICAgICBwb3B1cFdpbmRvdy5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIHJlamVjdChleGNlcHRpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
