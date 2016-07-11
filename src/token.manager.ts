import {Inject, Injectable} from 'angular2/core'
import StorageManager from './storage.manager';
import {IEndpoint, IToken} from './types';

@Injectable()
export default class TokenManager extends StorageManager<IToken> {
    private _oAuth2HashTokens: string[] = ['access_token', 'token_type', 'expires_in', 'scope', 'state', 'error', 'error_description'];

    constructor() {
        super();
        console.log(Date.now() + ': Token service constructed');
    }

    private _extractParams(hash: string) {
        let params: any = {},
            regex = /([^&=]+)=([^&]*)/g,
            m;

        while ((m = regex.exec(hash)) !== null) {
            params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
        }

        if (params.access_token || params.code || params.error) {
            return params;
        }
    }

    setExpired(provider: string) {
        // return (this._tokens.endpo && this.token.expires_at && this.token.expires_at < new Date());
    }

    getToken(hash: string, endpoint: IEndpoint): Promise<IToken> {
        hash = hash.replace(endpoint.redirectUrl, '');

        let parts = hash.split('#');
        if (!parts || parts.length <= 0) return;

        let rightPart = parts.length == 2 ? parts[1] : parts[0];
        rightPart = rightPart.replace('/', '');

        if (rightPart.indexOf("?") !== -1) {
            let queryPart = rightPart.split("?");
            if (!queryPart || queryPart.length <= 0) return;
            rightPart = queryPart[1];
        }

        let params = this._extractParams(rightPart);
        params.provider = endpoint.provider;
        this.add(params as IToken);
        return Promise.resolve<IToken>(params);
    }
}