import {Injectable} from '@angular/core';
import {EndpointManager, TokenManager, ProfileManager, IToken, IEndpoint} from './';

@Injectable()
export class Authenticator {
    constructor(
        private _endpointManager: EndpointManager,
        private _tokenManager: TokenManager,
        private _profileManager: ProfileManager
    ) {
    }

    authenticate(provider: string): Promise<IToken> {
        let endpoint = this._endpointManager.get(provider);
        return this._openInPopup(endpoint);
    }

    private _openInPopup(endpoint: IEndpoint) {
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
}