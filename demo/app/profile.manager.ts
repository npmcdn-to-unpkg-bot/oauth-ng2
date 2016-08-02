import { Storage, StorageType, TokenManager, EndpointManager } from '../../src';

export class ProfileManager extends Storage<any> {
    constructor(
        private _endpointManager: EndpointManager,
        private _tokenManager: TokenManager
    ) {
        super('OAuth2Profiles', StorageType.LocalStorage);
    }

    load(provider: string, force: boolean = false): Promise<any> {
        var cached = this.get(provider);
        if (cached != null && !force) {
            return Promise.resolve(cached);
        }

        var token = this._tokenManager.get(provider);
        var endpoint = this._endpointManager.get(provider);
        if (endpoint.profileUrl == null) return Promise.resolve(null);

        var xhr = $.ajax(endpoint.profileUrl, {
            dataType: 'json',
            headers: { 'Authorization': 'Bearer ' + token.access_token }
        }).then(response => {
            var json = response;
            if (json == null) return json;
            return this.add(provider, json);
        }) as any;

        return xhr as any;
    }
}