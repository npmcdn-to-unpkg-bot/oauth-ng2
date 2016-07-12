import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';
import { IToken } from '../helpers';
export declare class ProfileManager {
    private _http;
    constructor(_http: Http);
    load(profileUrl: string, token: IToken): Observable<any>;
}
