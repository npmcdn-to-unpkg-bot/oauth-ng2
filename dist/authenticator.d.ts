import { EndpointManager } from './managers/endpoint.manager';
import { TokenManager, IToken } from './managers/token.manager';
/**
 * Helper for performing Implicit OAuth Authentication with registered endpoints.
 */
export declare class Authenticator {
    private _endpointManager;
    private _tokenManager;
    /**
     * @constructor
     *
     * @param endpointManager Depends on an instance of EndpointManager
     * @param TokenManager Depends on an instance of TokenManager
    */
    constructor(_endpointManager: EndpointManager, _tokenManager: TokenManager);
    /**
     * Authenticate based on the given provider
     * Either uses DialogAPI or Window Popups based on where its being called from
     * viz. Add-in or Web.
     * If the token was cached, the it retrieves the cached token.
     *
     * WARNING: you have to manually check the expires_in or expires_at property to determine
     * if the token has expired. Not all OAuth providers support refresh token flows.
     *
     * @param {string} provider Link to the provider.
     * @param {boolean} force Force re-authentication.
     * @return {Promise<IToken>} Returns a promise of the token.
     */
    authenticate(provider: string, force?: boolean): Promise<IToken>;
    /**
     * Check if the supplied url has either access_token or code or error
     */
    static isTokenUrl(url: string): boolean;
    static isAddin: boolean;
    private _openInWindowPopup(endpoint);
    private _openInDialog(endpoint);
}
