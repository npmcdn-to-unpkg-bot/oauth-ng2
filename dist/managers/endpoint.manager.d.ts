import { Storage } from '../helpers/storage';
export declare const DefaultEndpoints: {
    Google: string;
    Microsoft: string;
    Facebook: string;
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
    windowSize?: string;
}
export declare class EndpointManager extends Storage<IEndpoint> {
    constructor();
    private _currentHost;
    currentHost: string;
    registerGoogleAuth(clientId: string, redirect_uri?: string, scope?: string): void;
    registerMicrosoftAuth(clientId: string, redirect_uri?: string, scope?: string): void;
    registerFacebookAuth(clientId: string, redirect_uri?: string, scope?: string): void;
    static getLoginUrl(endpointConfig: IEndpoint): string;
}
