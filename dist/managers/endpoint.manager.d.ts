import { Storage, IEndpoint } from '../helpers';
export declare class EndpointManager extends Storage<IEndpoint> {
    constructor();
    private _currentHost;
    currentHost: string;
    registerGoogleAuth(clientId: string, redirect_uri?: string, scope?: string): void;
    registerMicrosoftAuth(clientId: string, redirect_uri?: string, scope?: string): void;
    registerFacebookAuth(clientId: string, redirect_uri?: string, scope?: string): void;
    static getLoginUrl(endpointConfig: IEndpoint): string;
}
