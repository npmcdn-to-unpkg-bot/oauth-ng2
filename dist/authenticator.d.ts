import { EndpointManager, TokenManager, ProfileManager } from './managers';
import { IToken } from './helpers';
export default class Authenticator {
    private _endpointManager;
    private _tokenManager;
    private _profileManager;
    constructor(_endpointManager: EndpointManager, _tokenManager: TokenManager, _profileManager: ProfileManager);
    authenticate(provider: string): Promise<IToken>;
    private _openInPopup(endpoint);
}
