import { Storage, StorageType } from '../helpers/storage';

// Underscore.js implementation of extend
// https://github.com/jashkenas/underscore/blob/master/underscore.js
var extend = function (obj, ...defaults) {
    var length = arguments.length;
    if (length < 2 || obj == null) return obj; // if there are no objects to extend then return the current object
    if (defaults) obj = Object(obj); // create a new object to extend if there are any extensions

    for (var index = 1; index < length; index++) {
        var source = arguments[index]; // foreach object
        if (source == null) continue; // move on if the object is null or undefined
        var keys = Object.keys(source), // get all the keys
            l = keys.length; // cache the length
        for (var i = 0; i < l; i++) {
            var key = keys[i]; // for each key
            if (!defaults || obj[key] === void 0) obj[key] = source[key]; // replace values
        }
    }
    return obj;
};

export const DefaultEndpoints = {
    Google: 'Google',
    Microsoft: 'Microsoft',
    Facebook: 'Facebook'
};

export interface IEndpoint {
    provider?: string;
    clientId?: string;
    baseUrl?: string;
    authorizeUrl?: string;
    redirectUrl?: string;
    scope?: string;
    resource?: string;
    state?: boolean;
    nonce?: boolean;
    responseType?: string;
    extraQueryParameters?: string;
    windowSize?: string;
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

    add(provider: string, config: IEndpoint): IEndpoint {
        if (config.redirectUrl == null) config.redirectUrl = this.currentHost;
        config.provider = provider;
        return super.add(provider, config);
    }

    registerGoogleAuth(clientId: string, overrides?: IEndpoint) {
        var defaults = <IEndpoint>{
            clientId: clientId,
            baseUrl: 'https://accounts.google.com',
            authorizeUrl: '/o/oauth2/v2/auth',
            resource: 'https://www.googleapis.com',
            responseType: 'token',
            scope: 'https://www.googleapis.com/auth/plus.me'
        };

        var config = extend({}, defaults, overrides);
        this.add(DefaultEndpoints.Google, config);
    };

    registerMicrosoftAuth(clientId: string, overrides?: IEndpoint) {
        var defaults = <IEndpoint>{
            clientId: clientId,
            baseUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0',
            authorizeUrl: '/authorize',
            resource: 'https://graph.microsoft.com',
            responseType: 'id_token+token',
            scope: 'openid https://graph.microsoft.com/user.read',
            extraParameters: '&response_mode=fragment',
            nonce: true,
            state: true
        };

        var config = extend({}, defaults, overrides);
        this.add(DefaultEndpoints.Microsoft, config);
    };

    registerFacebookAuth(clientId: string, overrides?: IEndpoint) {
        var defaults = <IEndpoint>{
            clientId: clientId,
            baseUrl: 'https://www.facebook.com',
            authorizeUrl: '/dialog/oauth',
            resource: 'https://graph.facebook.com',
            responseType: 'token',
            scope: 'public_profile',
            nonce: true,
            state: true
        };

        var config = extend({}, defaults, overrides);
        this.add(DefaultEndpoints.Facebook, config);
    };

    static getLoginUrl(endpointConfig: IEndpoint): string {
        var rand = (limit = 10, start = 0) => Math.floor(Math.random() * limit + start);

        var oAuthScope = (endpointConfig.scope) ? encodeURIComponent(endpointConfig.scope) : '',
            state = endpointConfig.state && rand(10000),
            nonce = endpointConfig.nonce && rand(10000);

        var urlSegments = [
            'response_type=' + endpointConfig.responseType,
            'client_id=' + encodeURIComponent(endpointConfig.clientId),
            'redirect_uri=' + encodeURIComponent(endpointConfig.redirectUrl),
            'scope=' + oAuthScope
        ]

        if (state) urlSegments.push('state=' + state);
        if (nonce) urlSegments.push('nonce=' + nonce);
        if (endpointConfig) urlSegments.push(endpointConfig.extraQueryParameters);

        return endpointConfig.baseUrl + endpointConfig.authorizeUrl + '?' + urlSegments.join('&');
    }
}