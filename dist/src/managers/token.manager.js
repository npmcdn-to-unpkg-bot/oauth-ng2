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
    var TokenManager;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (helpers_1_1) {
                helpers_1 = helpers_1_1;
            }],
        execute: function() {
            TokenManager = (function (_super) {
                __extends(TokenManager, _super);
                function TokenManager() {
                    _super.call(this, 'OAuth2Tokens', helpers_1.StorageType.LocalStorage);
                }
                TokenManager.prototype.setExpired = function (provider) {
                    // return (this._tokens.endpo && this.token.expires_at && this.token.expires_at < new Date());
                };
                TokenManager.prototype.getToken = function (segment, endpoint, delimiter) {
                    if (delimiter === void 0) { delimiter = '#'; }
                    segment = segment.replace(endpoint.redirectUrl, '');
                    var parts = segment.split(delimiter);
                    if (parts.length <= 0)
                        return;
                    var rightPart = parts.length >= 2 ? parts[1] : parts[0];
                    rightPart = rightPart.replace('/', '');
                    if (rightPart.indexOf("?") !== -1) {
                        var queryPart = rightPart.split("?");
                        if (!queryPart || queryPart.length <= 0)
                            return;
                        rightPart = queryPart[1];
                    }
                    var params = this._extractParams(rightPart);
                    params.provider = endpoint.provider;
                    this.add(endpoint.provider, params);
                    return Promise.resolve(params);
                };
                TokenManager.prototype._extractParams = function (segment) {
                    var params = {}, regex = /([^&=]+)=([^&]*)/g, matches;
                    while ((matches = regex.exec(segment)) !== null) {
                        params[decodeURIComponent(matches[1])] = decodeURIComponent(matches[2]);
                    }
                    return params;
                };
                TokenManager = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], TokenManager);
                return TokenManager;
            }(helpers_1.Storage));
            exports_1("TokenManager", TokenManager);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1hbmFnZXJzL3Rva2VuLm1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQUtBO2dCQUFrQyxnQ0FBZTtnQkFDN0M7b0JBQ0ksa0JBQU0sY0FBYyxFQUFFLHFCQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ3BELENBQUM7Z0JBRUQsaUNBQVUsR0FBVixVQUFXLFFBQWdCO29CQUN2Qiw4RkFBOEY7Z0JBQ2xHLENBQUM7Z0JBRUQsK0JBQVEsR0FBUixVQUFTLE9BQWUsRUFBRSxRQUFtQixFQUFFLFNBQXVCO29CQUF2Qix5QkFBdUIsR0FBdkIsZUFBdUI7b0JBQ2xFLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBRXBELElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ3JDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO3dCQUFDLE1BQU0sQ0FBQztvQkFFOUIsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDeEQsU0FBUyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUV2QyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDaEMsSUFBSSxTQUFTLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDckMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLElBQUksU0FBUyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUM7NEJBQUMsTUFBTSxDQUFDO3dCQUNoRCxTQUFTLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM3QixDQUFDO29CQUVELElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQzVDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQztvQkFDcEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO29CQUNwQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBUyxNQUFNLENBQUMsQ0FBQztnQkFDM0MsQ0FBQztnQkFFTyxxQ0FBYyxHQUF0QixVQUF1QixPQUFlO29CQUNsQyxJQUFJLE1BQU0sR0FBUSxFQUFFLEVBQ2hCLEtBQUssR0FBRyxtQkFBbUIsRUFDM0IsT0FBTyxDQUFDO29CQUVaLE9BQU8sQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO3dCQUM5QyxNQUFNLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDNUUsQ0FBQztvQkFFRCxNQUFNLENBQUMsTUFBTSxDQUFDO2dCQUNsQixDQUFDO2dCQXpDTDtvQkFBQyxpQkFBVSxFQUFFOztnQ0FBQTtnQkEwQ2IsbUJBQUM7WUFBRCxDQXpDQSxBQXlDQyxDQXpDaUMsaUJBQU8sR0F5Q3hDO1lBekNELHVDQXlDQyxDQUFBIiwiZmlsZSI6InNyYy9tYW5hZ2Vycy90b2tlbi5tYW5hZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMvUngnO1xuaW1wb3J0IHtJRW5kcG9pbnQsIElUb2tlbiwgU3RvcmFnZSwgU3RvcmFnZVR5cGV9IGZyb20gJy4uL2hlbHBlcnMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVG9rZW5NYW5hZ2VyIGV4dGVuZHMgU3RvcmFnZTxJVG9rZW4+IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoJ09BdXRoMlRva2VucycsIFN0b3JhZ2VUeXBlLkxvY2FsU3RvcmFnZSk7XG4gICAgfVxuXG4gICAgc2V0RXhwaXJlZChwcm92aWRlcjogc3RyaW5nKSB7XG4gICAgICAgIC8vIHJldHVybiAodGhpcy5fdG9rZW5zLmVuZHBvICYmIHRoaXMudG9rZW4uZXhwaXJlc19hdCAmJiB0aGlzLnRva2VuLmV4cGlyZXNfYXQgPCBuZXcgRGF0ZSgpKTtcbiAgICB9XG5cbiAgICBnZXRUb2tlbihzZWdtZW50OiBzdHJpbmcsIGVuZHBvaW50OiBJRW5kcG9pbnQsIGRlbGltaXRlcjogc3RyaW5nID0gJyMnKTogUHJvbWlzZTxJVG9rZW4+IHtcbiAgICAgICAgc2VnbWVudCA9IHNlZ21lbnQucmVwbGFjZShlbmRwb2ludC5yZWRpcmVjdFVybCwgJycpO1xuXG4gICAgICAgIGxldCBwYXJ0cyA9IHNlZ21lbnQuc3BsaXQoZGVsaW1pdGVyKTtcbiAgICAgICAgaWYgKHBhcnRzLmxlbmd0aCA8PSAwKSByZXR1cm47XG5cbiAgICAgICAgbGV0IHJpZ2h0UGFydCA9IHBhcnRzLmxlbmd0aCA+PSAyID8gcGFydHNbMV0gOiBwYXJ0c1swXTtcbiAgICAgICAgcmlnaHRQYXJ0ID0gcmlnaHRQYXJ0LnJlcGxhY2UoJy8nLCAnJyk7XG5cbiAgICAgICAgaWYgKHJpZ2h0UGFydC5pbmRleE9mKFwiP1wiKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIGxldCBxdWVyeVBhcnQgPSByaWdodFBhcnQuc3BsaXQoXCI/XCIpO1xuICAgICAgICAgICAgaWYgKCFxdWVyeVBhcnQgfHwgcXVlcnlQYXJ0Lmxlbmd0aCA8PSAwKSByZXR1cm47XG4gICAgICAgICAgICByaWdodFBhcnQgPSBxdWVyeVBhcnRbMV07XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcGFyYW1zID0gdGhpcy5fZXh0cmFjdFBhcmFtcyhyaWdodFBhcnQpO1xuICAgICAgICBwYXJhbXMucHJvdmlkZXIgPSBlbmRwb2ludC5wcm92aWRlcjtcbiAgICAgICAgdGhpcy5hZGQoZW5kcG9pbnQucHJvdmlkZXIsIHBhcmFtcyk7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmU8SVRva2VuPihwYXJhbXMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2V4dHJhY3RQYXJhbXMoc2VnbWVudDogc3RyaW5nKSB7XG4gICAgICAgIGxldCBwYXJhbXM6IGFueSA9IHt9LFxuICAgICAgICAgICAgcmVnZXggPSAvKFteJj1dKyk9KFteJl0qKS9nLFxuICAgICAgICAgICAgbWF0Y2hlcztcblxuICAgICAgICB3aGlsZSAoKG1hdGNoZXMgPSByZWdleC5leGVjKHNlZ21lbnQpKSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcGFyYW1zW2RlY29kZVVSSUNvbXBvbmVudChtYXRjaGVzWzFdKV0gPSBkZWNvZGVVUklDb21wb25lbnQobWF0Y2hlc1syXSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcGFyYW1zO1xuICAgIH1cbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
