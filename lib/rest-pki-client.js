'use strict';

const { RestClient } = require('./rest-client');
const { Authentication } = require('./authentication');

class RestPkiClient {

    constructor(endpointUrl, accessToken) {
        this._endpointUrl = endpointUrl;
        this._accessToken = accessToken;
    }

    // Getter and Setter region

    getEndpointUrl(){
        return this._endpointUrl;
    }

    getAccessToken() {
        return this._accessToken;
    }

    setEndpointUrl(value){
        if(!value){
            throw new Error('The given endpoint url is invalid');
        }
        this._endpointUrl = value
    }

    setAccessToken(value){
        if(!value){
            throw new Error('The given endpoint url is invalid');
        }
        this._accessToken = value
    }

    get endpointUrl() {
        return this.getEndpointUrl();
    }

    set endpointUrl(value){
        this.setEndpointUrl(value);
    }

    get accessToken(){
        return this.getAccessToken();
    }

    set accessToken(value){
        this.setAccessToken(value);
    }

    // end region

    getRestClient(){
        return new RestClient(this._endpointUrl, this._accessToken);
    }

    getAuthentication(){
        return new Authentication(this);
    }

}
exports.RestPkiClient = RestPkiClient;