import { EndpointManager, TokenManager, ProfileManager, IToken } from './';
export declare class Authenticator {
    private _endpointManager;
    private _tokenManager;
    private _profileManager;
    constructor(_endpointManager: EndpointManager, _tokenManager: TokenManager, _profileManager: ProfileManager);
    authenticate(provider: string, force?: boolean): Promise<IToken>;
    private _isTokenExpired(error);
    private _openInPopup(endpoint);
}
