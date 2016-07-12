import { IEndpoint } from '../managers/endpoint.manager';
import { Storage } from '../helpers/storage';
export interface IToken {
    provider: string;
    access_token?: string;
    refresh_token?: string;
    token_type?: string;
    scope?: string;
    state?: string;
    expires_in?: string;
    expires_at?: string;
}
export declare class TokenManager extends Storage<IToken> {
    constructor();
    setExpired(provider: string): void;
    getToken(segment: string, endpoint: IEndpoint, delimiter?: string): Promise<IToken>;
    private _extractParams(segment);
}
