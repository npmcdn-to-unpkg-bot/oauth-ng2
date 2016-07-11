import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Http, RequestOptions, Headers} from '@angular/http';
import {IEndpoint, IToken} from '../helpers';

@Injectable()
export class ProfileManager {
    constructor(private _http: Http) { }

    load(profileUrl: string, token: IToken): Observable<any> {
        if (profileUrl == null) return Observable.fromPromise(Promise.resolve(null));

        let headers: Headers = new Headers();
        headers.append('Authorization', 'Bearer ' + token.access_token);
        let options = new RequestOptions({
            headers: headers
        });

        return this._http.get(profileUrl, options).map(response => response.json());
    }
}