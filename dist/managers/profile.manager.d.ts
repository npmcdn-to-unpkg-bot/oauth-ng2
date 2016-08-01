import { Storage } from '../helpers/storage';
import { TokenManager } from '../managers/token.manager';
import { EndpointManager } from '../managers/endpoint.manager';
export declare class ProfileManager extends Storage<any> {
    private _endpointManager;
    private _tokenManager;
    constructor(_endpointManager: EndpointManager, _tokenManager: TokenManager);
    load(provider: string, force?: boolean): Promise<any>;
}
