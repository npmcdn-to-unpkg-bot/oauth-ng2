import {Inject, Injectable} from '@angular/core'
import {Observable} from 'rxjs/Rx';
import {IEndpoint, IToken, Storage, StorageType} from '../helpers';

@Injectable()
export class TokenManager extends Storage<IToken> {
    constructor() {
        super('OAuth2Tokens', StorageType.LocalStorage);
    }

    setExpired(provider: string) {
        // return (this._tokens.endpo && this.token.expires_at && this.token.expires_at < new Date());
    }

    getToken(segment: string, endpoint: IEndpoint, delimiter: string = '#'): Promise<IToken> {
        segment = segment.replace(endpoint.redirectUrl, '');

        let parts = segment.split(delimiter);
        if (parts.length <= 0) return;

        let rightPart = parts.length >= 2 ? parts[1] : parts[0];
        rightPart = rightPart.replace('/', '');

        if (rightPart.indexOf("?") !== -1) {
            let queryPart = rightPart.split("?");
            if (!queryPart || queryPart.length <= 0) return;
            rightPart = queryPart[1];
        }

        let params = this._extractParams(rightPart);
        params.provider = endpoint.provider;
        this.add(endpoint.provider, params);
        return Promise.resolve<IToken>(params);
    }

    private _extractParams(segment: string) {
        let params: any = {},
            regex = /([^&=]+)=([^&]*)/g,
            matches;

        while ((matches = regex.exec(segment)) !== null) {
            params[decodeURIComponent(matches[1])] = decodeURIComponent(matches[2]);
        }

        return params;
    }
}