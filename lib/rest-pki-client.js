'use strict';

const { RestClient } = require('./rest-client');
const { Authentication } = require('./authentication');

class RestPkiClient {

    constructor(endpointUrl, accessToken=null, proxy=null) {
        this._endpointUrl = endpointUrl;
        this._accessToken = accessToken;
        this._proxy = proxy;
    }

    // Getter and Setter region

    getEndpointUrl(){
        return this._endpointUrl;
    }

    getAccessToken() {
        return this._accessToken;
    }

    getProxy(){
        return this._proxy;
    }

    setEndpointUrl(value){
        if(!value){
            throw new Error('The given endpoint url is invalid');
        }
        this._endpointUrl = value;
    }

    setAccessToken(value){
        this._accessToken = value;
    }

    setProxy(value){
        this._proxy = value;
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

    get proxy(){
        return this.getProxy();
    }

    set proxy(value){
        this.setProxy(value);
    }

    // end region

    getRestClient(){
        return new RestClient(this._endpointUrl, this._accessToken, this._proxy);
    }

    getAuthentication(){
        return new Authentication(this);
    }

}
exports.RestPkiClient = RestPkiClient;