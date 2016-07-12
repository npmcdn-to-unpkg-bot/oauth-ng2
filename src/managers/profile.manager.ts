import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Storage, StorageType } from '../helpers/storage';
import { TokenManager } from '../managers/token.manager';
import { EndpointManager } from '../managers/endpoint.manager';

@Injectable()
export class ProfileManager extends Storage<any> {
    constructor(
        private _http: Http,
        private _tokenManager: TokenManager,
        private _endpointManager: EndpointManager
    ) {
        super('OAuth2Profiles', StorageType.LocalStorage);
    }

    load(provider: string, force: boolean = false): Observable<any> {
        var cached = this.get(provider);
        if (cached != null && !force) {
            return Observable.of(cached);
        }

        var token = this._tokenManager.get(provider);
        var endpoint = this._endpointManager.get(provider);
        if (endpoint.profileUrl == null) return Observable.fromPromise(Promise.resolve(null));

        let headers: Headers = new Headers();
        headers.append('Authorization', 'Bearer ' + token.access_token);
        let options = new RequestOptions({
            headers: headers
        });

        return this._http.get(endpoint.profileUrl, options)
            .map(response => {
                var json = response.json();
                if (json == null) return json;
                return this.add(provider, json);
            });
    }
}