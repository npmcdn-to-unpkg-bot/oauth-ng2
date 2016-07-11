import {Injectable} from '@angular/core'
import {Storage, StorageType, IEndpoint} from '../helpers';

@Injectable()
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
            provider: 'Google',
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

    registerMicrosoftAuth(clientId: string, redirect_uri?: string, scope?: string) {
        var config = <IEndpoint>{
            provider: 'Microsoft',
            clientId: clientId,
            redirectUrl: redirect_uri || this.currentHost,
            profileUrl: 'https://graph.microsoft.com/v1.0/me',
            site: 'https://login.microsoftonline.com/common/oauth2/v2.0',
            authorizeUrl: '/authorize',
            resource: 'https://login.live.com',
            responseType: 'token',
            scope: scope || 'https://graph.microsoft.com/user.read',
            extraParameters: '&response_mode=fragment'
        };

        this.add(config.provider, config);
    };

    registerFacebookAuth(clientId: string, redirect_uri?: string, scope?: string) {
        var config = <IEndpoint>{
            provider: 'Facebook',
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
        var oAuthScope = (endpointConfig.scope) ? encodeURIComponent(endpointConfig.scope) : '',
            state = (endpointConfig.state) ? encodeURIComponent(endpointConfig.state) : '',
            authPathHasQuery = (endpointConfig.authorizeUrl.indexOf('?') === -1) ? false : true,
            appendChar = (authPathHasQuery) ? '&' : '?',
            responseType = (endpointConfig.responseType) ? encodeURIComponent(endpointConfig.responseType) : '';

        var url = endpointConfig.site + endpointConfig.authorizeUrl + appendChar +
            'response_type=' + responseType + '&' +
            'client_id=' + encodeURIComponent(endpointConfig.clientId) + '&' +
            'redirect_uri=' + encodeURIComponent(endpointConfig.redirectUrl) + '&' +
            'scope=' + oAuthScope + '&' +
            'state=' + state;

        var random = new Uint16Array(1);
        crypto.getRandomValues(random);
        url = url + '&nounce=' + random[0];

        return url;
    }
}