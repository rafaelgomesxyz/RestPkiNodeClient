'use strict';

const { RestClient } = require('./rest-client');
const { Authentication } = require('./authentication');
const { Apis } = require('./enums');
const { ApiVersion } = require('./api-version');

class RestPkiClient {

    constructor(endpointUrl, accessToken=null, proxy=null) {
        this._endpointUrl = endpointUrl;
        this._accessToken = accessToken;
        this._proxy = proxy;
        this._multipartUploadThreshold = 5 * 1024 * 1024; // 5 MB
    }

    // Getter and Setter region
	getRestPkiVersion() {
		return this._restPkiVersion;
	}

	setRestPkiVersion(restPkiVersion) {
		this._restPkiVersion = restPkiVersion;
    }
    
    getEndpointUrl(){
        return this._endpointUrl;
    }

    getAccessToken() {
        return this._accessToken;
    }

    getProxy(){
        return this._proxy;
    }

    getMultipartUploadThreshold(){
        return this._multipartUploadThreshold;
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

    setMultipartUploadThreshold(value){
        this._multipartUploadThreshold = value;
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
    
    get multipartUploadThreshold(){
        return this.getMultipartUploadThreshold();
    }
    
    set multipartUploadThreshold(value){
        this.setMultipartUploadThreshold(value);
    }

    get RestPkiVersion(){
        return this.getRestPkiVersion();
    }
    
    set RestPkiVersion(value){
        this.setRestPkiVersion(value);
    }

    // end region

    getRestClient(){
        return new RestClient(this._endpointUrl, this._accessToken, this._proxy);
    }

    getAuthentication(){
        return new Authentication(this);
    }
    
    getApiVersion(api) {
        if (!this._restPkiVersion) {
            return this._tryGetEndpointVersion(this._endpointUrl)
            .then(v => {
                this._restPkiVersion = v;
                resolve(this._getApiVersion(api, v));
            });
        }
        return this._getApiVersion(api, this._restPkiVersion);
    }
    
    _getApiVersion(api, v) {
        switch (api) {
            case Apis.StartCades:
                if (v.isGreaterThanOrEqualTo(new ApiVersion("1.11"))) {
                    return 3;
                } else if (v.isGreaterThanOrEqualTo(new ApiVersion("1.10"))) {
                    return 2;
                } else {
                    return 1;
                }

            case Apis.CompleteCades:
                if (v.isGreaterThanOrEqualTo(new ApiVersion("1.11"))) {
                    return 2;
                } else {
                    return 1;
                }

            case Apis.StartPades:
                if (v.isGreaterThanOrEqualTo(new ApiVersion("1.11"))) {
                    return 2;
                } else {
                    return 1;
                }

            case Apis.CompletePades:
                if (v.isGreaterThanOrEqualTo(new ApiVersion("1.11"))) {
                    return 2;
                } else {
                    return 1;
                }

            case Apis.MultipartUpload:
                if (v.isGreaterThanOrEqualTo(new ApiVersion("1.11"))) {
                    return 1;
                } else {
                    return 0;
                }

            case Apis.AddPdfMarks:
                if (v.isGreaterThanOrEqualTo(new ApiVersion("1.13"))) {
                    return 1;
                } else {
                    return 0;
                }

            default:
                throw new Error(`Unsupported digest algorithm: ${api}`);
        }
    }

    async _tryGetEndpointVersion(endpoint){
        response = await this.getRestClient().get("Api/System/Info");
        let version = new Version(response['productVersion']);
        return version;
    }

}
exports.RestPkiClient = RestPkiClient;