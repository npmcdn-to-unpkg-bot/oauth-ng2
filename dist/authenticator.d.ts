import { EndpointManager } from './managers/endpoint.manager';
import { TokenManager, IToken } from './managers/token.manager';
/**
 * Enumeration for the supported modes of Authentication.
 * Either dialog or redirection.
 */
export declare enum AuthenticationMode {
    /**
     * Opens a the authorize url inside of a dialog.
     */
    Dialog = 0,
    /**
     * Redirects the current window to the authorize url.
     */
    Redirect = 1,
}
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
     * Controls the way the authentication should take place.
     * Either by using dialog or by redirecting the current window.
     * Defaults to the dialog flow.
     */
    static mode: AuthenticationMode;
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
     * Check if the currrent url is running inside of a Dialog that contains an access_token or code or error.
     * If true then it calls messageParent by extracting the token information.
     *
     * @return {boolean}
     * Returns false if the code is running inside of a dialog without the requried information
     * or is not running inside of a dialog at all.
     */
    static isDialog: boolean;
    /**
     * Check if the code is running inside of an Addin or Web Context.
     * The checks for Office and Word, Excel or OneNote objects.
     */
    private static _isAddin;
    static isAddin: boolean;
    private _openInWindowPopup(endpoint);
    private _openInDialog(endpoint);
}
