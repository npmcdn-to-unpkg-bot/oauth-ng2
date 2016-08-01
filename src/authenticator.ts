import {EndpointManager, TokenManager, IToken, IEndpoint} from './';
declare var Microsoft: any;

export class Authenticator {
    constructor(
        private _endpointManager: EndpointManager,
        private _tokenManager: TokenManager
    ) {
    }

    authenticate(provider: string, force: boolean = false): Promise<IToken> {
        let token = this._tokenManager.get(provider);
        if (token != null && !force) return Promise.resolve(token);

        let endpoint = this._endpointManager.get(provider);

        var auth;
        if (window.hasOwnProperty('Office')) auth = this._openInDialog(endpoint);
        else auth = this._openInWindowPopup(endpoint);

        return auth.catch(error => this._isTokenExpired(error));
    }

    private _isTokenExpired(error) {

    }

    private _openInWindowPopup(endpoint: IEndpoint) {
        let url = EndpointManager.getLoginUrl(endpoint);
        let windowSize = endpoint.windowSize || "width=400,height=600";
        let windowFeatures = windowSize + ",menubar=no,toolbar=no,location=no,resizable=no,scrollbars=yes,status=no";
        let popupWindow: Window = window.open(url, endpoint.provider.toUpperCase(), windowFeatures);

        return new Promise<IToken>((resolve, reject) => {
            try {
                let interval = setInterval(() => {
                    try {
                        if (popupWindow.document.URL.indexOf(endpoint.redirectUrl) !== -1) {
                            clearInterval(interval);
                            let token = this._tokenManager.getToken(popupWindow.document.URL, endpoint)
                            popupWindow.close();
                            resolve(token);
                        }
                    }
                    catch (exception) {
                        if (!popupWindow) {
                            clearInterval(interval);
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
    }

    private _openInDialog(endpoint: IEndpoint) {
        let url = EndpointManager.getLoginUrl(endpoint);

        var options: Office.DialogOptions = {
            height: 60,
            width: 40,
            requireHTTPS: true
        };

        return new Promise<IToken>((resolve, reject) => {
            Office.context.ui.displayDialogAsync(url, options, result => {
                var dialog = result.value;
                dialog.addEventHandler(Microsoft.Office.WebExtension.EventType.DialogMessageReceived, args => {
                    dialog.close();
                    try {
                        if (args.message == '' || args.message == null) {
                            reject("No token received");
                        }

                        if (args.message.indexOf('access_token') == -1) {
                            reject(JSON.parse(args.message));
                        }

                        let token = JSON.parse(args.message);
                        token.provider = endpoint.provider;
                        this._tokenManager.add(endpoint.provider, token);
                        this._tokenManager.setExpired(endpoint.provider);
                        resolve(token);
                    }
                    catch (exception) {
                        reject(exception);
                    }
                })
            });
        });
    }
}