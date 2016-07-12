import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';
import { Storage } from '../helpers/storage';
import { TokenManager } from '../managers/token.manager';
import { EndpointManager } from '../managers/endpoint.manager';
export declare class ProfileManager extends Storage<any> {
    private _http;
    private _tokenManager;
    private _endpointManager;
    constructor(_http: Http, _tokenManager: TokenManager, _endpointManager: EndpointManager);
    load(provider: string, force?: boolean): Observable<any>;
}
