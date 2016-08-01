import { EndpointManager, TokenManager, IToken } from './';
export declare class Authenticator {
    private _endpointManager;
    private _tokenManager;
    constructor(_endpointManager: EndpointManager, _tokenManager: TokenManager);
    authenticate(provider: string, force?: boolean): Promise<IToken>;
    private _isTokenExpired(error);
    private _openInWindowPopup(endpoint);
    private _openInDialog(endpoint);
}
