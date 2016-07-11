import {Injectable} from 'angular2/core';
import EndpointManager from './endpoint.manager';
import TokenManager from './token.manager';
import {IToken, IEndpoint} from './types';

@Injectable()
export default class Authenticator {
    constructor(
        private _tokenService: TokenManager,
        private _endpointService: EndpointManager
    ) {
        console.log(Date.now() + ': Authenticator service constructed');
    }

    authenticate(provider: string): Promise<IToken> {
        let endpoint = this._endpointService.get(provider);
        let windowSize = endpoint.windowSize || "width=400,height=600";
        let windowFeatures = windowSize + ",menubar=no,toolbar=no,location=no,resizable=no,scrollbars=yes,status=no";
        let popup: Window = window.open(this._endpointService.getLoginUrl(endpoint), provider.toUpperCase(), windowFeatures);

        return new Promise<IToken>((resolve, reject) => {
            try {
                let interval = setInterval(() => {
                    try {
                        if (popup.document.URL.indexOf(endpoint.redirectUrl) !== -1) {
                            clearInterval(interval);
                            let tokenPromise = this._tokenService.getToken(popup.document.URL, endpoint)
                            popup.close();
                            resolve(tokenPromise);
                        }
                    }
                    catch (exception) {
                        if (!popup) {
                            clearInterval(interval);
                            reject(exception);
                        }
                    }
                }, 400);
            }
            catch (exception) {
                popup.close();
                reject(exception);
            }
        });
    }
}