export interface IProvider {
    provider: string;
}

export interface IDictionary<T> {
    [index: string]: T
}

export interface IToken extends IProvider {
    access_token: string;
    refresh_token?: string;
    token_type: string;
    expires_in: string;
    scope?: string;
    state?: string;
    expires_at: Date;
}

export interface IEndpoint extends IProvider {
    site: string,
    clientId: string,
    scope: string;
    state: string,
    authorizeUrl: string,
    redirectUrl: string,
    resource?: string,
    profileUrl?: string,
    nounce?: string,
    responseType?: string,
    protectedResources?: any,
    windowSize?: string
}

export interface IStorage extends IProvider {
    token: IToken
}

export enum StorageTypes {
    LocalStorage,
    SessionStorage
}