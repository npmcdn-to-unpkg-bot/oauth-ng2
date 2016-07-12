import { IEndpoint, IToken, Storage } from '../helpers';
export declare class TokenManager extends Storage<IToken> {
    constructor();
    setExpired(provider: string): void;
    getToken(segment: string, endpoint: IEndpoint, delimiter?: string): Promise<IToken>;
    private _extractParams(segment);
}
