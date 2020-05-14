'use strict';

const { Readable } = require('stream');
const fs = require('fs');

const { RestClient } = require('./rest-client');
const { Authentication } = require('./authentication');
const { Apis } = require('./enums');
const { ApiVersion } = require('./api-version');
const { DigestAlgorithm } = require('./digest-algorithm');

class RestPkiClient {

    constructor(endpointUrl, accessToken=null, proxy=null) {
        this._endpointUrl = endpointUrl;
        this._accessToken = accessToken;
        this._proxy = proxy;
        this._multipartUploadThreshold = 5 * 1024 * 1024; // 5 MB
        this._multipartUploadDoubleCheck = false;
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

    getMultipartUploadDoubleCheck(){
        return this._multipartUploadDoubleCheck;
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

    setMultipartUploadDoubleCheck(value){
        this._multipartUploadDoubleCheck = value;
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

    get multipartUploadDoubleCheck(){
        return this.getMultipartUploadDoubleCheck();
    }
    
    set multipartUploadDoubleCheck(value){
        this.setMultipartUploadDoubleCheck(value);
    }

    get restPkiVersion(){
        return this.getRestPkiVersion();
    }
    
    set restPkiVersion(value){
        this.setRestPkiVersion(value);
    }

    // end region

    getRestClient(){
        return new RestClient(this._endpointUrl, this._accessToken, this._proxy);
    }

    getAuthentication(){
        return new Authentication(this);
    }
    
    // upload region
    async upload(stream) {
        client = this.getRestClient();
        let beginHttpResponse = await client.post("Api/MultipartUploads");

        let blobToken = beginHttpResponse['blobToken'];
        let blobUri = `Api/MultipartUploads/${blobToken}`;
        let partSize = beginHttpResponse['partSize'];
        let streamHasher = DigestAlgorithm.MD5;

        // Upload file part by part

        let partETags = [];
        
        await this._uploadParts(stream, client, streamHasher, blobUri, partSize);
        let completeMD5 = streamHasher.cryptoHash;

        let endRequest = {
            'partETags': partETags
        };
        
        if (MultipartUploadDoubleCheck){
            endRequest['completeMD5'] = completeMD5;
        }
        
        await client.post(blobUri, endRequest);
        return blobToken;
    }

    async _uploadParts(stream, client, partHasher, blobUri, partSize) {

        let buffer = Buffer.alloc(partSize);
        let partETags = [];
        let partNumber = 0;
        let uploadPartHttpResponse = null;
        
        stream.on('readable', () => {
            while (null !== (buffer = stream.read(partSize))) {

                let bufferHash = partHasher.computeHash(buffer);

                uploadPartHttpResponse = await client.post(`${blobUri}${partNumber}`, bufferHash);

                partETags.push(uploadPartHttpResponse['headers']['eTag']);
                partNumber += 1;
            }
        });
        return partETags;
    }

    async uploadFileFromPath(path) {
        let stream = fs.createReadStream(path);
        let blobToken = await upload(stream);
        stream.close();
        return blobToken;
    }

    async uploadFileFromStream(stream) {
        let blobToken = await upload(stream);
        return blobToken;
    }

    async uploadFileFromContent(content) {
        let stream = new Readable();
        stream._read = () => {}; // _read is required but you can noop it
        stream.push(content);
        stream.push(null);

        blobToken = await upload(stream);
        stream.close();
        return blobToken;
    }
    // end region

    // Api Version region
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
    // end region

}
exports.RestPkiClient = RestPkiClient;