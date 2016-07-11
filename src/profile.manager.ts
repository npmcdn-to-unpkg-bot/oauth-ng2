import {Inject, Injectable} from 'angular2/core';
import {Http, RequestOptionsArgs, Headers} from 'angular2/http';
import {IEndpoint, IToken} from './types';

@Injectable()
export default class ProfileManager {
    constructor( @Inject(Http) private _http: Http) {
        console.log(Date.now() + ': Profile service constructed');
    }

    load(endpoint: IEndpoint, token: IToken) {
        if (!endpoint || !endpoint.profileUrl) return;

        let headers: Headers = new Headers({ 'Authorization': 'Bearer ' + token.access_token });

        let requestOptions: RequestOptionsArgs = {
            url: endpoint.profileUrl,
            headers: headers
        }

        return this._http.get(endpoint.profileUrl, headers);
    }
}