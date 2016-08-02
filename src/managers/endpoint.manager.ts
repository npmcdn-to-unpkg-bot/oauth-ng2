import { Storage, StorageType } from '../helpers/storage';

export const DefaultEndpoints = {
    Google: 'Google',
    Enterprise: 'Enterprise',
    Microsoft: 'Microsoft',
    Facebook: 'Facebook'
};

export interface IEndpoint {
    provider: string;
    site?: string;
    clientId?: string;
    scope?: string;
    state?: string;
    authorizeUrl?: string;
    redirectUrl?: string;
    resource?: string;
    profileUrl?: string;
    nonce?: string;
    responseType?: string;
    protectedResources?: any;
    windowSize?: string
}

export class EndpointManager extends Storage<IEndpoint> {
    constructor() {
        super('OAuth2Endpoints', StorageType.LocalStorage);
    }

    private _currentHost: string;
    get currentHost(): string {
        if (this._currentHost == null) {
            this._currentHost = window.location.protocol + "//" + window.location.host;
        }

        return this._currentHost;
    }

    registerGoogleAuth(clientId: string, redirect_uri?: string, scope?: string) {
        var config = <IEndpoint>{
            provider: DefaultEndpoints.Google,
            clientId: clientId,
            redirectUrl: redirect_uri || this.currentHost,
            profileUrl: 'https://www.googleapis.com/plus/v1/people/me',
            site: 'https://accounts.google.com',
            authorizeUrl: '/o/oauth2/v2/auth',
            resource: 'https://www.googleapis.com',
            responseType: 'token',
            scope: scope || 'https://www.googleapis.com/auth/plus.me'
        };

        this.add(config.provider, config);
    };

    registerEnterpriseAuth(clientId: string, redirect_uri?: string, scope?: string) {
        var config = <IEndpoint>{
            provider: DefaultEndpoints.Enterprise,
            clientId: clientId,
            redirectUrl: redirect_uri || this.currentHost,
            profileUrl: 'https://graph.microsoft.com/v1.0/me',
            site: 'https://login.microsoftonline.com/common/oauth2/v2.0',
            authorizeUrl: '/authorize',
            resource: 'https://graph.microsoft.com',
            responseType: 'token',
            scope: scope || 'https://graph.microsoft.com/user.read',
            extraParameters: '&response_mode=fragment'
        };

        this.add(config.provider, config);
    };

    registerMicrosoftAuth(clientId: string, redirect_uri?: string, scope?: string) {
        var config = <IEndpoint>{
            provider: DefaultEndpoints.Microsoft,
            clientId: clientId,
            redirectUrl: redirect_uri || this.currentHost,
            profileUrl: 'https://graph.microsoft.com/v1.0/me',
            site: 'https://login.microsoftonline.com/common/oauth2/v2.0',
            authorizeUrl: '/authorize',
            resource: 'https://graph.microsoft.com',
            responseType: 'id_token+token',
            scope: scope || 'openid https://graph.microsoft.com/user.read',
            extraParameters: '&response_mode=fragment'
        };

        this.add(config.provider, config);
    };

    registerFacebookAuth(clientId: string, redirect_uri?: string, scope?: string) {
        var config = <IEndpoint>{
            provider: DefaultEndpoints.Facebook,
            clientId: clientId,
            redirectUrl: redirect_uri || this.currentHost,
            profileUrl: 'https://graph.facebook.com/v2.5/me',
            site: 'https://www.facebook.com',
            authorizeUrl: '/dialog/oauth',
            resource: 'https://graph.facebook.com',
            responseType: 'token',
            scope: scope || 'public_profile'
        };

        this.add(config.provider, config);
    };

    static getLoginUrl(endpointConfig: IEndpoint): string {
        var rand = (limit = 10, start = 0) => Math.floor(Math.random() * limit + start);

        var oAuthScope = (endpointConfig.scope) ? encodeURIComponent(endpointConfig.scope) : '',
            state = (endpointConfig.state) ? encodeURIComponent(endpointConfig.state) : rand(10000),
            nonce = (endpointConfig.nonce) ? encodeURIComponent(endpointConfig.nonce) : rand(10000),
            authPathHasQuery = (endpointConfig.authorizeUrl.indexOf('?') === -1) ? false : true,
            appendChar = (authPathHasQuery) ? '&' : '?',
            responseType = endpointConfig.responseType

        var url = endpointConfig.site + endpointConfig.authorizeUrl + appendChar +
            'response_type=' + responseType + '&' +
            'client_id=' + encodeURIComponent(endpointConfig.clientId) + '&' +
            'redirect_uri=' + encodeURIComponent(endpointConfig.redirectUrl) + '&' +
            'scope=' + oAuthScope + '&' +
            'state=' + state + '&' +
            'nonce=' + nonce;

        return url;
    }
}