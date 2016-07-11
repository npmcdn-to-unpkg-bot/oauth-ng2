export interface IProvider {
    provider: string;
}

export interface IToken extends IProvider {
    access_token?: string;
    refresh_token?: string;
    token_type?: string;
    scope?: string;
    state?: string;
    expires_in?: string;
    expires_at?: string;
}

export interface IEndpoint extends IProvider {
    site?: string;
    clientId?: string;
    scope?: string;
    state?: string;
    authorizeUrl?: string;
    redirectUrl?: string;
    resource?: string;
    profileUrl?: string;
    nounce?: string;
    responseType?: string;
    protectedResources?: any;
    windowSize?: string
}