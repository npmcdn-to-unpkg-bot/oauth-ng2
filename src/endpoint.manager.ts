import {Injectable} from 'angular2/core'
import {Repository} from './repository';
import {IEndpoint} from './types';

@Injectable()
export default class EndpointManager extends Repository<IEndpoint> {
    constructor() {
        super();
        console.log(Date.now() + ': Endpoint service constructed');        
    }

    getLoginUrl(endpoint: IEndpoint): string {
        let oAuthScope = (endpoint.scope) ? encodeURIComponent(endpoint.scope) : '',
            state = (endpoint.state) ? encodeURIComponent(endpoint.state) : '',
            authPathHasQuery = (endpoint.authorizeUrl.indexOf('?') === -1) ? false : true,
            appendChar = (authPathHasQuery) ? '&' : '?',
            responseType = (endpoint.responseType) ? encodeURIComponent(endpoint.responseType) : '';

        let url = endpoint.site +
            endpoint.authorizeUrl + appendChar +
            'response_type=' + responseType + '&' +
            'client_id=' + encodeURIComponent(endpoint.clientId) + '&' +
            'redirect_uri=' + encodeURIComponent(endpoint.redirectUrl) + '&' +
            'scope=' + oAuthScope + '&' +
            'state=' + state;

        if (endpoint.nounce) {
            url = url + '&nounce=' + endpoint.nounce;
        }

        return url;
    }
}